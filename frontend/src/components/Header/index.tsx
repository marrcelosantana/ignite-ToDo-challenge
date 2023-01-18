import logo from "../../assets/logo.svg";

import styles from "./styles.module.scss";

export function Header() {
  return (
    <div className={styles.container}>
      <img src={logo} alt="Logo Rocket" />
      <div className={styles.title}>
        <span className={styles.firstSpan}>to</span>
        <span className={styles.secondSpan}>do</span>
      </div>
    </div>
  );
}
