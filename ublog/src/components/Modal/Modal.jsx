import styles from './Modal.module.css';

const Modal = ({ isOpen, onClose, onEditAnother, onGoHome }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalContent}>
        <p>Form edited successfully!</p>
        <p>Do you want to edit another form or go to the home page?</p>
        <div className={styles.btn_modal_container}>
          <button onClick={onEditAnother} className={styles.btn_modal}>Edit Another Form</button>
          <button onClick={onGoHome} className={styles.btn_modal}>Go to Home</button>
        </div>
      </div>
    </div>
  )
}

export default Modal;

