import React, { Component } from 'react';
import http from './httpReq';

class AddCar extends Component {
    state = {
        car: {},
        models:[],
        colors:[],
        edit: false,
        carMaster: [],
        errors:{}
    };
    async componentDidMount() {
        this.getcarData();
    }
    async componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) {
            this.getcarData();
            //console.log("Updated");
        }
    }
    async getcarData() {
        const { custId } = this.props.match.params;
        let carmaster = await http.get('/carmaster');
        let models = carmaster.data.map((a) => a.model);
        if (custId) {
            let response = await http.get(`/cars/${custId}`);
            let { data } = response;
            this.setState({ car: data, edit: true, models: models,carMaster:carmaster.data });
        } else {
            let car = {id:'', price: '', kms: '', year:'',model:'',color:'' };
            this.setState({ car: car, edit: false, models: models, carMaster: carmaster.data });
        }
    }
    handleChange = (e) => {
        let s1 = { ...this.state };
        let { car } = s1;
        let { name, value } = e.target;
        car[name] = value;
        this.setState({car:car});
    }
    
    postData = async (url, obj) => {
        let response = await http.post(url, obj);
        //console.log(response);
        if (response.status === 202) {
            alert(`${obj.id} inserted`);
            this.props.history.push('/cars');
        }
    }
    putData = async (url, obj,id) => {
        //console.log(url, obj);
        let response = await http.put(url, obj);
        //console.log(response);
        if (response.status === 202) {
            alert(`${id} updated`);
            this.props.history.push('/cars');
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        let errors = this.validateAll();
        if (this.isValid(errors)) {
            this.setState({ errors: {} });
            let { car, edit } = this.state;
            //console.log(car,edit);
            if (edit) {
                this.putData(`/cars/${car.id}`, car,car.id);
            } else {
                this.postData('/cars', car);
            }        
        } else {
            let s1 = { ...this.state };
            s1.errors = errors;
            this.setState(s1);
        }
    }
    isValid = (errors) => {
        let keys = Object.keys(errors);
        let count = keys.reduce((acc, curr) => errors[curr] ? acc + 1 : acc, 0);
        return count === 0;
    }
    isFormValid = () => {
        let errors = this.validateAll();
        return this.isValid(errors);
    }
    validateAll = () => {
        let { id, price, kms, year, model, color } = this.state.car;
        let errors = {};
        errors.id = !id ? 'Id is required' : '';
        errors.price = !price ? 'Enter Price' : '';
        errors.kms = !kms ? 'Enter Mileage' : '';
        errors.year = !year ? 'Enter year' : '';
        errors.model = !model ? 'Select model' : '';
        errors.color = !color ? 'Select color' : '';
        return errors;
    }
    render() {
        let {
            id,
            price,
            kms,
            year,
            model,
            color
        } = this.state.car;
        //console.log(this.state.car);
        const { models, carMaster,edit,errors } = this.state;
        let carItem = carMaster.find((a) => a.model === model);
        let colors = model ? carItem.colors : [];
        //console.log(carItem,model, colors);
        return (
            <>
                <div className="container fs-5">
                    <div className="form-group">
                        <label>Car ID</label>
                        <input
                            type="text"
                            placeholder=""
                            name="id"
                            value={id}
                            readOnly = {edit}
                            onChange={this.handleChange}
                            className={"form-control "+(edit ? 'bg-light' : '')}
                            
                        />
                        {errors.id
                            ? (<span className='text-danger'>{errors.id}</span>)
                            : ''
                        }
                    </div>
                    <div className="form-group">
                        <label>Price</label>
                        <input
                            type="number"
                            placeholder=""
                            name="price"
                            value={price}
                            onChange={this.handleChange}
                            className="form-control"
                        />
                        {errors.price
                            ? (<span className='text-danger'>{errors.price}</span>)
                            : ''
                        }
                    </div>
                    <div className="form-group">
                        <label>Mileage in kms</label>
                        <input
                            type="number"
                            placeholder=""
                            name="kms"
                            value={kms}
                            onChange={this.handleChange}
                            className="form-control"
                        />
                        {errors.kms
                            ? (<span className='text-danger'>{errors.kms}</span>)
                            : ''
                        }
                    </div>
                    <div className="form-group">
                        <label>Year of Manufacturer</label>
                        <input
                            type="number"
                            placeholder=""
                            name="year"
                            value={year}
                            onChange={this.handleChange}
                            className="form-control"
                        />
                        {errors.year
                            ? (<span className='text-danger'>{errors.year}</span>)
                            : ''
                        }
                    </div>
                    <div className="row my-2">

                        <div className="form-group col-5">
                            <select
                                name="model"
                                onChange={this.handleChange}
                                value={model}
                                className='form-control fs-5'>
                                <option value=''>Select Model</option>
                                {models.map((a) => (
                                    <option key={a} >{a}</option>
                                ))}
                            </select>
                            {errors.model
                                ? (<span className='text-danger'>{errors.model}</span>)
                                : ''
                            }
                        </div>
                        <div className="form-group ms-2 col-5 ">
                            <select
                                name="color"
                                onChange={this.handleChange}
                                value={color}
                                className='form-control fs-5'>
                                <option value=''>Select Color</option>
                                {colors.map((a) => (
                                    <option key={a} >{a}</option>
                                ))}
                            </select>
                            {errors.color
                                ? (<span className='text-danger'>{errors.color}</span>)
                                : ''
                            }
                        </div>
                    </div>
                    <div className="d-flex justify-content-center">
                    <button onClick={this.handleSubmit} className='btn btn-primary'>{this.props.edit ? 'Update' : 'Submit'}</button>
                    </div>
                </div>
            </>
        );
    }
}

export default AddCar;