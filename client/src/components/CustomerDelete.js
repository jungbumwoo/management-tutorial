import axios from "axios";
import React from "react";
import { post } from "axios";

class CustomerDelete extends React.Component {

    deleteCustomer = () => {
        console.log(this.props.id);
        const url = '/api/customers/delete';
        const formData = new FormData();
        formData.append('deleteId', this.props.id);
        const config = {
            headers: {
                'content-type': 'Application/json'
            }
        }
        return post(url, formData, config);
    }

    deleteButton = () => {
        this.deleteCustomer()
            .then((response) => {
                console.log(response);
                this.props.stateRefresh();
            })
    }

    render() {
        return(
            <button onClick={()=> this.deleteButton()}>Delete</button>
        )
    }
};

export default CustomerDelete;