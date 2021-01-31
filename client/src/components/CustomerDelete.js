import React from "react";
import { post } from "axios";

class CustomerDelete extends React.Component {
    
    deleteCustomer = () => {
        console.log(this.props.id);
        const url = '/api/customers/delete';
        let data  = {};
        data["deleteId"] = this.props.id;
        const config = {
            headers: {
                'content-type': 'Application/json'
            }
        }
        return post(url, data, config);
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