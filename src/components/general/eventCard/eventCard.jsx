import React, { useState, useEffect } from 'react';
import { IonCol, IonGrid, IonRow } from '@ionic/react';
import ReviewCard from './reviewCard'
import ChatScreen from './chat/chatScreen'
import { API_URL, doApiGet, doApiMethod } from '../../../services/apiService'
import MyReview from './myReview';
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom';
import Notification from '../notification/notification';

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
    const [displayReviews, setDisplayReviews] = useState(false)
    const [hasLike, setHasLike] = useState(false)
    const [hasJoinRequest, setHasJoinRequest] = useState(false)
    const [likes, setLikes] = useState(event?.like_list?.length)
    const [showNotification, setShowNotification] = useState(false)
    const [myEvent, setMyEvent] = useState(false)
    const [user_id, setUserId] = useState("")

    const [notificationMessage, setNotificationMessage] = useState(" ")

    const userInfo = useSelector((myStore) =>
        myStore.userInfoSlice
    )


    const handleNotificationClose = () => {
        setShowNotification(false);
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
            let url
            url = API_URL + `/reviews/checkReview/${eventId}`;
            url = API_URL + `/reviews/eventReviews/${eventId}`
            let resp = await doApiGet(url)
            console.log("review", resp.data)

            setReviews(resp.data)
        }

        catch (err) {
            console.log(err);
        }
    }

    const doApiGetEvent = async () => {
        try {

            const event_id = localStorage.getItem("eventId")
            let url = API_URL + `/events/getEventById/${event_id}`;
            let resp = await doApiGet(url)
            setEvent(resp.data)

            if (resp.data?.like_list?.includes(userInfo?.user?._id)) {
                setHasLike(true)
            }

            if (resp.data?.join_requests?.includes(userInfo?.user?._id)) {
                setHasJoinRequest(true)
            }


            if (resp.data?.participants?.includes(userInfo?.user?._id)) {
                setPraticipant(true)
            }

            if (resp.data?.user_id?._id === userInfo?.user?._id) {
                setMyEvent(true)
            }

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
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % event?.images?.length);
        }, 20000);
        return () => clearInterval(interval);

    }, [userInfo]);

    return (
        <>
            {showNotification && (
                <Notification
                    message={notificationMessage}
                    onClose={handleNotificationClose}
                />
            )}

            <div className='container-fluid'>
                <div className='container'>
                    <div className='row border m-5'>
                        <div className='col-8 border'>
                        <IonGrid>
                                <IonRow>
                                    <IonCol size="7">
                                        <IonRow >
                                            <IonCol >
                                                {!event?.price?.free ? (
                                                    <>
                                                        <IonRow className='pt-4'>
                                                            <IonCol size="3"> <i className="fa fa-users fa-2x"></i></IonCol>
                                                            <IonCol size="9"> {event?.price?.adult} ש"ח</IonCol>
                                                        </IonRow>
                                                        <IonRow>
                                                            <IonCol size="3"> <i className="fa fa-graduation-cap fa-2x"></i></IonCol>
                                                            <IonCol size="9">  {event?.price?.studentOrSoldier} ש"ח</IonCol>
                                                        </IonRow>
                                                        <IonRow>
                                                            <IonCol size="3"> <i className="fa fa-child fa-2x"></i></IonCol>
                                                            <IonCol size="9">  {event?.price?.child} ש"ח</IonCol>
                                                        </IonRow>
                                                    </>
                                                ) : (
                                                    <IonRow className='pt-4'>
                                                        <IonCol size="3"> <i className="fa fa-pagelines fa-2x"></i></IonCol>
                                                        <IonCol size="9"> הכניסה חופשית</IonCol>
                                                    </IonRow>
                                                )}
                                            </IonCol>

                                            <IonCol>
                                                <IonCol>
                                                    <IonRow>
                                                        <IonCol size="3"> <i className="fa  fa-map-signs fa-2x"></i></IonCol>
                                                        <IonCol size="9"> {event?.required_equipment} </IonCol>
                                                    </IonRow>
                                                    <IonRow>
                                                        <IonCol size="3"> <i className="fa fa-car fa-2x"></i></IonCol>
                                                        <IonCol size="9"> {event?.parking ? "יש חניה במקום" : "אין חניה במקום"} </IonCol>
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
                                        </IonRow>
                                        <IonRow>
                                            {event?.trip_details}
                                        </IonRow>
                                    </IonCol>
                                    <IonCol size="5">
                                        <IonRow>

                                        </IonRow>
                                        <IonCol style={{ textAlign: 'center' }}>
                                            <div style={{ fontSize: '20px', fontWeight: 'bold' }} className='pt-4'>
                                                SAVE THE DATE
                                            </div>
                                            <div style={{ fontSize: '50px', fontWeight: 'bold' }}>
                                                {new Date(event?.date_and_time).toLocaleDateString('en-GB')}
                                            </div>
                                            <div style={{ fontSize: '30px' }}>
                                                {new Date(event?.date_and_time).toLocaleTimeString('en-GB', {
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                })}
                                            </div>
                                        </IonCol>
                                    </IonCol>
                                </IonRow>
                                <IonRow>

                                    {myEvent ?
                                        <> <IonCol size="2">
                                            <button
                                                type="button"
                                                className="btn  btn-rounded btn-icon"
                                                style={{ transition: 'color 0.3s', color: 'white', background: "rgba(0, 0, 0, 0)", borderRadius: '50%' }}
                                                onMouseEnter={(e) => (e.target.style.color = 'yellow')}
                                                onMouseLeave={(e) => (e.target.style.color = 'white')}
                                                onClick={() => setDisplayReviews(!displayReviews)}
                                            >
                                                <i className="fa  fa-pencil fa-2x"></i>
                                            </button>
                                        </IonCol>
                                        </> :
                                        <>
                                            {!praticipant &&
                                                <>
                                                    {!openEvent && !hasJoinRequest && <IonCol size="2"> <span style={{ fontSize: "small" }}>בקשת הצטרפות</span><button
                                                        type="button"
                                                        className="btn  btn-rounded btn-icon"
                                                        style={{ transition: 'color 0.3s', color: 'white', background: "rgba(0, 0, 0, 0)", borderRadius: '50%' }}
                                                        onMouseEnter={(e) => (e.target.style.color = 'green')}
                                                        onMouseLeave={(e) => (e.target.style.color = 'white')}
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
                                                        style={{ transition: 'color 0.3s', color: 'white', background: "rgba(0, 0, 0, 0)", borderRadius: '50%' }}
                                                        onMouseEnter={(e) => (e.target.style.color = 'green')}
                                                        onMouseLeave={(e) => (e.target.style.color = 'white')}
                                                        onClick={() => addPraticipent()}
                                                    >
                                                        <i className="fa   fa-hand-peace-o fa-2x"> </i>
                                                        <span style={{ fontSize: "small" }}>אני רוצה לבוא</span>
                                                    </button>
                                                    </IonCol>
                                                    }</>
                                            }
                                            {praticipant && <IonCol size="2">
                                                <i className="fa  fa-smile-o fa-2x mx-2" ></i>
                                                {userInfo?.gender === "female" ? <span>אני באה</span> : <span>אני בא</span>}

                                            </IonCol>}
                                        </>
                                    }

                                    <IonCol size='6'> </IonCol>
                                    <IonCol size="1"> <button
                                        type="button"
                                        className="btn  btn-rounded btn-icon"
                                        style={{ transition: 'color 0.3s', color: 'white', background: "rgba(0, 0, 0, 0)", borderRadius: '50%' }}
                                        onMouseEnter={(e) => (e.target.style.color = 'red')}
                                        onMouseLeave={(e) => (e.target.style.color = 'white')}
                                        onClick={handleLike}
                                    >
                                        <i className="fa fa-heart fa-2x"></i>
                                    </button>
                                    </IonCol>
                                    <IonCol size="1"> <button
                                        type="button"
                                        className="btn  btn-rounded btn-icon "
                                        style={{ transition: 'color 0.3s', color: 'white', background: "rgba(0, 0, 0, 0)", borderRadius: '50%' }}
                                        onMouseEnter={(e) => (e.target.style.color = 'blue')}
                                        onMouseLeave={(e) => (e.target.style.color = 'white')}
                                    >
                                        <i className="fa fa-comments fa-2x"></i>
                                    </button>
                                    </IonCol>

                                    <IonCol size="1"> <button
                                        type="button"
                                        className="btn  btn-rounded btn-icon"
                                        style={{ transition: 'color 0.3s', color: 'white', background: "rgba(0, 0, 0, 0)", borderRadius: '50%' }}
                                        onMouseEnter={(e) => (e.target.style.color = 'yellow')}
                                        onMouseLeave={(e) => (e.target.style.color = 'white')}
                                        onClick={() => setDisplayReviews(!displayReviews)}
                                    >
                                        <i className="fa  fa-star fa-2x"></i>
                                    </button>
                                    </IonCol>


                                    <IonCol size="1"> <button
                                        type="button"
                                        className="btn  btn-rounded btn-icon"
                                        style={{ transition: 'color 0.3s', color: 'white', background: "rgba(0, 0, 0, 0)", borderRadius: '50%' }}
                                        onMouseEnter={(e) => (e.target.style.color = 'green')}
                                        onMouseLeave={(e) => (e.target.style.color = 'white')}
                                    >
                                        <i className="fa  fa-users fa-2x"></i>
                                    </button>
                                    </IonCol>


                                </IonRow>
                            </IonGrid>
                        </div>
                        <div className='col border p-0 '>
                            <div className='row me-2'>
                                {event && <div style={{ backgroundImage: `url(${event.images.length > 0 ? event.images[0] : "https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"})`, backgroundSize: 'cover', backgroundPosition: 'center', transition: 'background-image 5s ease-in-out', height: "500px" }}></div>}
                            </div>


                        </div>
                    </div>
                </div>
            </div>


            {/* <div className='container card p-0 ' style={{ backgroundSize: 'cover', backgroundPosition: 'center', transition: 'background-image 5s ease-in-out' }}> */}
            <div style={{ position: "relative" }} className='container-fluid d-flex flex-column justify-content-center align-items-center'>
                <div className=' container d-flex justify-content-center align-items-center' style={{ position: "relative" }}>



                    <div className='content m-0' style={{ position: "absolute", top: 0 }}>
                        <p style={{
                            color: ' rgba(0, 0, 0, 0.651)',
                            fontSize: '100px',
                            fontWeight: 'bold',
                        }}>{event?.event_name}</p>
                        <p style={{
                            color: ' black',
                            fontSize: '20px',
                            fontWeight: 'bold',
                        }}>{event?.place_info}</p>
                    </div>

                    <div className='row mt-5' style={{ width: "70%" }}>
                        <div className='custom-background px-5 py-3 text-white' style={{ position: "relative", marginTop: "68px" }}>

                            {/* <div className='ribbon'>
                                <div>
                                    <i className="fa fa-heart fa-3x"></i>
                                </div>
                                <div><strong>{likes}</strong>
                                </div>
                            </div> */}

                            <IonGrid>
                                <IonRow>
                                    <IonCol size="7">
                                        <IonRow >
                                            <IonCol >
                                                {!event?.price?.free ? (
                                                    <>
                                                        <IonRow className='pt-4'>
                                                            <IonCol size="3"> <i className="fa fa-users fa-2x"></i></IonCol>
                                                            <IonCol size="9"> {event?.price?.adult} ש"ח</IonCol>
                                                        </IonRow>
                                                        <IonRow>
                                                            <IonCol size="3"> <i className="fa fa-graduation-cap fa-2x"></i></IonCol>
                                                            <IonCol size="9">  {event?.price?.studentOrSoldier} ש"ח</IonCol>
                                                        </IonRow>
                                                        <IonRow>
                                                            <IonCol size="3"> <i className="fa fa-child fa-2x"></i></IonCol>
                                                            <IonCol size="9">  {event?.price?.child} ש"ח</IonCol>
                                                        </IonRow>
                                                    </>
                                                ) : (
                                                    <IonRow className='pt-4'>
                                                        <IonCol size="3"> <i className="fa fa-pagelines fa-2x"></i></IonCol>
                                                        <IonCol size="9"> הכניסה חופשית</IonCol>
                                                    </IonRow>
                                                )}
                                            </IonCol>

                                            <IonCol>
                                                <IonCol>
                                                    <IonRow>
                                                        <IonCol size="3"> <i className="fa  fa-map-signs fa-2x"></i></IonCol>
                                                        <IonCol size="9"> {event?.required_equipment} </IonCol>
                                                    </IonRow>
                                                    <IonRow>
                                                        <IonCol size="3"> <i className="fa fa-car fa-2x"></i></IonCol>
                                                        <IonCol size="9"> {event?.parking ? "יש חניה במקום" : "אין חניה במקום"} </IonCol>
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
                                        </IonRow>
                                        <IonRow>
                                            {event?.trip_details}
                                        </IonRow>
                                    </IonCol>
                                    <IonCol size="5">
                                        <IonRow>

                                        </IonRow>
                                        <IonCol style={{ textAlign: 'center' }}>
                                            <div style={{ fontSize: '20px', fontWeight: 'bold' }} className='pt-4'>
                                                SAVE THE DATE
                                            </div>
                                            <div style={{ fontSize: '50px', fontWeight: 'bold' }}>
                                                {new Date(event?.date_and_time).toLocaleDateString('en-GB')}
                                            </div>
                                            <div style={{ fontSize: '30px' }}>
                                                {new Date(event?.date_and_time).toLocaleTimeString('en-GB', {
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                })}
                                            </div>
                                        </IonCol>
                                    </IonCol>
                                </IonRow>
                                <IonRow>

                                    {myEvent ?
                                        <> <IonCol size="2">
                                            <button
                                                type="button"
                                                className="btn  btn-rounded btn-icon"
                                                style={{ transition: 'color 0.3s', color: 'white', background: "rgba(0, 0, 0, 0)", borderRadius: '50%' }}
                                                onMouseEnter={(e) => (e.target.style.color = 'yellow')}
                                                onMouseLeave={(e) => (e.target.style.color = 'white')}
                                                onClick={() => setDisplayReviews(!displayReviews)}
                                            >
                                                <i className="fa  fa-pencil fa-2x"></i>
                                            </button>
                                        </IonCol>
                                        </> :
                                        <>
                                            {!praticipant &&
                                                <>
                                                    {!openEvent && !hasJoinRequest && <IonCol size="2"> <span style={{ fontSize: "small" }}>בקשת הצטרפות</span><button
                                                        type="button"
                                                        className="btn  btn-rounded btn-icon"
                                                        style={{ transition: 'color 0.3s', color: 'white', background: "rgba(0, 0, 0, 0)", borderRadius: '50%' }}
                                                        onMouseEnter={(e) => (e.target.style.color = 'green')}
                                                        onMouseLeave={(e) => (e.target.style.color = 'white')}
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
                                                        style={{ transition: 'color 0.3s', color: 'white', background: "rgba(0, 0, 0, 0)", borderRadius: '50%' }}
                                                        onMouseEnter={(e) => (e.target.style.color = 'green')}
                                                        onMouseLeave={(e) => (e.target.style.color = 'white')}
                                                        onClick={() => addPraticipent()}
                                                    >
                                                        <i className="fa   fa-hand-peace-o fa-2x"> </i>
                                                        <span style={{ fontSize: "small" }}>אני רוצה לבוא</span>
                                                    </button>
                                                    </IonCol>
                                                    }</>
                                            }
                                            {praticipant && <IonCol size="2">
                                                <i className="fa  fa-smile-o fa-2x mx-2" ></i>
                                                {userInfo?.gender === "female" ? <span>אני באה</span> : <span>אני בא</span>}

                                            </IonCol>}
                                        </>
                                    }

                                    <IonCol size='6'> </IonCol>
                                    <IonCol size="1"> <button
                                        type="button"
                                        className="btn  btn-rounded btn-icon"
                                        style={{ transition: 'color 0.3s', color: 'white', background: "rgba(0, 0, 0, 0)", borderRadius: '50%' }}
                                        onMouseEnter={(e) => (e.target.style.color = 'red')}
                                        onMouseLeave={(e) => (e.target.style.color = 'white')}
                                        onClick={handleLike}
                                    >
                                        <i className="fa fa-heart fa-2x"></i>
                                    </button>
                                    </IonCol>
                                    <IonCol size="1"> <button
                                        type="button"
                                        className="btn  btn-rounded btn-icon "
                                        style={{ transition: 'color 0.3s', color: 'white', background: "rgba(0, 0, 0, 0)", borderRadius: '50%' }}
                                        onMouseEnter={(e) => (e.target.style.color = 'blue')}
                                        onMouseLeave={(e) => (e.target.style.color = 'white')}
                                    >
                                        <i className="fa fa-comments fa-2x"></i>
                                    </button>
                                    </IonCol>

                                    <IonCol size="1"> <button
                                        type="button"
                                        className="btn  btn-rounded btn-icon"
                                        style={{ transition: 'color 0.3s', color: 'white', background: "rgba(0, 0, 0, 0)", borderRadius: '50%' }}
                                        onMouseEnter={(e) => (e.target.style.color = 'yellow')}
                                        onMouseLeave={(e) => (e.target.style.color = 'white')}
                                        onClick={() => setDisplayReviews(!displayReviews)}
                                    >
                                        <i className="fa  fa-star fa-2x"></i>
                                    </button>
                                    </IonCol>


                                    <IonCol size="1"> <button
                                        type="button"
                                        className="btn  btn-rounded btn-icon"
                                        style={{ transition: 'color 0.3s', color: 'white', background: "rgba(0, 0, 0, 0)", borderRadius: '50%' }}
                                        onMouseEnter={(e) => (e.target.style.color = 'green')}
                                        onMouseLeave={(e) => (e.target.style.color = 'white')}
                                    >
                                        <i className="fa  fa-users fa-2x"></i>
                                    </button>
                                    </IonCol>


                                </IonRow>
                            </IonGrid>
                        </div>


                        {/* {event&& <div className='card p-0 ' style={{ backgroundImage: `url(${event?.images[currentImageIndex]})`, backgroundSize: 'cover', backgroundPosition: 'center', transition: 'background-image 5s ease-in-out' }}> */}
                        {event && <div className='card p-0 ' style={{ backgroundImage: `url(${event.images.length > 0 ? event.images[0] : "https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"})`, backgroundSize: 'cover', backgroundPosition: 'center', transition: 'background-image 5s ease-in-out', height: "600px" }}>

                        </div>}


                    </div>
                </div>







                <div style={{ position: "absolute", right: "14px", top: "100px" }}>
                    {!hasReview && displayReviews &&
                        <div className='bg-white border m-2 p-2 d-flex justify-content-center align-items-center my-2 p-2 mx-0' style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', height: '100px' }}>
                            <button
                                type="button"
                                className="btn btn-icon"
                                style={{ transition: 'color 0.3s', color: 'black', background: 'rgba(0, 0, 0, 0)', borderRadius: '50%' }}
                                onMouseEnter={(e) => (e.target.style.color = 'green')}
                                onMouseLeave={(e) => (e.target.style.color = 'black')}
                                onClick={addReview}
                            >
                                <i className="fa fa-plus fa-3x" aria-hidden="true"></i>
                            </button>
                        </div>}
                    {!displayReviews &&
                        <div className=' m-2 p-2 d-flex justify-content-center align-items-center my-2 p-2 mx-0' style={{ height: '100px' }}>
                        </div>}
                    {displayReviews && reviews.map((review, index) => (
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
                    {displayReviews && reviews.map((review, index) => (
                        review?.user_id?._id === user_id ? <></> :
                            <ReviewCard
                                key={index}
                                review={review}

                            />
                    ))}
                </div>










                <div className='container p-0 mt-3 d-flex justify-content-center'>

                    <div>
                        {
                            event?._id && user_id ?
                                <ChatScreen eventId={event?._id} userId={user_id} socket={socket}
                                />
                                : ""
                        }
                    </div>
                </div>
            </div>


        </>
    );
};

export default EventCard;
