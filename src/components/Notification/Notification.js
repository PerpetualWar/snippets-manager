import React from 'react';
import style from './Notification.module.scss';

function Notification({ message, active }) {
  return (
    <div
      className={`${style.container} ${active ? style.active : style.inactive}`}
    >
      {message}
    </div>
  );
}

export default Notification;
