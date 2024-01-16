import React, { useEffect, useState } from 'react'
import AspectRatio from '@mui/joy/AspectRatio';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import Favorite from '@mui/icons-material/Favorite';
import { API_URL, doApiGet, doApiMethod } from '../../services/apiService';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux'


const PreviewPostItem = (props) => {

    const userInfo = useSelector((myStore) =>
        myStore.userInfoSlice
    )
    const eventId = props.event._id;
    const imageInLeft = props.imageInLeft;

    const [event, setEvent] = useState(props.event);
    const [isLiked, setIsLiked] = useState(event.like_list.includes(userInfo.user._id))

    const nav = useNavigate()


    const onClickLikeIcon = async () => {
        await doApiAddLike();
    }



    const doApiAddLike = async () => {
        let url = API_URL + "/events/addOrRemoveLike/" + eventId

        try {
            let resp = await doApiMethod(url, "PATCH");
            console.log("Updated event data:", resp.data.event);
            console.log("User ID:", userInfo.user._id);
            console.log("Like List:", resp.data.event.like_list);
            setEvent(resp.data.event)
            setIsLiked(resp.data.event.like_list.includes(userInfo.user._id));

        }
        catch (err) {
            console.log(err);
        }
    }

    const onClickNickName = () => {

        localStorage.setItem("userProfileId", event.user_id._id);
        nav(`/${userInfo.user.role}/profile`)

    }

    const onClickCard = () => {

        nav(`/${userInfo.user.role}/events/eventCard`,
            {
                state: {
                    event: event
                }
            })
            
        localStorage.setItem("eventId", event._id);
    }

    return (
        <div className='col-md-6 p-0'>


            <div className=' border shadow d-flex m-3 p-0 row' >
                <div onClick={onClickCard} className="image col-12 col-sm-6 p-0" style={{ order: imageInLeft ? 1 : 2, position: "relative", cursor: 'pointer' }}>
                    <img
                        src={event.images.length > 0 ? event.images[0] : "https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
                        loading="lazy"
                        alt="trip image"
                        style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                    <i
                        style={{ position: "absolute", left: 0, bottom: 0, color: isLiked ? "red" : "black", borderRadius: "100%", fontSize: '24px', background: "white" }}
                        className={isLiked ? "fa fa-heart p-2 m-2" : "fa fa-heart-o p-2 m-2"}
                        aria-hidden="true"
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent the click event from propagating to the container
                            onClickLikeIcon();
                        }}>
                        {/* {event.like_list.length < 1 ? "" : event.like_list.length} */}
                    </i>
                </div>
                <div className="text col-12 col-sm-6 p-4" style={{ order: imageInLeft ? 2 : 1, background: "#BBE4E2" }}>
                    <Box className="mb-3" sx={{ color: "grey", display: 'flex', gap: 1.5, mt: 'auto', alignItems: 'center' }}>
                        <Avatar variant="soft" color="neutral" src={event.user_id.profile_image} />
                        <div>
                            <Typography level="body-xs">
                                {event.date_created && typeof event.date_created === 'string' ? event.date_created.split('T')[0] : 'N/A'}
                            </Typography>
                            <Typography
                                level="body-sm"
                                onClick={onClickNickName}
                                style={{
                                    textDecoration: 'underline',
                                    transition: 'blue 0.3s ease',  // Add a smooth color transition
                                    cursor: 'pointer'
                                }}
                                className="hover-underline"
                            >
                                {event?.user_id?.nick_name}
                            </Typography>
                        </div>
                    </Box>

                    <p className='h5' onClick={onClickCard} style={{cursor:"pointer"}}>{event.event_name}</p>
                    <p className='h6'>{event.category == "trip" ? "טיול" : 'אטרקציה'}</p>
                    <p className='lead'>{event.participants.length} משתתפים</p>
                    <p className='lead' style={{ fontSize: "14px" }}>תאריך יציאה: {event.date_and_time && typeof event.date_and_time === 'string' ? event.date_and_time.split('T')[0] : 'N/A'}</p>

                </div>
            </div>
        </div>

    )
}

export default PreviewPostItem