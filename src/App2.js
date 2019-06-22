import React, { Component } from 'react';
import Header from './components/Header/Header';
import SnippetsList from './components/SnippetsList/SnippetsList';
import SnippetsEditor from './components/SnippetsEditor/SnippetsEditor';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import style from './App.module.scss';
import Storage from './util/storage/storage';
import { initiateLogin, sendCode } from './services/api/login';
import { getUserGists } from './services/api/gists';
import { getUserInfo } from './services/api/users';
import getQueryVariable from './util/getQueryVariable';
import Spinner from './components/Spinner/Spinner';

window.onload = async function(event) {
  const code = getQueryVariable('code');

  if (code) {
    const { data } = await sendCode(code);
    window.location.href = 'http://localhost:3000/';

    if (data.includes('access_token')) {
      const token = data.substring(data.indexOf('=') + 1, data.indexOf('&'));
      Storage.set('access_token', token);
    }
  }
};

class App extends Component {
  state = {
    userGists: null,
    pageNumber: 1,
    editor: {
      name: '',
      desc: '',
      content: '',
    },
    allGistsListed: false,
    profile: null,
    loading: false,
  };

  componentDidMount = async () => {
    this.setState({ loading: true });
    if (Storage.get('access_token')) {
      const { data } = await getUserInfo();
      this.fetchUserGists();
      console.log('data :', data);
      this.setState({ profile: data });
    }
    this.setState({ loading: false });
  };

  fetchUserGists = async () => {
    await this.setState({ pageNumber: 1 });
    const { data } = await getUserGists(
      this.state.profile.login,
      this.state.pageNumber
    );
    this.setState({ userGists: data, allGistsListed: false });
  };

  loadSnippets = async () => {
    await this.setState({ pageNumber: 2 });
    const { data } = await getUserGists(
      this.state.profile.login,
      this.state.pageNumber
    );

    //if fetched the same items, do not add to userGists array, just exit early
    for (const snippet of this.state.userGists) {
      for (const gist of data) {
        if (snippet.id === gist.id) {
          this.setState({ allGistsListed: true });
          return;
        }
      }
    }

    this.setState({ userGists: [...this.state.userGists, ...data] });
  };

  handleFormChange = (inputType, value) => {
    const editor = { ...this.state.editor };
    editor[inputType] = value;
    this.setState({ editor });
  };

  loginLogic = async () => {
    initiateLogin();
  };

  logoutLogic = async () => {
    Storage.remove('access_token');
    this.setState({ profile: null });
    this.forceUpdate();
  };

  render() {
    return (
      <div className={style.app}>
        {this.state.loading && <Spinner />}
        <Header
          loginLogic={this.loginLogic}
          logoutLogic={this.logoutLogic}
          fetchUserGists={this.fetchUserGists}
          profile={this.state.profile}
        />
        {Storage.get('access_token') ? (
          <div className={style.row}>
            {this.state.userGists && (
              <SnippetsList
                userGists={this.state.userGists}
                loadSnippets={this.loadSnippets}
                allGistsListed={this.state.allGistsListed}
              />
            )}
            {this.state.userGists && (
              <SnippetsEditor
                editor={this.state.editor}
                handleFormChange={this.handleFormChange}
              />
            )}
          </div>
        ) : (
          <div className={style['no-access']}>
            Please login to access your snippets
          </div>
        )}
      </div>
    );
  }
}

export default App;
