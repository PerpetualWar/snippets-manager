import React from 'react';
import { format } from 'date-fns';
import style from './SnippetsItem.module.scss';

function SnippetsItem({ gist, selectItem }) {
  const localTime = () => {
    return format(gist.created_at, 'DD/MM/YYYY HH:mm:ss');
  };

  const description = () => {
    //test if description even exist before trying to take length
    const length = gist.description && gist.description.length;
    const ending = '...';
    if (length > 139) {
      console.log('length :', length);
      return gist.description.substring(0, length - ending.length) + ending;
    }
    return gist.description;
  };

  return (
    <div className={style.container} onClick={selectItem.bind(this, gist.id)}>
      <div className={`${style.flexrows} ${style.header}`}>
        <div>Name</div>
        <div>Description</div>
        <div>Created at</div>
      </div>
      <div className={`${style.flexrows} ${style.content}`}>
        <div>{gist.files && Object.keys(gist.files)[0]}</div>
        <div className={style.desc}>{description()}</div>
        <div>{localTime()}</div>
      </div>
      <div />
    </div>
  );
}

export default SnippetsItem;
