import styles from "../../style/main.module.scss";

export interface InvalidMessageProps {
  isError: boolean;
  message: string;
}

export default function InvalidMessage({
  isError,
  message,
}: InvalidMessageProps) {
  if (!isError) {
    return null;
  }

  return (
    <div>
      <span style={{ paddingRight: "5px" }} className={styles.errorMessage}>
        {message}
      </span>
    </div>
  );
}
