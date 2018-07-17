import React, {Component} from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      username: null,
      email: null,
      password: null,
      body: null
    };
    
    this.newUser = this.newUser.bind(this);
  }
  
  /**
   * Queries the server to create a new user with the credentials passed by the inputs
   * @returns {object}
   */
  newUser = async () => {
    const url = `api/users/new?Username=${this.state.username}&Email=${this.state.email}&Password=${this.state.password}`;
    try {
      const response = await fetch(url);
      const body = await response.json();
      
      if (response.status !== 200) throw body.message;
      return body;
    }
    catch (e) {
      return e;
    }
  };
  
  render() {
    return (
      <div id="signup">
        <input type="text"
               placeholder="username"
               onChange={(evt) => {
                 this.setState({username: evt.target.value})
               }}>
        </input>
        <input type="email"
               placeholder="email"
               onChange={(evt) => {
                 this.setState({email: evt.target.value})
               }}>
        </input>
        <input type="password"
               placeholder="password"
               onChange={(evt) => {
                 this.setState({password: evt.target.value})
               }}>
        </input>
        <button id="login-submit"
                onClick={this.newUser}>sign up
        </button>
      </div>
    );
  }
}

export default App;
