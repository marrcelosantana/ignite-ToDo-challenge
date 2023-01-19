import { useState } from "react";
import { ModalDelete } from "../ModalDelete";
import { Trash, Check } from "phosphor-react";
import { Task } from "../../models/Task";

import styles from "./styles.module.scss";

interface Props {
  task: Task;
  deleteTask: (id: string) => void;
  changeStatus: (id: string) => void;
}

export function TaskCard({ task, deleteTask, changeStatus }: Props) {
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
        className={task.isDone === false ? styles.notDone : styles.done}
        onClick={() => changeStatus(task.id)}
      >
        <Check size={14} />
      </button>
      <div className="description">
        <label
          htmlFor={task.id}
          className={
            task.isDone === true ? styles.textDone : styles.textNotDone
          }
        >
          {task.description}
        </label>
      </div>
      <button onClick={handleOpenModal} className={styles.trashBtn}>
        <Trash color="white" size={20} />
      </button>
      <ModalDelete
        isOpenModal={isOpenModal}
        closeModal={handleCloseModal}
        deleteTask={() => deleteTask(task.id)}
        taskId={task.id}
      />
    </div>
  );
}
