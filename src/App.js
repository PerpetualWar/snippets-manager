import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Storage from './util/storage';
import { sendCode } from './services/api/login';
import LoginPage from './components/LoginPage/LoginPage';
import Home from './pages/Home/Home';

class App extends Component {
  state = {
    fetchingToken: false,
  };

  componentDidMount = () => {
    window.addEventListener('message', async event => {
      var msg = event.data;
      console.log('msg :', msg);
      if (msg.hasOwnProperty('code')) {
        this.setState({ fetchingToken: true });
        const { data } = await sendCode(msg.code);

        if (data.includes('access_token')) {
          const token = data.substring(
            data.indexOf('=') + 1,
            data.indexOf('&')
          );
          Storage.set('access_token', token);
          this.setState({ fetchingToken: false });
        }
        // window.location.href = process.env.REACT_APP_URL;
        return <Redirect to="/home" />;
      }
    });
  };

  render() {
    return (
      <Router>
        <Route
          path="/"
          render={props => (
            <Home {...props} fetchingToken={this.state.fetchingToken} />
          )}
        />
        <Route path="/login" component={LoginPage} exact={true} />
      </Router>
    );
  }
}

export default App;
