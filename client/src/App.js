import React from 'react';

import Customer from "./components/Customer";
import CustomerAdd from "./components/CustomerAdd";
import CustomerAdd2 from "./components/CustomerAdd2";

import CircularProgress from "@material-ui/core/CircularProgress";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { withStyles } from "@material-ui/core/styles";
import { Paper } from '@material-ui/core';
import CustomerDelete from './components/CustomerDelete';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 1080
  },
  progress: {
    margin: theme.spacing.unit * 2
  }
});


class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      customers: '',
      completed: 0,
      username: null,
      userdata: null,
    } 
  }

  stateRefresh = () => {
    this.setState({
      userdata: null,
      completed: 0
    });
    this.callApi()
      .then(res=>this.setState({ userdata: res.rows}))
      .catch(err=> console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/users');
    const body = response.json();
    return body;
  };

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 40});
  }
  
  componentDidMount() {
    this.timer = setInterval(this.progress, 1);
    fetch('/api/users')
      .then(res => res.json())
      .then(data => this.setState({ userdata: data.rows }))
      .then(clearInterval(this.timer))
  }
  

  render() {
    let { userdata } = this.state;
    const { classes } = this.props;
    if (userdata) {
      return (
      <div>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Img</TableCell>
                <TableCell>username</TableCell>
                <TableCell>birthday</TableCell>
                <TableCell>gender</TableCell>
                <TableCell>email</TableCell>
                <TableCell>Settings</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { userdata.map((m) => <Customer 
              key={m.id}
              id={m.id}
              image={m.image}
              username={m.username}
              birthday={m.birthday}
              gender={m.gender}
              email={m.email}
              stateRefresh={this.stateRefresh}
              />
              )}
            </TableBody>
          </Table>
        </Paper>
        <CustomerAdd stateRefresh={this.stateRefresh} />
      </div>
      )
    } else {
      return (
        <TableRow>
          <TableCell colSpan="6" align="center">
            <CircularProgress className={classes.progress} variant="indeterminate" value={this.state.completed} />
          </TableCell>
        </TableRow>
      )
    }
  }
}

export default withStyles(styles)(App); 