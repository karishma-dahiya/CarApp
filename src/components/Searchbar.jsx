import React, { Component } from 'react';
import http from './httpReq';

class SearchBar extends Component {
    handleChange = (e) => {
        let options = { ...this.props.options };
        options[e.target.name] = e.target.value;
        this.props.onOptionChange(options);
    };

    

    render() {
        let { minprice='',maxprice='' } = this.props.options;
        return (
            <>
                <div className="row">
                    <div className="col-2 fw-bold">Price Range:</div>

                    <div className="col-3">
                        <div className="form-group">
                            <input
                                type="number"
                                placeholder="min price"
                                name="minprice"
                                value={minprice}
                                onChange={this.handleChange}
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div className="ms-2 col-3">
                        <div className="form-group">
                            <input
                                type="number"
                                placeholder="max price"
                                name="maxprice"
                                value={maxprice}
                                onChange={this.handleChange}
                                className="form-control"
                            />
                        </div>
                    </div>

                </div>
            </>
        )
    }
}

export default SearchBar;