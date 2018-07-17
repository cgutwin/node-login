import React, {Component} from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      username: null,
      password: null
    };
    
    this.verifyUser = this.verifyUser.bind(this);
  }
  
  /**
   * Fetches the verification state from the server.
   * @returns error
   */
  verifyUser = async () => {
    const url = `api/users/verify?Username=${this.state.username}&Password=${this.state.password}`;
    try {
      const response = await fetch(url);
      const body = await response.json();
      
      if (response.status !== 200) throw Error(body.message);
      if (body.resp.resp.auth === true) this.props.updateLoginState(true);
    }
    catch (e) {
      return e;
    }
  };
  
  render() {
    return (
      <div id="login">
        <input type="text"
               placeholder="username"
               onChange={(evt) => {
                 this.setState({username: evt.target.value})
               }}>
        </input>
        <input type="password"
               placeholder="password"
               onChange={(evt) => {
                 this.setState({password: evt.target.value})
               }}>
        </input>
        <button id="login-submit"
                onClick={this.verifyUser}>log in
        </button>
      </div>
    );
  }
}

export default App;
