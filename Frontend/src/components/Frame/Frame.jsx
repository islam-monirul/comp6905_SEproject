import React from "react";
import styles from "./frame.module.css";
function Frame({ children }) {
  return <div className={styles.frame}>{children}</div>;
}

export default Frame;
