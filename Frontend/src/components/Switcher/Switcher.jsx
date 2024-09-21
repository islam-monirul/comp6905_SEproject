import React from "react";
import styles from "./switcher.module.css";
function Switcher({ children }) {
  return <div className={styles.switcher}>{children}</div>;
}

export default Switcher;
