import React from "react";
import styles from "./../../style/main.module.scss";

export interface FilterViewProps {
  isError: boolean;
  message: string;
}

export default function InvalidMessage(props: FilterViewProps) {
  const { isError, message } = props;
  return (
    <>
      {isError && (
        <div>
          <span style={{ paddingRight: "5px" }} className={styles.errorMessage}>
            {message}
          </span>
        </div>
      )}
    </>
  );
}
