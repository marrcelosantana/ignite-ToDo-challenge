import { useState, useEffect } from "react";
import { ModalDelete } from "../ModalDelete";
import { Trash } from "phosphor-react";
import { Activity } from "../../models/Activity";

import styles from "./styles.module.scss";

interface Props {
  activity: Activity;
  deleteActivity: (id: string) => void;
}

export function ActivityCard({ activity, deleteActivity }: Props) {
  const [isOpenModal, setIsOpenModal] = useState(false);

  function handleOpenModal() {
    setIsOpenModal(true);
  }

  function handleCloseModal() {
    setIsOpenModal(false);
  }

  useEffect(() => {}, []);

  return (
    <div className={styles.container}>
      <input type="checkbox" id={activity.id} style={{ cursor: "pointer" }} />
      <label htmlFor={activity.id}>{activity.description}</label>
      <button onClick={handleOpenModal}>
        <Trash color="white" size={20} />
      </button>
      <ModalDelete
        isOpenModal={isOpenModal}
        closeModal={handleCloseModal}
        deleteActivity={() => deleteActivity(activity.id)}
        activityId={activity.id}
      />
    </div>
  );
}
