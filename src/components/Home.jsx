import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import http from './httpReq.js';
import queryString from 'query-string'
import LeftPanelOptionsCB from './LeftPanel.jsx';
import SearchBar from './Searchbar.jsx';
class Cars extends Component {

    state = {
        cars: []
    }
    async fetchData() {
        try {
            let queryParms = queryString.parse(this.props.location.search);
            let searchStr = this.makeSearchStr(queryParms);
            const response = await http.get(`/cars?${searchStr}`);
            //console.log( response.data);
            //let { data } = response;
            this.setState({ cars: response.data });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    async componentDidMount() {
        this.fetchData();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props || prevState !== this.state) {
            //console.log(prevProps,"Updated");
            this.fetchData();
        }

    }
    handleChange = (options) => {
        this.callURL('/cars', options);
    }
    callURL = (url, options) => {
        let searchStr = this.makeSearchStr(options);
        this.props.history.push({
            pathName: url,
            search: searchStr,
        });
    };
    makeSearchStr = (options) => {
        let { fuel, type, sort, minprice,maxprice } = options;
        let searchStr = '';
        searchStr = this.addToQueryStr(searchStr, 'type', type);
        searchStr = this.addToQueryStr(searchStr, 'fuel', fuel);
        searchStr = this.addToQueryStr(searchStr, 'sort', sort);
        searchStr = this.addToQueryStr(searchStr, 'minprice', minprice);
        searchStr = this.addToQueryStr(searchStr, 'maxprice', maxprice);
        return searchStr;
    };
    addToQueryStr = (str, name, value) =>
        value
            ? str
                ? `${str}&${name}=${value}`
                : `${str}&${name}=${value}`
            : str;
   
    render() {
        let { cars } = this.state;
        let queryParms = queryString.parse(this.props.location.search);
        return (
            <div className="container">
                <div className="row">
                    <div className="col-3 my-5">
                        <LeftPanelOptionsCB
                            options={queryParms}
                            onOptionChange={this.handleChange}
                        />
                    </div>
                    <div className="col-9">
                        <h2 className='text-center my-4'>All Cars</h2>
                        <SearchBar
                            options={queryParms}
                            onOptionChange={this.handleChange}
                        />
                        {cars.length > 0 ? (
                            <>
                                <div className="row my-4 ">
                                    {cars.map((a) => (
                                        <div key={a.id} className="col-lg-3 col-md-4 border bg-warning text-center px-4 py-2">
                                            <div className="fw-bold">{a.model}</div>
                                            <div className="">Price: {a.price }</div>
                                            <div className="">Color: {a.color }</div>
                                            <div className="">Mileage: {a.kms }</div>
                                            <div className="">Manufactured in {a.year}</div>
                                            <div className=" d-flex justify-content-around fs-5">
                                                <Link className=" text-decoration-none text-dark" to={`/addCar/edit/${a.id}`}>
                                                <i className="fas fa-edit"></i>
                                                </Link>
                                                <Link
                                                    className=" text-decoration-none text-dark"
                                                    to={`/cars/delete/${a.id}`}
                                                ><i className="fas fa-trash-alt"></i>
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : ''}
                    </div>
                </div>
            </div>
        )
    }
}
export default Cars;