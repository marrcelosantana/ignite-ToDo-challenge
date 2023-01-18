import { Trash } from "phosphor-react";

import styles from "./styles.module.scss";

interface Props {
  description: string;
  concluded: boolean;
}

export function ActivityCard({ description, concluded }: Props) {
  return (
    <div className={styles.container}>
      <input type="checkbox" name="" id="" />
      <span>{description}</span>
      <button>
        <Trash color="white" size={20} />
      </button>
    </div>
  );
}
