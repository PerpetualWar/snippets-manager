import React from 'react';
import SnippetsItem from '../SnippetsItem/SnippetsItem';
import style from './SnippetsList.module.scss';

function SnippetsList({ userGists, loadSnippets, allGistsListed }) {
  return (
    // <div className={`col ${style.fixed}`}>
    <div className={style.container}>
      {userGists.map(gist => (
        <SnippetsItem gist={gist} key={gist.id} />
      ))}
      <button
        className={`btn btn-light ${style['button-load']}`}
        onClick={loadSnippets}
        disabled={allGistsListed}
      >
        {allGistsListed ? 'All gists shown' : 'Load more'}
      </button>
    </div>
  );
}

export default SnippetsList;
