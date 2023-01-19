import { useState, useEffect } from "react";
import { ModalDelete } from "../ModalDelete";
import { Trash } from "phosphor-react";
import styles from "./styles.module.scss";

interface Props {
  id: string;
  description: string;
  concluded: boolean;
  deleteActivity: (id: string) => void;
}

export function ActivityCard({
  id,
  description,
  concluded,
  deleteActivity,
}: Props) {
  const [isChecked, setIsChecked] = useState(concluded);

  const [isOpenModal, setIsOpenModal] = useState(false);

  function handleOpenModal() {
    setIsOpenModal(true);
  }

  function handleCloseModal() {
    setIsOpenModal(false);
  }

  useEffect(() => {
    console.log(isChecked);
  }, []);

  return (
    <div className={styles.container}>
      <input
        type="checkbox"
        name="description"
        id="description"
        onChange={(e) => setIsChecked(e.target.checked)}
      />
      <label htmlFor="description">{description}</label>
      <button onClick={handleOpenModal}>
        <Trash color="white" size={20} />
      </button>
      <ModalDelete
        isOpenModal={isOpenModal}
        closeModal={handleCloseModal}
        deleteActivity={() => deleteActivity(id)}
        activityId={id}
      />
    </div>
  );
}
