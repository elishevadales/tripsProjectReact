import React from 'react'
import { Modal } from 'react-bootstrap';

const ConfirmPopUp = ({ show, message, onConfirm, onCancel }) => {
  return (
    <Modal className='d-flex' show={show} onHide={onCancel} backdrop="static" keyboard={false} centered>
      <Modal.Dialog>
        <Modal.Header className="d-flex justify-content-between">
          <Modal.Title>אישור</Modal.Title>
          <button className="btn" onClick={onCancel}>
            X
          </button>
        </Modal.Header>




        <Modal.Body>
          <p>{message}</p>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={onCancel}>
            לא
          </button>
          <button className="btn btn-warning" onClick={onConfirm}>
            כן
          </button>
        </Modal.Footer>
      </Modal.Dialog>
    </Modal>
  );
};

export default ConfirmPopUp