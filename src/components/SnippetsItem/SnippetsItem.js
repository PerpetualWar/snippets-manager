import React from 'react';
import { format } from 'date-fns';
import style from './SnippetsItem.module.scss';

function SnippetsItem({ gist, selectItem, selectedItemId }) {
  // console.log('gist :', gist);
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
    <div
      className={`${style.container} ${gist.id === selectedItemId &&
        style.selected}`}
      onClick={() => selectItem(gist.id, gist.files)}
    >
      <div className={`row ${style.header}`}>
        {/* <div className={`${style.flexrows} ${style.header}`}> */}
        <div className="col-4 text-center">Name</div>
        <div className="col-4 text-center">Description</div>
        <div className="col-4 text-center">Created at</div>
      </div>
      <div className="row">
        {/* <div className={`${style.flexrows} ${style.content}`}> */}
        <div className="col-4 text-center">
          {gist.files && Object.keys(gist.files)[0]}
        </div>
        <div className="col-4 text-center">{description()}</div>
        {/* <div className={style.desc}>{description()}</div> */}
        <div className="col-4 text-center">{localTime()}</div>
      </div>
      <div />
    </div>
  );
}

export default SnippetsItem;
