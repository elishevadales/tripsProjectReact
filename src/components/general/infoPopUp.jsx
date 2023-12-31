import React from 'react'
import { Modal } from 'react-bootstrap';

const InfoPopUp = ({ show, message, onCancel }) => {
    
    return (
        <Modal show={show} onHide={onCancel} backdrop="static" keyboard={false} centered>
            <Modal.Body className='text-center'>
                <p className='m-3'>{message}</p>
                <button className="btn btn-secondary col-3 " onClick={onCancel}>
                    אישור
                </button>
            </Modal.Body>
        </Modal>
    );
};

export default InfoPopUp