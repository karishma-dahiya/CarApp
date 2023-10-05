import React, { Component } from 'react';
import http from './httpReq.js';

class Delete extends Component {

    async componentDidMount() {
        let { id } = this.props.match.params;
        //console.log(id);
        let response = await http.deleteApi(`/cars/${id}`);
        alert(response.data);
        this.props.history.push('/cars');
    }

    render() {

        return '';
    }
}

export default Delete;