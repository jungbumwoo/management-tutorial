import React from "react";
import { post } from "axios";

class CustomerAdd2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            fileName: '',
            username: '',
            gender: '',
            email: ''
        }
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        this.addCustomer()
            .then((response) => {
                console.log(response.data);
            })
    };

    handleOnchange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    addCustomer = () => {
        const url = '/api/customers';
        const formData = new FormData();
        console.log(formData);
        formData.append('image', this.state.image);
        formData.append('username', this.state.username);
        formData.append('birthday', this.state.birthday);
        formData.append('gender', this.state.gender);
        formData.append('email', this.state.email);
        console.log(formData);
        const config = {
            headers: {
                'content-type' : 'multipart/form-data'
            }
        }
        return post(url, formData, config)
    }

    render(){
        return(
            <from onSubmit={this.handleFormSubmit}>
                <h1>고객 추가</h1>
                프로필 이미지: <input type="file" 
                                name="file" 
                                file={this.state.file} 
                                value={this.state.fileName} 
                                onChange={this.handleFileChange} /><br/>
                이름: <input type="text" name="username" 
                            value={this.state.username} 
                            onChange={this.handleOnchange} /><br/>
                생년월일: <input type="text" name="birthday" value={this.state.birthday} onChange={this.handleOnchange} />
                성별: <input type="text" name="gender" value={this.state.gender} onChange={this.handleOnchange} />
                email: <input type="text" name="email" value={this.state.email} onChange={this.handleOnchange} />
                <button type="submit">Submit</button>
            </from>
        )
    }


}

export default CustomerAdd2;