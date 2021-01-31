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

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

const styles = theme => ({
  root: {
    width: '100%',
    minWidth: 1080
  },
  paper: {
    marginLeft: 18,
    marginRight: 18
  },
  menu: {
    marginTop: 15,
    marginBottom: 15,
    display: 'flex',
    justifyContent: 'center'
  },
  progress: {
    margin: theme.spacing.unit * 3
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  tableHead: {
    fontSize: '1.0rem'
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
    const cellList = ["Id", "Image", "UserName", "Birth", "Gender", "Email", "Settings"]
    if (userdata) {
      return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap>
              Customer Management
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
          </Toolbar>
        </AppBar>
        <div className={classes.menu}>
          <CustomerAdd stateRefresh={this.stateRefresh} />
        </div>
        <Paper className={classes.paper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                {cellList.map(c => {
                  return <TableCell className={classes.tableHead}>{c}</TableCell>
                }) }
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