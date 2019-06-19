import React from 'react';
import styles from './Header.module.scss'

function Header() {
  return (
    <nav className={styles.nav}>
      <div className={styles.left}>
        Snippets Manager
      </div>
      <ul className={styles.right}>
        <li>Username</li>
        <li>Logout</li>
      </ul>
    </nav>
  );
}

export default Header;