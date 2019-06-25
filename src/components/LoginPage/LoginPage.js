import React, { Component } from 'react';

class LoginPage extends Component {
  componentDidMount = () => {
    var code = window.location.toString().replace(/.+code=/, '');
    console.log('code :', code);
    window.opener.postMessage(code, window.location);
    window.close();
  };
  render() {
    return <div>login page, wait to be redirected...</div>;
  }
}

export default LoginPage;
