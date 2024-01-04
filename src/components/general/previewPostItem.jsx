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

const PreviewPostItem = (props) => {

    const eventId = props.event._id;
    const [event, setEvent] = useState(props.event);

    useEffect(() => {
        console.log(event)
    }, [])

    const onClickLikeIcon = async () => {
        await doApiAddLike();
        await doApiGetEvent()
    }

    const doApiAddLike = async () => {
        let url = API_URL + "/events/addLike/" + eventId

        try {
            let resp = await doApiMethod(url, "PATCH");
            console.log(resp.data)
        }
        catch (err) {
            console.log(err);
        }
    }

    const doApiGetEvent = async () => {
        let url = API_URL + "/events/getEventById/" + eventId;

        try {
            let resp = await doApiGet(url);
            console.log(resp.data)
            setEvent(resp.data)
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='m-3 col-md-5 ' >

            <Card variant="outlined" sx={{ width: '100%' }}>
                <Box sx={{ display: 'flex', gap: 1.5, mt: 'auto', alignItems: 'center' }}>
                    <Avatar variant="soft" color="neutral" src={event.user_id.profile_image} />


                    <div>
                        <Typography level="body-xs">{event.date_created && typeof event.date_created === 'string' ? event.date_created.split('T')[0] : 'N/A'}</Typography>
                        <Typography level="body-sm">{event.user_id.nick_name}</Typography>
                    </div>
                </Box>
                <CardOverflow>
                    <AspectRatio ratio="2">
                        {/* זו תמונה של "עדיין אין תמונה":
                        "https://inature.info/w/images/0/0e/No_image.jpg"*/}
                        <img 
                            src={event.images.length > 0 ? event.images[0] : "https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
                            loading="lazy"
                            alt=""
                        />
                    </AspectRatio>
                    <IconButton
                        onClick={onClickLikeIcon}
                        aria-label="Like minimal photography"
                        size="md"
                        variant="solid"
                        color="danger"
                        sx={{
                            position: 'absolute',
                            zIndex: 2,
                            borderRadius: '50%',
                            left: '1rem',
                            bottom: 0,
                            transform: 'translateY(50%)',
                        }}
                    >
                        <Favorite />
                        {event.like_list.length < 1 ? "" : event.like_list.length}
                    </IconButton>
                </CardOverflow>
                <CardContent>
                    <Typography level="title-md">
                        <Link href="#multiple-actions" overlay underline="none">
                            {event.event_name}
                        </Link>
                    </Typography>
                    <Typography level="body-sm">
                        <Link href="#multiple-actions">{event.district ? event.district : 'ישראל'}</Link>
                    </Typography>
                </CardContent>
                <CardOverflow variant="soft">
                    <Divider inset="context" />
                    <CardContent orientation="horizontal">
                        <Typography level="body-xs">{event.participants.length} משתתפים</Typography>
                        <Divider orientation="vertical" />
                        <Typography level="body-xs">נקבע לתאריך:<br></br> {event.date_and_time && typeof event.date_and_time === 'string' ? event.date_and_time.split('T')[0] : 'N/A'}</Typography>
                    </CardContent>
                </CardOverflow>

            </Card>
        </div>
    )
}

export default PreviewPostItem