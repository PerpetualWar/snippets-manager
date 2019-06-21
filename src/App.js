import React from 'react';
import Header from './components/Header/Header';
import SnippetsList from './components/SnippetsList/SnippetsList';
import SnippetsEditor from './components/SnippetsEditor/SnippetsEditor';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import style from './App.module.scss';
import { initiateLogin, sendCode, revoke } from './services/api/login';
import { getUserGists, getAllPublicGists } from './services/api/gists';
import GitHubLogin from 'react-github-login';
import getQueryVariable from './util/getQueryVariable';

function App() {
  let code;
  let count = 0;
  window.addEventListener('message', async event => {
    code = getQueryVariable('code');
    console.log(code, window.location);
    if (code && count === 0) {
      const res = await sendCode(code);
      console.log('res :', res);
      count += 1;
    }
  });

  const loginLogic = async () => {
    // initiateLogin();
    // console.log(await getAllPublicGists());
    const { data } = await getUserGists('PerpetualWar');
    console.log(data);
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
