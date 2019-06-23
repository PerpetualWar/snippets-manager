import React from 'react';
import styles from './Header.module.scss';
import Storage from '../../util/storage/storage';

function Header({ loginLogic, logoutLogic, profile }) {
  return (
    <nav className={styles.nav}>
      <div className={styles.left}>
        <h4>
          <a href={process.env.REACT_APP_URL}>Snippets Manager</a>
        </h4>
      </div>
      <ul className={styles.right}>
        <li>
          {profile && (
            <img
              style={{ height: '60px', width: '40px' }}
              src={profile.avatar_url}
              alt="avatar"
            />
          )}
        </li>
        <li>{profile && profile.name}</li>
        <li>
          {Storage.get('access_token') ? (
            <button className="btn btn-light" onClick={logoutLogic}>
              Logout
            </button>
          ) : (
            <button className="btn btn-light" onClick={loginLogic}>
              Login
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Header;
