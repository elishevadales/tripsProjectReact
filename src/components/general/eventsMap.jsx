import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker,Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { API_URL, doApiGet } from '../../services/apiService';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux'



const EventsMap = () => {

    const [eventsAr, setEventsAr] = useState([]);
    const nav = useNavigate()
    const ZOOM_LEVEL = 6;
    const userInfo = useSelector((myStore) =>
        myStore.userInfoSlice
    )

    useEffect(() => {
        doApiGetAllEvents();
    }, [])

    const doApiGetAllEvents = async () => {
        let url = API_URL + "/events/eventListLight";

        try {
            let resp = await doApiGet(url);
            setEventsAr(resp.data)
        }

        catch (err) {
            console.log(err);
        }
    }

    const onClickPopup = (_id) => {
        nav(`/${userInfo.user.role}/events/eventCard`)
            
        localStorage.setItem("eventId", _id);
    }

    const markerIcon = new L.Icon({
        iconUrl: '/images/marker5.png',
        iconSize: [32, 96],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    });

    return (
        <div className='pt-4' style={{ backdropFilter: "blur(20px)", minHeight: "100vh" }}>
            <div className="container">
                <MapContainer
                    center={[32.43634, 35.122432]}
                    zoom={ZOOM_LEVEL}
                    style={{ height: '500px', width: '100%' }}

                >
                    <TileLayer
                        url={'https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=1gChS6Aib0ohtpBmJnOY'}
                        attribution={'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'}
                    />
                    {
                        eventsAr.map((event, i) => {
                            console.log("event:",event)
                            return (
                                event.coordinates && event.coordinates.lat && event.coordinates.lon &&
                                <Marker key={i} position={[event.coordinates.lat, event.coordinates.lon]} icon={markerIcon} >
                                    <Popup>

                                        {
                                            <div>
                                                <p onClick={() => {onClickPopup(event._id)}} className='h5' style={{ cursor: "pointer" }}>{event.event_name}</p>
                                                <p className='h6'>
                                                    {event.category} <br />
                                                    {event.date_and_time} <br />
                                                    {event.active} <br />
                                                    </p>
                                                
                                                <div onClick={() => {onClickPopup(event._id)}} style={{ cursor: "pointer", backgroundImage: event.images[0]? `url(${event.images[0]})` :"url(https://t3.ftcdn.net/jpg/05/63/76/92/360_F_563769202_XvjMvyMO593Wt70Um2OQPJ5CZrTXbT4t.jpg)", height: 100, width: 100, backgroundSize: "cover", backgroundPosition: "center" }} />
                                            </div>
                                        }
                                    </Popup>
                                </Marker>

                            )
                        })
                    }
                </MapContainer>
            </div>

        </div>
    )
}

export default EventsMap