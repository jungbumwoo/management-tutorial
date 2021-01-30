import React from 'react';

import Customer from "./components/Customer";
import CustomerAdd from "./components/CustomerAdd";
import CustomerAdd2 from "./components/CustomerAdd2";

import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { withStyles } from "@material-ui/core/styles";
import { Paper } from '@material-ui/core';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 1080
  }
});


class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      userdata: null,
    } 
  }
  
  componentDidMount() {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => this.setState({ userdata: data.rows }));
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
              </TableRow>
            </TableHead>
            <TableBody>
              {userdata.map((m) => <Customer 
              key={m.id}
              id={m.id}
              image={m.image}
              username={m.username}
              birthday={m.birthday}
              gender={m.gender}
              email={m.email} /> )}
            </TableBody>
          </Table>
        </Paper>
        <CustomerAdd />
      </div>
      )
    } else {
      return (
        <h1>Loading...</h1>
      )
    }
  }
}

export default withStyles(styles)(App);