import React from 'react';
import Header from './components/Header/Header';
import SnippetsList from './components/SnippetsList/SnippetsList';
import SnippetsEditor from './components/SnippetsEditor/SnippetsEditor';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import style from './App.module.scss';
import { initiateLogin, sendCode, revoke } from './services/api/login';
import { getUserGists, getAllPublicGists } from './services/api/gists';
import getQueryVariable from './util/getQueryVariable';

function App() {
  let code;
  let access_token;
  let count = 0;
  window.addEventListener('message', async event => {
    code = getQueryVariable('code');
    access_token = getQueryVariable('access_token');
    console.log('access token', code, access_token);
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
      <Header />
      <SnippetsList />
      <SnippetsEditor />
      <button className={style.btn} onClick={loginLogic}>
        Login
      </button>
    </div>
  );
}

export default App;
