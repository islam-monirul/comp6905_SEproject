import React from "react";
import styles from "./cover.module.css";
function Cover({ children }) {
  return <div className={styles.cover}>{children}</div>;
}

export default Cover;
