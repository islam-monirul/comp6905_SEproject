import React from "react";
import styles from "./center.module.css";
function Center({ children }) {
  return <div className={styles.center}>{children}</div>;
}

export default Center;
