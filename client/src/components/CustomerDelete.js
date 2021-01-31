import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

class CustomerDelete extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
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
    
    deleteCustomer = (id) => {
        const url = '/api/customers/delete/' + id;
        fetch(url, {
            method: 'DELETE'
        });
        this.props.deleteRefresh();
    }

    render() {
        return(
            <div>
                <Button variant="contained" color="secondary" onClick={()=> {this.handleClickOpen()}}>Delete</Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle onClose={this.handleClose}>
                        Warning 
                    </DialogTitle>
                    <DialogContent>
                        <Typography>
                            선택한 고객 정보가 삭제됩니다.
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={(e) => {this.deleteCustomer(this.props.id)}}>Delete</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClose}>Close</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
};

export default CustomerDelete;