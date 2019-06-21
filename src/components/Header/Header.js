import React from 'react';
import styles from './Header.module.scss';
import Storage from '../../util/storage/Storage';

function Header({ loginLogic, fetchUserGists }) {
  return (
    <nav className={styles.nav}>
      <div className={styles.left}>Snippets Manager</div>
      <ul className={styles.right}>
        <li>
          <button className="btn btn-primary" onClick={fetchUserGists}>
            Fetch
          </button>
        </li>
        <li>Username</li>
        <li>
          {Storage.get('access_token') ? (
            <button
              className="btn btn-primary"
              onClick={Storage.remove('access_token')}
            >
              Logout
            </button>
          ) : (
            <button className="btn btn-primary" onClick={loginLogic}>
              Login
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Header;
