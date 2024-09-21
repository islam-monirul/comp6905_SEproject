import React from "react";
import styles from "./Stack.module.css";
function Stack({ children, spacing = 1 }) {
  const margin = spacing + "rem";
  return (
    <div className={styles["stack"]} style={{ "--s1": margin }}>
      {children}
    </div>
  );
}

export default Stack;
