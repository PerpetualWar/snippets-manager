import React from 'react';
import Header from './components/Header/Header'
import SnippetsList from './components/SnippetsList/SnippetsList'
import SnippetsEditor from './components/SnippetsEditor/SnippetsEditor'
import style from './App.module.scss';


function App() {
  return (
    <div className="App">
        <Header />
        <SnippetsList />
        <SnippetsEditor />
        <button className={style.btn}>TEST</button>
    </div>
  );
}

export default App;
