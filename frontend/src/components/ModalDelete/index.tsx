import Modal from "react-modal";

import { X, WarningCircle } from "phosphor-react";

import styles from "./styles.module.scss";

interface ModalProps {
  taskId: string;
  isOpenModal: boolean;
  closeModal: () => void;
  deleteTask: (id: string) => void;
}

export function ModalDelete({
  taskId,
  isOpenModal,
  closeModal,
  deleteTask,
}: ModalProps) {
  return (
    <Modal
      isOpen={isOpenModal}
      onRequestClose={closeModal}
      overlayClassName={styles.modalOverlay}
      className={styles.modalContent}
    >
      <div className={styles.header}>
        <span></span>
        <button onClick={closeModal}>
          <X size={24} />
        </button>
      </div>

      <div className={styles.content}>
        <WarningCircle size={64} color="#ee7e0c" />
      </div>
      <div className={styles.title}>
        <span>Você confirma a exclusão?</span>
      </div>
      <div className={styles.actions}>
        <button className={styles.yes} onClick={() => deleteTask(taskId)}>
          Sim
        </button>
        <button className={styles.no} onClick={closeModal}>
          Não
        </button>
      </div>
    </Modal>
  );
}
