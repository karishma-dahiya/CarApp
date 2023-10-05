import React, { Component } from 'react';
import { Route, Switch,Redirect } from 'react-router-dom';
import Delete from './DeleteCar';
import AddCar from './Form';
import Cars from './Home';
import Navbar from './Navbar';


class CarComponent extends Component {
    render() {
        return <>
            <Navbar />
            <Switch>
                <Route path='/addCar/edit/:custId' component={AddCar}></Route>
                <Route path='/addCar' component={AddCar}></Route>
                <Route path='/cars/delete/:id' component={Delete}></Route>
                <Route path='/cars' component={Cars}></Route>
                <Redirect from='/' to='cars'></Redirect>
            </Switch>
        </>
    }
}
export default CarComponent;