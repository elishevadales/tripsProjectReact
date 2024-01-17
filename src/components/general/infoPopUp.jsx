import { Modal } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import notificationSound from '../../sounds/alert.mp3';

const InfoPopUp = ({ show, message, onCancel }) => {
    const [audio] = useState(new Audio(notificationSound));

    useEffect(() => {
        audio.play()

    }, []);

    return (
        <Modal show={show} onHide={onCancel} backdrop="static" keyboard={false} centered>
            <Modal.Body className='text-center'>
                <p className='m-3'>{message}</p>
                <button className="btn  btn-lg text-white mt-4" style={{ borderRadius: '3px', background: "#077F7A", boxShadow: "9px 9px 55px -12px rgba(0,0,0,0.75)"}} onClick={onCancel}>
                    אישור
                </button>
            </Modal.Body>
        </Modal>
    );
};

export default InfoPopUp

