import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Storage from './util/storage';
import { sendCode } from './services/api/login';
import LoginPage from './pages/LoginPage/LoginPage';
import Home from './pages/Home/Home';
import getQueryVariable from './util/getQueryVariable';

class App extends Component {
  state = {
    fetchingToken: false,
  };

  componentDidMount = () => {
    window.onload = async function(event) {
      const code = getQueryVariable('code');

      if (code) {
        const { data } = await sendCode(code);
        window.location.href = process.env.REACT_APP_URL;

        if (data.includes('access_token')) {
          const token = data.substring(
            data.indexOf('=') + 1,
            data.indexOf('&')
          );
          Storage.set('access_token', token);
        }
      }
    };

    /**
     * This implementation, even though better does not work on mobile browser due to
     * window.opener being null... remains to be seen if workaround is possible...
     */
    // window.addEventListener('message', async event => {
    //   var msg = event.data;
    //   console.log('msg :', msg);
    //   if (msg.hasOwnProperty('code')) {
    //     this.setState({ fetchingToken: true });
    //     const { data } = await sendCode(msg.code);
    //     if (data.includes('access_token')) {
    //       const token = data.substring(
    //         data.indexOf('=') + 1,
    //         data.indexOf('&')
    //       );
    //       Storage.set('access_token', token);
    //       this.setState({ fetchingToken: false });
    //       window.location.href = process.env.REACT_APP_URL;
    //     }
    //   }
    // });
  };

  render() {
    return (
      <Router>
        <Route
          path="/"
          render={props => (
            <Home
              {...props}
              key={Date.now()}
              fetchingToken={this.state.fetchingToken}
            />
          )}
        />
        <Route path="/login" component={LoginPage} exact={true} />
      </Router>
    );
  }
}

export default App;
