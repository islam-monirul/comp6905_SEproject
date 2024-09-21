import React from "react";
import styles from "./reel.module.css";
function Reel({ children }) {
  return <div className={styles.reel}>{children}</div>;
}

export default Reel;
