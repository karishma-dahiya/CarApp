import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
    render(){
        
        return (
            <>
            <nav className='navbar navbar-expand-sm  navbar-light bg-danger'>
                    <div style={{width:'100%'}} className="d-flex justify-content-between ">
                        <Link className='ps-5 navbar-brand fw-bold text-white' to='/'>Home</Link>
                    <Link  className='navbar-brand ps-5 pe-5 text-white' to='/addCar'>
                        New Car
                        <span className='badge badge-pill badge-secondary'></span>
                </Link>
                </div>
            </nav>
            </>
        );
    }
}
export default Navbar;