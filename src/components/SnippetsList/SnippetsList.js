import React from 'react';
import SnippetsItem from '../SnippetsItem/SnippetsItem';
import style from './SnippetsList.module.scss';

function SnippetsList({ userGists, loadSnippets, allGistsListed, ...props }) {
  console.log('props :', props);
  return (
    <div className={`col-lg-6`}>
      {/* <div className={style.container}> */}
      {userGists.map(gist => (
        <SnippetsItem gist={gist} key={gist.id} {...props} />
      ))}
      <button
        className={`btn btn-light btn-block ${style['button-load']}`}
        onClick={loadSnippets}
        disabled={allGistsListed}
      >
        {allGistsListed ? 'All gists shown' : 'Load more'}
      </button>
    </div>
  );
}

export default SnippetsList;
