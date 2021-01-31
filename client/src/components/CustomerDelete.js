import React from "react";
import { post } from "axios";

class CustomerDelete extends React.Component {
    
    deleteCustomer = (id) => {
        const url = '/api/customers/delete/' + id;
        fetch(url, {
            method: 'DELETE'
        });
        this.props.deleteRefresh();
    }

    render() {
        return(
            <button onClick={(e)=> {this.deleteCustomer(this.props.id)}}>Delete</button>
        )
    }
};

export default CustomerDelete;