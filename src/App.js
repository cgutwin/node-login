import React, {Component} from 'react';
import './App.css';

import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      loginState: false
    };
    
    this.updateLoginState = this.updateLoginState.bind(this);
  }
  
  /**
   * Updates whether the user is logged in or not
   * @param {boolean} bool — Is user logged in
   * @returns null
   */
  updateLoginState = (bool) => {
    this.setState({
      loginState: bool
    });
  };
  
  render() {
    let login = <Login updateLoginState={this.updateLoginState}/>;
    
    if (this.state.loginState) login = null;
    
    return (
      <div>
        {login}
        <Signup/>
      </div>
    );
  }
}

export default App;