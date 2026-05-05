import styles from "./icon.module.css";
function Icon() {
  return (
    <div className={styles["btn-con"]}>
      <div>
        <button className={styles["btn-book"]}>✂</button>
        <div className={styles["text-book-now"]}>BOOK NOW</div>
      </div>
      <div>
        <button className={styles["btn-hairstyle"]}>👦</button>
        <div className={styles["sow-hair"]}>SOW HAIR</div>
      </div>
      <div>
        <button className={styles["btn-service"]}>🤵🏾</button>
        <div className={styles["our-services"]}>OUR SERVICES</div>
      </div>
    </div>
  );
}
export default Icon;
