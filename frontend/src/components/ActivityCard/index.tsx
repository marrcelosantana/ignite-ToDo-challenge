import { useState } from "react";
import { ModalDelete } from "../ModalDelete";
import { Trash, Check } from "phosphor-react";
import { Activity } from "../../models/Activity";

import styles from "./styles.module.scss";

interface Props {
  activity: Activity;
  deleteActivity: (id: string) => void;
  changeStatus: (id: string) => void;
}

export function ActivityCard({
  activity,
  deleteActivity,
  changeStatus,
}: Props) {
  const [isOpenModal, setIsOpenModal] = useState(false);

  function handleOpenModal() {
    setIsOpenModal(true);
  }

  function handleCloseModal() {
    setIsOpenModal(false);
  }

  return (
    <div className={styles.container}>
      <button
        className={
          activity.concluded === false ? styles.notConcluded : styles.concluded
        }
        onClick={() => changeStatus(activity.id)}
      >
        <Check size={14} />
      </button>
      <div className="description">
        <label
          htmlFor={activity.id}
          className={
            activity.concluded === true
              ? styles.textConcluded
              : styles.textNotConcluded
          }
        >
          {activity.description}
        </label>
      </div>
      <button onClick={handleOpenModal} className={styles.trashBtn}>
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
