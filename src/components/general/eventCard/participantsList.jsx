import { Modal } from 'react-bootstrap';
import React from 'react';
import Profile from '../profile/profile'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';

import {
    IonRow,
    IonCol,
} from '@ionic/react';

const ParticipantsList = ({ participants, isOpen, onClose }) => {
    const nav = useNavigate()
    const profile = (_id) => {
        localStorage.setItem("userProfileId", _id);

        // if (userInfo.user.role == "admin") {
        //     nav("/admin/profile")
        // }
        // else {
        nav("/user/profile")
        // }

    }

    return (
        <Modal show={isOpen} onHide={onClose} backdrop="static" keyboard={false} centered>
            <Modal.Body className='text-center '>
                {participants.length > 0 ? <> <h3>משתתפים</h3>
                <div className='chat' style={{ maxHeight: '400px' }}></div>
                    {participants.map((participant) => (
                        <IonRow key={participant?._id} className='border-top border-bottom'>
                            <IonCol size="3" onClick={() => profile(participant?._id)}>
                                <img
                                    src={participant?.profile_image ? participant?.profile_image : "https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp"}
                                    alt={participant?.nick_name}
                                    style={{ width: '70px', height: '70px', borderRadius: '50%', boxShadow: '0 4px 8px rgba(137,137,137,0.75)' }}

                                />
                            </IonCol>
                            <IonCol size="2" className='pt-3'><h4>{participant?.nick_name}</h4>{participant?.age}</IonCol>
                            <IonCol size="1" className='pt-3'> {participant?.gender === "female" ? <i className="fa fa-venus fa-2x"></i> : <i className="fa fa-mars fa-2x"></i>}</IonCol>
                            <IonCol size="1" className='pt-3'>{participant?.age}</IonCol>

                        </IonRow>
                    ))} </> : <h4>אין כרגע משתתפים</h4>}
                <button className="btn  col-3" onClick={onClose}>
                    סגור
                </button>
            </Modal.Body>
        </Modal>
    );
};

export default ParticipantsList;
