import React from 'react';
import Header from './components/Header/Header';
import SnippetsList from './components/SnippetsList/SnippetsList';
import SnippetsEditor from './components/SnippetsEditor/SnippetsEditor';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import style from './App.module.scss';
import { initiateLogin } from './services/api/login';
import { getUserGists, getAllPublicGists } from './services/api/gists';
import GitHubLogin from 'react-github-login';
import getQueryVariable from './util/getQueryVariable';

function App() {
  const onSuccess = res => console.log(res);
  const onFailure = err => console.error(err);
  let code;

  window.addEventListener('message', event => {
    code = getQueryVariable('code');
    console.log(code);
  });

  const loginLogic = () => {
    // window.open(
    //   'https://github.com' +
    //     '/login/oauth/authorize' +
    //     '?client_id=' +
    //     process.env.REACT_APP_CLIENT_ID +
    //     // '?client_id=7c82a4326bf5e869b8bd' +
    //     '&scope=gist'
    // );

    initiateLogin();
    // getUserGists('PerpetualWar');
    // getAllPublicGists();
  };
  return (
    <div className="App">
      {/* <Router> */}
      {/* <GitHubLogin
        clientId="7c82a4326bf5e869b8bd"
        onSuccess={onSuccess}
        onFailure={onFailure}
      /> */}
      <Header />
      <SnippetsList />
      <SnippetsEditor />
      {/* </Router> */}
      <button className={style.btn} onClick={loginLogic}>
        Login
      </button>
    </div>
  );
}

export default App;
