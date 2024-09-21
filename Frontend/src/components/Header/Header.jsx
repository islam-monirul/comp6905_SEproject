import React from "react";

import styles from "./header.module.css";

function Header() {
  return (
    <header>
      <nav>
        <ul className={styles.navbar}>
          <li>Ski App</li>

          <div className={styles.links}>
            <li>
              <a href="#" className="">
                Features
              </a>
            </li>
            <li>
              <a href="#">Explore</a>
            </li>
            <li>
              <a href="#">Resorts</a>
            </li>
          </div>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
