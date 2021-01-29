import React from 'react';

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      username: null
    } 
  }

  componentDidMount() {
    fetch('/')
      .then(res=>res.json())
      .then(data=>this.setState({username:data.username}));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div>
            {this.state.username ? <h1>Hi. ${this.state.username}</h1> : <h1>loading...</h1>}
          </div>
        </header>
      </div>
    );
  }
}

export default App;