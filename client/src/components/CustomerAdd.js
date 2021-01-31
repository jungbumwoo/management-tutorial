import React from "react";
import { post } from "axios";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    hidden: {
        display: 'none'
    }
})

class CustomerAdd extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            file: null,
            image: '',
            username: '',
            birthday: '',
            gender: '',
            email: '',
            fileName: '',
            open: false
        }       
    }

    handleClickOpen() {
        console.log("handleClickOpen")
        this.setState({
            open: true
        });
    }

    handleClose = () => {
        console.log("handleClose");
        this.setState({
            file: null,
            username: '',
            birthday: '',
            gender: '',
            job: '',
            image: '',
            fileName: '',
            open: false
        })
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        this.addCustomer()
            .then((response) => {
                console.log(response.data);
                this.props.stateRefresh();
            })
        this.setState({
            file: null,
            username: '',
            birthday: '',
            gender: '',
            job: '',
            image: '',
            fileName: ''
        })
        
    };

    handleFileChange = (e) => {
        this.setState({
            file: e.target.files[0],
            fileName: e.target.value
        })
    }

    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    addCustomer = () => {
        const url = '/api/customers';
        const formData = new FormData();
        formData.append('image', this.state.file);
        formData.append('username', this.state.username);
        formData.append('birthday', this.state.birthday);
        formData.append('gender', this.state.gender);
        formData.append('email', this.state.email);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return post(url, formData, config);
    }


    render(){
        const { classes } = this.props;
        return(
            <div>
                <Button variant="contained" color="primary" onClick={()=>this.handleClickOpen()}>
                    AddCustomer
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>Add Customer</DialogTitle>
                </Dialog>
            </div>
            /**
            <form onSubmit={this.handleFormSubmit}>
                <h1>고객 추가</h1>
                프로필 이미지: <input type="file" 
                                name="file" 
                                file={this.state.file} 
                                value={this.state.fileName} 
                                onChange={this.handleFileChange} /><br/>
                이름: <input type="text" name="username" 
                            value={this.state.username} 
                            onChange={this.handleValueChange} /><br/>
                생년월일: <input type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange} /><br/>
                성별: <input type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange} /><br/>
                email: <input type="text" name="email" value={this.state.email} onChange={this.handleValueChange} /><br/>
                <button type="submit">추가하기</button>
            </form>
             */
        )
    }
}

export default CustomerAdd;