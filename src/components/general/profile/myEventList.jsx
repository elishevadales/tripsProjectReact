import { Modal } from 'react-bootstrap';
import React from 'react';
import { useNavigate } from 'react-router';


import {
    IonRow,
    IonCol,
} from '@ionic/react';

const MyEventList = ({ events, isOpen, onClose , title}) => {
    const nav = useNavigate()


    const eventCard = (_id) => {
        localStorage.setItem("eventId", _id);

        // if (userInfo.user.role == "admin") {
        //     nav("/admin/profile")
        // }
        // else {
        nav("/user/events/eventCard")
        // }

    }

    return (
        <Modal show={isOpen} onHide={onClose} backdrop="static" keyboard={false} centered style={{boxShadow: '0 4px 8px rgba(137,137,137,0.75)'}}>
            <Modal.Body className='text-center chat py-4' >
                <h3>{title}</h3>
                <div className='chat' style={{ maxHeight: '400px' }}>

{events.length > 0 ? <>
                    {events.map((event) => (
                        <IonRow key={event?._id} className='border-top border-bottom  pb-3'>
                            <IonCol size="3" className='pt-4' onClick={() => eventCard(event?._id)}>
                                <img
                                    src={event?.images.length > 0 ? event?.images[0] : '../../../images/bus.jpg'}
                                    alt={event?.event_name}
                                    style={{ width: '70px', height: '70px', borderRadius: '5%', boxShadow: '0 4px 8px rgba(137,137,137,0.75)' }}

                                />
                            </IonCol>
                            <IonCol size="4" className='pt-3'><h5>{event?.event_name}</h5> {new Date(event?.date_and_time).toLocaleDateString('en-GB')}</IonCol>
                            <IonCol size="1" className='pt-3'> </IonCol>
                            <IonCol size="1" className='pt-4'> <i className="fa fa-heart fa-2x" style={{ color: 'red' }}></i> {event?.like_list.length} </IonCol>
                            <IonCol size="1" className='pt-3'> </IonCol>
                            <IonCol size="1" className='pt-4'> <i className="fa fa-users fa-2x" style={{ color: 'blue' }}></i> {event?.participants.length}</IonCol>

                        </IonRow>
                    ))}</>
                : "עדיין אין"
                }
                </div>
                <button className="btn  col-3" onClick={onClose}>
                    סגור
                </button>
            </Modal.Body>
        </Modal>
    );
};

export default MyEventList;
