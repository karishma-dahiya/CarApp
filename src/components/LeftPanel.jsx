import React, { Component } from 'react';

class LeftPanelOptionsCB extends Component {

    handleChange = (e) => {
        let options = { ...this.props.options };
        options[e.target.name] = e.target.value;
        this.props.onOptionChange(options);
    };
    
    makeBoxes = (arr, value, name, label) => (
        <>
            <label style={{ width: '200px' }} className='form-check-label fw-bold px-3 py-3 bg-light  fs-5 border'>{label}</label>
            {
                arr.map((a) => (
                    <div key={a} style={{ width: '200px' }} className="form-check px-5 py-3 fs-5 border">
                        <input
                            className='form-check-input'
                            type='radio'
                            name={name}
                            value={a}
                            checked={value===a}
                            onChange={this.handleChange}
                        />
                        <label className='form-check-label '>{a}</label>
                    </div>
                ))
            }
        </>
    );
    
    render() {
        let { fuel = '', type = '', sort = '' } = this.props.options;
        let fuelOpt = ['Diesel', 'Petrol'];
        let types = ['Hatchback', 'Sedan'];
        let sorting = ['kms', 'price', 'year'];
        return (
            <>
                <div className="row">
                   
                    <div className="col-12 my-2">
                        {this.makeBoxes(fuelOpt, fuel, 'fuel', 'Fuel')}
                    </div>
                    <div className="col-12 my-2 ">
                        {this.makeBoxes(types, type, 'type', 'Type')}
                    </div>
                    <div  className="col-12 my-2 ">
                        {this.makeBoxes(sorting, sort, 'sort', 'Sort')}
                    </div>
                   
                </div>
            </>
        )
    }
}
export default LeftPanelOptionsCB;