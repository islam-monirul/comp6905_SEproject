import React from "react";
import styles from "./box.module.css";
function Box({ children, size = 100, padding = 0, ...props }) {
  const boxSize = size + "px";
  return (
    <div
      className={styles.box}
      style={{ "--size": boxSize, padding: padding }}
      {...props}
    >
      {children}
    </div>
  );
}

export function BorderBox({ children, size = 100 }) {
  const boxSize = size + "px";
  return (
    <Box
      style={{
        "--size": boxSize,
        border: "0.5px solid var(--grey)",
        padding: "1rem",
        borderRadius: "5px",
      }}
    >
      {children}
    </Box>
  );
}
export default Box;
