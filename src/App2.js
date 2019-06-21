import React, { Component } from 'react';
import Header from './components/Header/Header';
import SnippetsList from './components/SnippetsList/SnippetsList';
import SnippetsEditor from './components/SnippetsEditor/SnippetsEditor';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import style from './App.module.scss';
import { initiateLogin, sendCode, revoke } from './services/api/login';
import { getUserGists, getAllPublicGists } from './services/api/gists';
import GitHubLogin from 'react-github-login';
import getQueryVariable from './util/getQueryVariable';

class App extends Component {
  // let code;
  // let count = 0;
  // window.addEventListener('message', async event => {
  //   code = getQueryVariable('code');
  //   console.log(code, window.location);
  //   if (code && count === 0) {
  //     const res = await sendCode(code);
  //     console.log('res :', res);
  //     count += 1;
  //   }
  // });

  state = {
    userGists: null,
    pageNumber: 1,
  };

  fetchUserGists = async () => {
    await this.setState({ pageNumber: 1 });
    const { data } = await getUserGists('PerpetualWar', this.state.pageNumber);
    this.setState({ userGists: data });
  };

  loadSnippets = async () => {
    await this.setState({ pageNumber: 2 });
    const { data } = await getUserGists('PerpetualWar', this.state.pageNumber);

    //if fetched the same items, do not add to userGists array, just exit early
    for (const snippet of this.state.userGists) {
      for (const gist of data) {
        if (snippet.id === gist.id) {
          return;
        }
      }
    }

    this.setState({ userGists: [...this.state.userGists, ...data] });
  };

  loginLogic = async () => {
    // initiateLogin();
    // console.log(await getAllPublicGists());
    // getAllPublicGists();
  };

  render() {
    return (
      <div className="App">
        <Header
          loginLogic={this.loginLogic}
          fetchUserGists={this.fetchUserGists}
        />
        {this.state.userGists && (
          <SnippetsList
            userGists={this.state.userGists}
            loadSnippets={this.loadSnippets}
          />
        )}
        <SnippetsEditor />
      </div>
    );
  }
}

export default App;
