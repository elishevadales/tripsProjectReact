
import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { API_URL, doApiGet, doApiMethod } from '../../../services/apiService';
import { updateNotification } from '../../reducer/userInfoSlice'
import { useDispatch, useSelector } from 'react-redux'

const ParticipantsConfirmation = ({ isOpen, onClose, title }) => {


    const dispatch = useDispatch();


    const [confirmedRequests, setConfirmedRequests] = useState([]);
    const [deniedRequests, setDeniedRequests] = useState([]);
    const [requestList, setJoinRequestList] = useState([]);

    const participantsConfirmation = async () => {
        let url = API_URL + `/users/getJoinRequest`;
        try {
            let resp = await doApiGet(url);
            setJoinRequestList(resp.data.data)
            console.log("requests", resp.data.data)
            if (resp.data.data.length === 0) {
                dispatch(updateNotification({ notification: false }));
            }
        }
        catch (err) {
            console.log(err);
            alert("there is a problem ,try again later")
        }
    }

    useEffect(() => {
        participantsConfirmation()
    }, [confirmedRequests, deniedRequests]);


    const deny = async (eventId, userId) => {
        let url = `${API_URL}/events/removeJoinRequest/${eventId}/${userId}`;
        try {
            // setDeniedRequests([...deniedRequests, { eventId, userId }]);
            await doApiMethod(url, 'PATCH');
            participantsConfirmation()

        } catch (err) {
            console.log(err.response);
            alert('There is a problem');
        }
    };

    const confirm = async (eventId, userId) => {
        let url = `${API_URL}/events/removeJoinRequest/${eventId}/${userId}`;
        try {
            // setConfirmedRequests([...confirmedRequests, { eventId, userId }]);

            await doApiMethod(url, 'PATCH');
            url = `${API_URL}/events/addParticipant/${eventId}/${userId}`;
            await doApiMethod(url, 'PATCH');
            participantsConfirmation()

        } catch (err) {
            console.log(err.response);
            alert('There is a problem');
        }
    };

    const nav = useNavigate();

    const profile = (_id) => {
        localStorage.setItem('userProfileId', _id);
        nav('/user/profile');
    };

    const eventCard = (_id) => {
        localStorage.setItem('eventId', _id);
        nav('/user/events/eventCard');
    };

    const isRequestConfirmed = (eventId, userId) => {
        return confirmedRequests.some((request) => request.eventId === eventId && request.userId === userId);
    };

    const isRequestDenied = (eventId, userId) => {
        return deniedRequests.some((request) => request.eventId === eventId && request.userId === userId);
    };

    return (
        <Modal show={isOpen} onHide={onClose} backdrop="static" keyboard={false} centered style={{ boxShadow: '0 4px 8px rgba(137,137,137,0.75)' }}>
            <Modal.Body className='text-center chat py-4'>
                <h3>{title}</h3>
                <div className='chat' style={{ maxHeight: '400px' }}>
                    {requestList.length > 0 ? (
                        <>
                            {requestList.map((event, index) => (
                                !isRequestConfirmed(event._id, event.userId) && !isRequestDenied(event._id, event.userId) && (
                                    <div key={index} className='border-top border-bottom row'>
                                        <div className='row'>
                                            <div className='col-4 p-0' onClick={() => eventCard(event._id)}>
                                                <img
                                                    src={event.images.length > 0 ? event.images[0] : '../../../images/bus.jpg'}
                                                    alt={event.event_name}
                                                    style={{ width: '70px', height: '70px', borderRadius: '5%', boxShadow: '0 4px 8px rgba(137,137,137,0.75)' }}
                                                />
                                            </div>
                                            <div className='col-4'>
                                                <h4>{event.event_name}</h4>
                                                {new Date(event.date_and_time).toLocaleDateString('en-GB')}
                                            </div>
                                            <div className='pt-2 col-3'>
                                                <i className='fa fa-users fa-2x' style={{ color: 'blue' }}></i> {event.participants.length}
                                            </div>
                                        </div>
                                        <div>
                                            {event.join_requests.map((user, userIndex) => (
                                                <div key={user._id} className='border-top border-bottom row p-3'>
                                                    <div className='col-3' onClick={() => profile(user._id)}>
                                                        <img
                                                            src={user.profile_image ? user.profile_image : 'https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp'}
                                                            alt={user.nick_name}
                                                            style={{ width: '50px', height: '50px', borderRadius: '50%', boxShadow: '0 4px 8px rgba(137,137,137,0.75)' }}
                                                        />
                                                    </div>
                                                    <div className='pt-3 col-1'>{user.nick_name}</div>
                                                    <div className='pt-3 col-1'>
                                                        {user.gender === 'female' ? (
                                                            <i className='fa fa-venus fa-2x'></i>
                                                        ) : (
                                                            <i className='fa fa-mars fa-2x'></i>
                                                        )}
                                                    </div>
                                                    <div className='pt-3 col-1'>{user.age}</div>
                                                    <div className='pt-3 col-1'>{user.age}</div>
                                                    <div className='pt-3 col-2'>
                                                        <button
                                                            type='button'
                                                            className='btn btn-rounded btn-icon'
                                                            style={{ color: 'black', border: 'none' }}
                                                            onClick={() => confirm(event._id, user._id)}
                                                        >
                                                            <i className='fa fa-check fa-2x'></i>
                                                        </button>
                                                    </div>
                                                    <div className='pt-3 col-2'>
                                                        <button
                                                            type='button'
                                                            className='btn btn-rounded btn-icon'
                                                            style={{ color: 'black', border: 'none' }}
                                                            onClick={() => deny(event._id, user._id)}
                                                        >
                                                            <i className='fa fa-times fa-2x'></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )
                            ))}
                        </>
                    ) : (
                        'אין עוד בקשות'
                    )}
                </div>
                <button className='btn col-3' onClick={onClose}>
                    סגירה
                </button>
            </Modal.Body>
        </Modal>
    );
};

export default ParticipantsConfirmation;