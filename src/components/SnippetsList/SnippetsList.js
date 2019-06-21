import React from 'react';
import SnippetsItem from '../SnippetsItem/SnippetsItem';
import style from './SnippetsList.module.scss';

function SnippetsList({ userGists, loadSnippets }) {
  return (
    <div className={style.container}>
      {userGists.map(gist => (
        <SnippetsItem gist={gist} key={gist.id} />
      ))}
      {/* <div> */}
      <button
        className={`btn btn-light ${style['button-load']}`}
        onClick={loadSnippets}
      >
        Load more
      </button>
      {/* </div> */}
    </div>
  );
}

export default SnippetsList;
