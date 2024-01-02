import React, { useState, useEffect } from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon, IonImg, IonHeader, IonToolbar, IonContent } from '@ionic/react';
import { calendarOutline } from 'ionicons/icons';
import { IonCol, IonGrid, IonRow } from '@ionic/react';
import ReviewCard from './reviewCard'
import ChatScreen from './chat/chatScreen'
import { API_URL, TOKEN_NAME, doApiGet, doApiMethod } from '../../../services/apiService'
import MyReview from './myReview';
import { useSelector } from 'react-redux'

//const EventCard = ({ event}) => {
   
const EventCard = () => {

    const event = {
        required_equipment: " kkk",
        event_name: "עין גדי", category: "attraction", parking: "free", district: "north", accessibility: false, place_info: "Address:Talpiot, Jerusalem,Telephone:02-6782000Web site:arbelbowling.co.il/⇒Opening hours:Monday:10:00-02:00Tuesday:10:00-02:00Wednesday:10:00-02:00Thursday:10:00-02:00Friday:10:00-02:00Saturday:10:00-02:00Sunday:10:00-02:00", date_and_time: "2024-01-01T12:00:00.000Z", during: "3 hours",
        open_event: true,
        active: true, price: {
            adult: 30,
            studentOrSoldier: 30,
            child: 30,
            free: false,
            _id: "6592396296f398752293d9b3"
        },
        trip_details: " דוד ניתן לבקר כמעט בכל המסלולים חוץ ממפל דוד, אותו ניתן לראות אך לא להתקרב אליו מסיבות בטיחותיות. כניסה למעיין עין גדי דרך תל גורן, המקדש הכלכוליתי ושביל צפית – גב חלון. בנחל ערוגות ניתן לבקר במסלול הקצר ממבואת נחל ערוגות עד לבריכו", images: [
            "https://www.masa.co.il/MASA/_fck_uploads/1-david.jpg",
            "https://img.mako.co.il/2020/09/13/100BEST_thingsInISRAEL_22_i.jpg"
        ], like_list: ["hhhjhygy"], join_requests: [], participants: [], _id: "6592396296f398752293d9b2", date_created: "2024-01-01T04:02:42.847Z", user_id: "659140813b4581ace66c003f", __v: 0
    }
//     const userInfo = useSelector((myStore) =>
//     myStore.userInfoSlice
// )
    // const profile_image = "https://www.masa.co.il/MASA/_fck_uploads/1-david.jpg"
    const user_id = "659140813b4581ace66c003f"
    // const user_id =  userInfo.user._id
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [reviews, setReviews] = useState([{ _id: "659140813b4581ace66c003f", rate: 4, nick_name: "tamii", profile_image: "https://www.masa.co.il/MASA/_fck_uploads/1-david.jpg", comment: "rtfg rtfygh rytgyu tythunuyn yghu yuh " }, { _id: "111", nick_name: "tamii", profile_image: "https://www.masa.co.il/MASA/_fck_uploads/1-david.jpg", comment: "rtfg rtfygh rytgyu tythunuyn yghu yuh " },
    { _id: "111", nick_name: "tamii", profile_image: "https://www.masa.co.il/MASA/_fck_uploads/1-david.jpg", comment: "rtfg rtfygh rytgyu tythunuyn yghu yuhyuhyuhyuh yuh ", rate: 3 }]);
    const [hasReview, setHasReview] = useState(false);
    const [displayReviews, setDisplayReviews] = useState(false)
    const [hasLike, setHasLike] = useState(false)
    const [likes, setLikes] = useState(event.like_list.length)

    //const [onReviewEdit, setOnReviewEdit] = useState(false)

    const handleLike = async () => {

        try {
            if (hasLike) {
               const data = await doApiMethod(API_URL + `/events/removeLike/${event._id}`, "patch")
                setLikes(likes - 1)
            }
            else {
              const data = await doApiMethod(API_URL + `/events/addLike/${event._id}`, "patch")
                setLikes(likes +1)
            }
            setHasLike(!hasLike)

        } catch (err) {
            console.log(err);
            alert("יש בעיה בשליפת הנתונים. נסה שוב מאוחר יותר")
        }
    }
     

        const addReview = async () => {
            setHasReview(true)

            const reviewBody = {
                rate: 1,
                comment: "",
                event_id: event._id,
                user_id: user_id
            }
            //setOnReviewEdit(true)
            //  const review = await doApiMethod(API_URL + `/reviews/addReview/${event._id}`, "post", reviewBody)
            // const updatedReviews = [...reviews];
            // updatedReviews.push(review.review)
            // setReviews(updatedReviews);
        }


        const removeReviews = async (index) => {
            try {
                const review = reviews[index]
                const data = await doApiMethod(API_URL + `/reviews/deleteReview/${event._id}`, "delete")
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

        const doApiReview = async () => {
            let url = API_URL + `/reviews/checkReview/${event._id}`;
            try {
                let resp = await doApiGet(url);
                console.log(resp.hasReview)
                setHasReview(resp.hasReview)


                url = API_URL + `/reviews/eventReviews/${event._id}`
                resp = await doApiGet(url)
                console.log(resp.eventReviews)
                setReviews(resp.eventReviews)

            }

            catch (err) {
                console.log(err);
            }
        }

        useEffect(() => {
            //   doApiReview()
            if (event.like_list.includes(user_id)) {
                setHasLike(true)
            }
            const interval = setInterval(() => {
                setCurrentImageIndex((prevIndex) => (prevIndex + 1) % event.images.length);
            }, 20000);
            return () => clearInterval(interval);
        }, [event.images]);

        return (
            <>
                <div className='container card p-0 ' style={{ backgroundImage: `url(${event.images[currentImageIndex]})`, backgroundSize: 'cover', backgroundPosition: 'center', transition: 'background-image 5s ease-in-out' }}>

                    {/* <div className='image-container'>
                    <IonImg alt="Silhouette of mountains" src={event.images[currentImageIndex]} />
                </div> */}
                    <div className='content m-0 pt-5  py-3 px-5'>
                        <p style={{
                            color: ' rgba(0, 0, 0, 0.651)',
                            fontSize: '100px',
                            fontWeight: 'bold',
                        }}>{event.event_name}</p>
                        <p style={{
                            color: ' black',
                            fontSize: '20px',
                            fontWeight: 'bold',
                        }}>{event.place_info}</p>
                    </div>
                    <div className='custom-background p-5  text-white' style={{ position: "relative" }}>

                        <div className='ribbon'>  <div><i className="fa fa-heart fa-3x"></i></div>  <div><strong>{likes}</strong></div>  </div>
                        <IonGrid>
                            <IonRow>
                                <IonCol size="5">
                                    <IonRow>
                                        <IonCol >
                                            {!event.price.free ? (
                                                <>
                                                    <IonRow>
                                                        <IonCol size="3"> <i className="fa fa-users fa-2x"></i></IonCol>
                                                        <IonCol size="9"> {event.price.adult} ש"ח</IonCol>
                                                    </IonRow>
                                                    <IonRow>
                                                        <IonCol size="3"> <i className="fa fa-graduation-cap fa-2x"></i></IonCol>
                                                        <IonCol size="9">  {event.price.studentOrSoldier} ש"ח</IonCol>
                                                    </IonRow>
                                                    <IonRow>
                                                        <IonCol size="3"> <i className="fa fa-child fa-2x"></i></IonCol>
                                                        <IonCol size="9">  {event.price.child} ש"ח</IonCol>
                                                    </IonRow>
                                                </>
                                            ) : (
                                                <IonRow>
                                                    <IonCol size="3"> <i className="fa fa-pagelines fa-2x"></i></IonCol>
                                                    <IonCol size="9"> הכניסה חופשית</IonCol>
                                                </IonRow>
                                            )}
                                        </IonCol>

                                        <IonCol>
                                            <IonCol>
                                                <IonRow>
                                                    <IonCol size="3"> <i className="fa  fa-map-signs fa-2x"></i></IonCol>
                                                    <IonCol size="9"> {event.required_equipment} </IonCol>
                                                </IonRow>
                                                <IonRow>
                                                    <IonCol size="3"> <i className="fa fa-car fa-2x"></i></IonCol>
                                                    <IonCol size="9"> {event.parking ? "יש חניה במקום" : "אין חניה במקום"} </IonCol>
                                                </IonRow>
                                                <IonRow>
                                                    <IonCol size="3"> <i className="fa fa-wheelchair-alt fa-2x"></i></IonCol>
                                                    <IonCol size="9">  {event.accessibility ? "המקום מונגש" : "המקום לא מונגש"}</IonCol>
                                                </IonRow>
                                                <IonRow>
                                                    <IonCol size="3"> <i className="fa fa-clock-o fa-2x"></i></IonCol>
                                                    <IonCol size="9">  {event.during}</IonCol>
                                                </IonRow>
                                            </IonCol>
                                        </IonCol>
                                    </IonRow>
                                    <IonRow>
                                        {event.trip_details}
                                    </IonRow>
                                </IonCol>
                                <IonCol size="5">
                                    <IonRow>

                                    </IonRow>
                                    <IonCol style={{ textAlign: 'center' }}>
                                        <div  style={{ fontSize: '40px', fontWeight: 'bold' }}>
                                            SAVE THE DATE
                                        </div>
                                        <div style={{ fontSize: '70px', fontWeight: 'bold' }}>
                                            {new Date(event.date_and_time).toLocaleDateString('en-GB')}
                                        </div>
                                        <div style={{ fontSize: '50px' }}>
                                            {new Date(event.date_and_time).toLocaleTimeString('en-GB', {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                        </div>
                                    </IonCol>
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol size='8'> </IonCol>
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

                </div>
                <div className='container p-0 mt-3 d-flex'>
                    <div>
                        {!hasReview && displayReviews &&
                            <div className='border m-2 p-2 d-flex justify-content-center align-items-center my-2 p-2 mx-0' style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', width: '400px', height: '100px' }}>
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
                        {displayReviews && reviews.map((review, index) => (
                            review._id === user_id ? <MyReview
                                key={index}
                                index={index}
                                review={review}
                                removeReviews={removeReviews}
                                editReview={editReview}
                                setReviews={setReviews}
                            // onEditProp={onReviewEdit}
                            /> :
                                <></>
                        ))}
                        {displayReviews && reviews.map((review, index) => (
                            review._id === user_id ? <></> :
                                <ReviewCard
                                    key={index}
                                    review={review}
                                />
                        ))}
                    </div>
                    <div>
                        <ChatScreen/>
                    </div>
                </div>

            </>



            // <IonCard style={cardStyle}>
            //   <IonImg className="event-image" src={event.images[currentImageIndex]} style={imageStyle} />

            //   <IonHeader style={overlayStyle}>
            //     <IonToolbar>
            //       {/* Event Name */}
            //       <IonCardTitle>{event.event_name}</IonCardTitle>
            //       {/* Place Info */}
            //       <IonCardSubtitle className="ion-text-wrap">{event.place_info}</IonCardSubtitle>
            //     </IonToolbar>
            //   </IonHeader>


            // </IonCard>
        );
    };

    export default EventCard;
