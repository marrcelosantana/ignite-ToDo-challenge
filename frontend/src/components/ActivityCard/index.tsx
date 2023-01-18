import { useState } from "react";

import { Trash } from "phosphor-react";
import styles from "./styles.module.scss";

interface Props {
  id: string;
  description: string;
  concluded: boolean;
  deleteActivity: (id: string) => Promise<void>;
}

export function ActivityCard({
  id,
  description,
  concluded,
  deleteActivity,
}: Props) {
  // const [isChecked, setIsChecked] = useState(concluded);

  return (
    <div className={styles.container}>
      <input type="checkbox" name="description" id="description" />
      <label htmlFor="description">{description}</label>
      <button onClick={() => deleteActivity(id)}>
        <Trash color="white" size={20} />
      </button>
    </div>
  );
}
