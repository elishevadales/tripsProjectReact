import React, { useState, useEffect } from 'react';
import { IonCol, IonGrid, IonRow } from '@ionic/react';
import ReviewCard from './reviewCard'
import ChatScreen from './chat/chatScreen'
import { API_URL, doApiGet, doApiMethod } from '../../../services/apiService'
import MyReview from './myReview';
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom';
import Notification from '../notification/notification';
import ParticipantsList from './participantsList'
import EventsMap from '../eventsMap';


const EventCard = ({ socket }) => {

    // Get the location object using the useLocation hook
    const location = useLocation();
    // Access the state object from the location
    const { state } = location;

    // Now, state should contain the data you passed during navigation
    const [event, setEvent] = useState()
    const [openEvent, setOpenEvent] = useState(false)
    const [praticipant, setPraticipant] = useState(false)
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [reviews, setReviews] = useState([]);
    const [hasReview, setHasReview] = useState(false);
    const [hasLike, setHasLike] = useState(false)
    const [hasJoinRequest, setHasJoinRequest] = useState(false)
    const [likes, setLikes] = useState(event?.like_list?.length)
    const [showNotification, setShowNotification] = useState(false)
    const [myEvent, setMyEvent] = useState(false)
    const [user_id, setUserId] = useState("")
    const [praticipants, setPraticipants] = useState(0)
    const [notificationMessage, setNotificationMessage] = useState(" ")
    const [showParticipantsModal, setShowParticipantsModal] = useState(false);

    const userInfo = useSelector((myStore) =>
        myStore.userInfoSlice
    )


    const handleNotificationClose = () => {
        setShowNotification(false);
    };



    const handleParticipantsClick = () => {
        setShowParticipantsModal(true);
    };

    const handleParticipantsModalClose = () => {
        setShowParticipantsModal(false);
    };

    const handleLike = async () => {
        try {
            if (hasLike) {
                const data = await doApiMethod(API_URL + `/events/removeLike/${event?._id}`, "patch")
                setLikes(likes - 1)
            }
            else {
                const data = await doApiMethod(API_URL + `/events/addLike/${event?._id}`, "patch")
                setLikes(likes + 1)
            }
            setHasLike(!hasLike)

        } catch (err) {
            console.log(err);
            alert("יש בעיה בשליפת הנתונים. נסה שוב מאוחר יותר")
        }
    }

    const sendJoinRequest = async () => {
        try {
            const data = await doApiMethod(API_URL + `/events/addJoinRequest/${event?._id}`, "patch")
            setHasJoinRequest(true)
            setShowNotification(true)
            setNotificationMessage("בקשת ההצטרפות נשלחה וממתינה לאישור")
            socket.emit("send-notification", event.user_id._id)
        } catch (err) {
            console.log(err);
            alert("יש בעיה בשליפת הנתונים. נסה שוב מאוחר יותר")
        }
    }

    const addPraticipent = async () => {
        try {
            const data = await doApiMethod(API_URL + `/events/addParticipant/${event?._id}/${user_id}`, "patch")
            setPraticipant(true)
            setShowNotification(true)
            setNotificationMessage("אישור ההצטרפות שלך נקלט, מחכים לראות אותך")
        } catch (err) {
            console.log(err);
            alert("יש בעיה בשליפת הנתונים. נסה שוב מאוחר יותר")
        }
    }

    const addReview = async () => {
        setHasReview(true)
        const reviewBody = {
            rate: 5,
            comment: " ",
            event_id: event?._id,
            user_id: user_id
        }
        try {
            let review = await doApiMethod(API_URL + `/reviews/addReview/${event?._id}`, "post", reviewBody)
            review = review.data
            const updatedReviews = [...reviews];
            updatedReviews.push(review)
            setReviews(updatedReviews);
        } catch (err) {
            console.log(err);
            alert("יש בעיה בשליפת הנתונים. נסה שוב מאוחר יותר")
        }
    }


    const removeReviews = async (index) => {
        try {
            const review = reviews[index]
            const data = await doApiMethod(API_URL + `/reviews/deleteReview/${review?._id}`, "delete")
            const updatedReviews = [...reviews];
            updatedReviews.splice(index, 1);
            setReviews(updatedReviews);
            setHasReview(false)
        } catch (err) {
            console.log(err);
            alert("יש בעיה בשליפת הנתונים. נסה שוב מאוחר יותר")
        }

    };

    const editReview = async (index, review) => {
        try {
            const body = {
                rate: review.rate,
                comment: review.comment,
                event_id: review.event_id,
                user_id: review.user_id
            }
            const updatedReviews = [...reviews];
            updatedReviews.splice(index, 1);
            updatedReviews.push(review)
            setReviews(updatedReviews);
            const data = await doApiMethod(API_URL + `/reviews/editReview/${review._id}`, "put", body)
        } catch (err) {
            console.log(err);
            alert("יש בעיה בשליפת הנתונים. נסה שוב מאוחר יותר")
        }
    }

    const doApiReview = async (eventId) => {
        try {
            let url = API_URL + `/reviews/checkReview/${eventId}`;
            url = API_URL + `/reviews/eventReviews/${eventId}`;
            let resp = await doApiGet(url);
            const reviews = resp.data;

            reviews.forEach((review) => {
                if (review.user_id._id === userInfo?.user?._id) setHasReview(true);
            });

            setReviews(resp.data);
        } catch (err) {
            console.log(err);
        }
    };


    const doApiGetEvent = async () => {
        try {

            const event_id = localStorage.getItem("eventId")
            let url = API_URL + `/events/getEventById/${event_id}`;
            let resp = await doApiGet(url)

            setEvent(resp.data)
            setPraticipants(resp.data?.participants.length)
            setLikes(resp.data?.like_list?.length)

            if (resp.data?.like_list?.includes(userInfo?.user?._id)) {
                setHasLike(true)
            }

            if (resp.data?.join_requests.some(request => request._id === userInfo?.user?._id)) {
                setHasJoinRequest(true)
            }


            if (resp.data?.participants?.some(participant => participant._id === userInfo?.user?._id)) {
                setPraticipant(true)
            }

            if (resp.data?.user_id?._id === userInfo?.user?._id) {
                setMyEvent(true)
            }

            console.log("event", resp.data)
            setOpenEvent(resp.data?.open_event)
            doApiReview(resp.data?._id)

        }

        catch (err) {
            console.log(err);
        }

    }

    useEffect(() => {
        setUserId(userInfo?.user?._id);
        doApiGetEvent()

        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => {
                if (prevIndex + 1 === event?.images?.length) {
                    return 0;
                } else {
                    return prevIndex + 1;
                }
            });
        }, 20000);

        return () => clearInterval(interval);
    }, [userInfo, event?._id]);


    return (<>
        {showNotification && (
            <Notification
                message={notificationMessage}
                onClose={handleNotificationClose}
            />
        )}
        <div style={{ position: "relative", backdropFilter: "blur(20px)" }}>
            <div className='container-fluid '>
                <div className='container pb-4'>
                    <div className='row  pt-5'>



                        {/* event information */}
                        <div className='col-12 col-md-8  p-5 border' style={{ background: 'rgba(255, 255, 255, 0.505)' }}  >

                            <div>
                                <div className='col-12 col-md-5 '>
                                    <p style={{
                                        color: ' rgba(0, 0, 0, 0.651)',
                                        fontSize: '30px',
                                        fontWeight: 'bold',
                                    }}>{event?.event_name}</p>
                                </div>

                                <div className='col-12 col-md-7'>
                                    <p style={{
                                        color: ' black',
                                        fontSize: '20px',
                                        fontWeight: 'bold',
                                    }}> {event?.place_info}</p>
                                </div>
                            </div>

                            <div className='row'>
                                <span>בתכנית: </span>
                                <p>{event?.trip_details}</p>

                            </div>

                            <div className='row'>
                                <div className='col-6 col-lg-4'>
                                    <IonCol >

                                        <IonRow>
                                            <IonCol size="3" className='d-flex'>
                                                <i className="fa fa-map-marker fa-2x"></i>
                                            </IonCol>
                                            <IonCol size="9">
                                                {event?.address?.state}
                                            </IonCol>
                                        </IonRow>

                                        {!event?.price?.free ? (
                                            <>
                                                <IonRow>
                                                    {event?.price?.adult &&
                                                        <>
                                                            <IonCol size="3"> <i className="fa fa-users fa-2x"></i></IonCol>
                                                            <IonCol size="9"> {event?.price?.adult} ש"ח</IonCol>
                                                        </>
                                                    }
                                                </IonRow>
                                                <IonRow>
                                                    {event?.price?.studentOrSoldier &&
                                                        <>
                                                            <IonCol size="3"> <i className="fa fa-graduation-cap fa-2x"></i></IonCol>
                                                            <IonCol size="9">  {event?.price?.studentOrSoldier} ש"ח</IonCol>
                                                        </>
                                                    }
                                                </IonRow>
                                                <IonRow>
                                                    {event?.price?.child && <>  <IonCol size="3"> <i className="fa fa-child fa-2x"></i></IonCol>
                                                        <IonCol size="9">  {event?.price?.child} ש"ח</IonCol> </>}
                                                </IonRow>
                                            </>
                                        ) : (
                                            <IonRow className='pt-4'>
                                                <IonCol size="3"> <i className="fa fa-pagelines fa-2x"></i></IonCol>
                                                <IonCol size="9"> הכניסה חופשית</IonCol>
                                            </IonRow>
                                        )}
                                    </IonCol>
                                </div>
                                <div className='col-6 col-lg-4'>
                                    <IonCol>
                                        <IonCol>
                                            <IonRow>
                                                <IonCol size="3"> <i className="fa  fa-map-signs fa-2x"></i></IonCol>
                                                <IonCol size="9"> {event?.required_equipment ? event?.required_equipment : "לא נדרש להביא ציוד"} </IonCol>
                                            </IonRow>
                                            <IonRow>
                                                <IonCol size="3"> <i className="fa fa-car fa-2x"></i></IonCol>
                                                <IonCol size="9"> {event?.parking === "free" ? "חניה חינם" : event?.parking === "none" ? "אין חניה במקום" : "חניה חינם"} </IonCol>
                                            </IonRow>
                                            <IonRow>
                                                <IonCol size="3"> <i className="fa fa-wheelchair-alt fa-2x"></i></IonCol>
                                                <IonCol size="9">  {event?.accessibility ? "המקום מונגש" : "המקום לא מונגש"}</IonCol>
                                            </IonRow>
                                            <IonRow>
                                                <IonCol size="3"> <i className="fa fa-clock-o fa-2x"></i></IonCol>
                                                <IonCol size="9">  {event?.during}</IonCol>
                                            </IonRow>
                                        </IonCol>
                                    </IonCol>
                                </div>
                                <div className='col-12 col-lg-4' style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: '24px', fontWeight: 'bold' }} className='pt-4'>
                                        SAVE THE DATE
                                    </div>
                                    <div style={{ fontSize: '24px' }}>
                                        {new Date(event?.date_and_time).toLocaleDateString('en-GB')}
                                    </div>
                                    <div style={{ fontSize: '24px' }}>
                                        {new Date(event?.date_and_time).toLocaleTimeString('en-GB', {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </div>
                                </div>
                            </div>

                            {event?.active &&

                                <div className='row'>
                                    {myEvent ?
                                        <IonCol size="2">
                                            <button
                                                type="button"
                                                className="btn  btn-rounded btn-icon"
                                                style={{ transition: 'color 0.3s', color: 'black', background: "rgba(0, 0, 0, 0)", borderRadius: '50%' }}
                                                onMouseEnter={(e) => (e.target.style.color = 'yellow')}
                                                onMouseLeave={(e) => (e.target.style.color = 'black')}
                                            // onClick={() => editEvent()}
                                            >
                                                <i className="fa  fa-pencil fa-2x"></i>
                                            </button> </IonCol> :
                                        <>
                                            {!praticipant &&
                                                <>
                                                    {!openEvent && !hasJoinRequest && <IonCol size="2"> <span style={{ fontSize: "small" }}>בקשת הצטרפות</span>
                                                        <button
                                                            type="button"
                                                            className="btn  btn-rounded btn-icon"
                                                            style={{ transition: 'color 0.3s', color: 'black', background: "rgba(0, 0, 0, 0)", borderRadius: '50%' }}
                                                            onMouseEnter={(e) => (e.target.style.color = 'green')}
                                                            onMouseLeave={(e) => (e.target.style.color = 'black')}
                                                            onClick={() => sendJoinRequest()}
                                                        >
                                                            <i className="fa  fa-envelope fa-2x"></i>
                                                        </button>
                                                    </IonCol>
                                                    }

                                                    {!openEvent && hasJoinRequest && <IonCol size="2">
                                                        <i className="fa  fa-info fa-2x mx-2" style={{ transform: "scaleX(-1)" }}></i>
                                                        בקשת ההצטרפות שלך ממתינה לאישור
                                                    </IonCol>
                                                    }

                                                    {openEvent && <IonCol size="2"> <button
                                                        type="button"
                                                        className="btn  btn-rounded btn-icon"
                                                        style={{ transition: 'color 0.3s', color: 'black', background: "rgba(0, 0, 0, 0)", borderRadius: '50%' }}
                                                        onMouseEnter={(e) => (e.target.style.color = 'green')}
                                                        onMouseLeave={(e) => (e.target.style.color = 'black')}
                                                        onClick={() => addPraticipent()}
                                                    >
                                                        <i className="fa   fa-hand-peace-o fa-2x"> </i>
                                                        <span style={{ fontSize: "small" }}>אני רוצה לבוא</span>
                                                    </button>
                                                    </IonCol>
                                                    }
                                                </>
                                            }
                                            {praticipant && <IonCol size="2">
                                                <i className="fa  fa-smile-o fa-2x mx-2" ></i>
                                                {userInfo?.gender === "female" ? <span>אני באה</span> : <span>אני בא</span>}

                                            </IonCol>}
                                        </>
                                    }
                                </div>
                            }
                        </div>



                        {/* event images */}
                        {
                            event &&
                            <div className='col border me-md-3 p-4' style={{ backgroundImage: event.images.length > 0 ? `url(${event.images[currentImageIndex]})` : `url(${require('../../../images/bus.jpg')})`, backgroundSize: 'cover', backgroundPosition: 'center', transition: 'background-image 5s ease-in-out', minHeight: '300px' }}>
                                <button
                                    type="button"
                                    className="btn  btn-rounded btn-icon"
                                    style={{ transition: 'color 0.3s', color: 'red', background: "rgba(0, 0, 0, 0)", borderRadius: '50%' }}
                                    onClick={handleLike}
                                >
                                    <i className="fa fa-heart fa-2x" style={{ color: 'red' }}></i>
                                    {likes}
                                </button>
                                <br />
                                <button
                                    type="button"
                                    className="btn  btn-rounded btn-icon"
                                    style={{ transition: 'color 0.3s', color: 'blue', background: "rgba(0, 0, 0, 0)", borderRadius: '50%' }}
                                    onClick={handleParticipantsClick}
                                >
                                    <i className="fa fa-users fa-2x" style={{ color: 'blue' }}></i>
                                    {praticipants}
                                </button>
                            </div>
                        }

                        {
                            event?.participants &&
                            <ParticipantsList
                                participants={event?.participants}
                                isOpen={showParticipantsModal}
                                onClose={handleParticipantsModalClose}
                            />
                        }
                    </div>




                    {/* event map */}
                    {
                        event &&
                        <EventsMap events={[event]} />
                    }


                    <div className='row mt-4 '>



                        {/* event reviews */}
                        <div className=' col-12 col-md-4 p-0'>
                            <div className='px-2 chat border ms-md-3 mb-4 mb-md-0' style={{ maxHeight: '650px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', background: 'rgba(255, 255, 255, 0.505)' }}>
                                <p className='text-center p-3 h4 m-4' style={{ color: "#077F7A", borderBottom: "1px solid #077F7A" }}>דירוגים:</p>

                                {!hasReview &&
                                    <button
                                        type="button"
                                        className="btn btn-rounded btn-icon d-flex align-items-center"
                                        style={{ transition: 'color 0.3s', color: 'black', background: "rgba(0, 0, 0, 0)", borderRadius: '50%' }}
                                        onMouseEnter={(e) => (e.target.style.color = 'green')}
                                        onMouseLeave={(e) => (e.target.style.color = 'black')}
                                        onClick={() => addReview()}
                                    >
                                        <i className="fa fa-plus" style={{ fontSize: "24px" }}></i>
                                    </button>}

                                {reviews.length > 0 && reviews.map((review, index) => (
                                    review?.user_id?._id === user_id ?
                                        <MyReview
                                            key={index}
                                            index={index}
                                            review={review}
                                            removeReviews={removeReviews}
                                            editReview={editReview}
                                            setReviews={setReviews}
                                        />
                                        :
                                        <></>
                                ))}
                                {reviews.length > 0 && reviews.map((review, index) => (
                                    review?.user_id?._id === user_id ? <></> :
                                        <ReviewCard
                                            key={index}
                                            review={review}
                                        />
                                ))}
                            </div>
                        </div>



                        {/* event chat */}
                        <div className='col-12 col-md-8 border p-0'>

                            {
                                event?._id && user_id ?


                                    <ChatScreen eventId={event?._id} userId={user_id} socket={socket} />


                                    : ""
                            }
                        </div>


                    </div>
                </div>
            </div>
        </div >
    </>

    );
};

export default EventCard;
