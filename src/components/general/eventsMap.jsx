import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
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
                    style={{ height: '500px', width: '100%', border: "8px solid white", borderRadius: "10px" }}

                >
                    <TileLayer
                        url={'https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=1gChS6Aib0ohtpBmJnOY'}
                        attribution={'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'}
                    />
                    {
                        eventsAr.map((event, i) => {
                            console.log("event:", event)
                            return (
                                event.coordinates && event.coordinates.lat && event.coordinates.lon &&
                                <Marker key={i} position={[event.coordinates.lat, event.coordinates.lon]} icon={markerIcon} >
                                    <Popup>

                                        {
                                            <>
                                                <div onClick={() => { onClickPopup(event._id) }} className='p-2 d-sm-flex align-items-center justify-content-around text-sm-end text-center' style={{ background: "rgb(207, 205, 205)", cursor: "pointer", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}>
                                                    <div className='ps-3' style={{ color: "grey" }}>
                                                        <p className='h5 m-0' style={{ color:"black" }}>{event.event_name} ({event.category == "trip" ? "טיול" : "אטרקציה"})</p>
                                                        <p className='h6'>
                                          
                                                            יציאה בתאריך:
                                                            <br></br>
                                                            {event.date_and_time && typeof event.date_and_time === 'string' ? event.date_and_time.split('T')[0] : 'N/A'}
                                                            <br />

                                                        </p>
                                                    </div>
                                                    <div style={{ borderRadius: "10px", backgroundImage: event.images[0] ? `url(${event.images[0]})` : "url(https://t3.ftcdn.net/jpg/05/63/76/92/360_F_563769202_XvjMvyMO593Wt70Um2OQPJ5CZrTXbT4t.jpg)", height: "120px", width: "120px", backgroundSize: "cover", backgroundPosition: "center" }} />
                                                </div>

                                                <div className={event.active?'bg-success text-white lead':'bg-danger text-white lead'}  style={{ height: "50px", borderBottomLeftRadius: "10px", borderBottomRightRadius: "10px",display:"flex", alignItems:"center",justifyContent:"center" }}>
                                                    {event.active? <p>אירוע פעיל</p>
                                                    : <p>אירוע לא פעיל</p>}
                                                </div>
                                            </>
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