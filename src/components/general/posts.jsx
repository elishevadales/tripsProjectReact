import React, { useEffect, useState } from 'react'
import { API_URL, doApiGet, doApiMethod } from '../../services/apiService';
import { useSelector } from 'react-redux'
import CalendarView from './calendarView'

import PreviewPostItem from './previewPostItem';
import { Link, useNavigate } from 'react-router-dom';
import EventsMap from './eventsMap';


const Posts = () => {

  const [eventsAr, setEventsAr] = useState([]);
  const [viewType, setViewType] = useState('list');
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState(null);
  const [parking, setParking] = useState(false); // Default to false
  const [accessibility, setAccessibility] = useState(false);
  const [openEvent, setOpenEvent] = useState(false);

  const nav = useNavigate()

  const userInfo = useSelector((myStore) =>
    myStore.userInfoSlice
  )

  useEffect(() => {

    doApiGetEvents();

  }, [])

  const handleSearch = async () => {
    const queryParams = new URLSearchParams({
      name,
      date,
      category,
      price,
      parking: parking.toString(),
      open_event: openEvent
    });

    const url = `${API_URL}/events/searchMultiple?${queryParams.toString()}`;

    try {
      const resp = await doApiGet(url);
      setEventsAr(resp.data);
      console.log(resp.data);
    } catch (err) {
      console.log(err);
    }
  };


  const toggleView = (type) => {
    setViewType(type);
  };



  const doApiGetEvents = async () => {
    let url = API_URL + "/events/eventList";

    try {
      let resp = await doApiGet(url);
      setEventsAr(resp.data)
    }

    catch (err) {
      console.log(err);
    }
  }



  return (
    <div style={{ backdropFilter: "blur(20px)" }}>
      <div style={{ position: "relative", backdropFilter: "blur(20px)", minHeight: "100vh" }}>

        <div className="container pt-4">
          <div className="search d-flex border shadow bg-white">
            <div className="filters col-9 d-flex justify-content-around" style={{ color: "grey" }}>
              <div className=' col p-2 my-2' style={{ borderLeft: "solid rgb(206, 220, 223) 1px" }}>
                <p className='lead my-0 px-2' style={{ fontSize: "16px" }}> שם</p>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className=' col p-2 my-2' style={{ borderLeft: "solid rgb(206, 220, 223) 1px" }}>
                <p className='lead my-0 px-2' style={{ fontSize: "16px" }}> תאריך יציאה</p>
                <input
                  type="date"
                  className="form-control"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />

              </div>

              <div className=' col p-2 my-2' style={{ borderLeft: "solid rgb(206, 220, 223) 1px" }}>
                <p className='lead my-0' style={{ fontSize: "16px" }}> קטגוריה</p>
                <input
                  type="text"
                  className="form-control"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
              <div className=' col p-2 my-2' style={{ borderLeft: "solid rgb(206, 220, 223) 1px" }}>
                <input
                  type="checkbox"
                  checked={parking}
                  onChange={() => setParking(!parking)}
                />
                <label className='lead my-0 me-2' style={{ fontSize: "16px" }}> חנייה</label>
                <br />
                <input
                  type="checkbox"
                  checked={openEvent}
                  onChange={() => setOpenEvent(!openEvent)}
                />
                <label className='lead my-0 me-2' style={{ fontSize: "16px" }}> אירוע פתוח</label>

              </div>
            </div>
            <div onClick={handleSearch} className="text-white display-6 col-1 d-flex flex-column  justify-content-center text-center" style={{ background: "#BBE4E2", cursor: "pointer" }}>
              
              <i onClick={() => toggleView('list')} style={{ color: "#077F7A", fontSize: "24px" }} className="fa fa-list-alt fa py-1" aria-hidden="true"></i>
              <i onClick={() => toggleView('calendar')} style={{ color: "#077F7A", fontSize: "24px" }} className="fa fa-calendar fa py-1" aria-hidden="true"></i>
              <i onClick={() => toggleView('map')} style={{ color: "#077F7A", fontSize: "32px" }} className="fa fa-map-marker fa py-1" aria-hidden="true"></i>

            </div>

            <div onClick={handleSearch} className="button text-white display-6 p-3 col-2 d-flex alignItems-center justify-content-center" style={{ background: "#077F7A", cursor: "pointer" }}>
              חיפוש
            </div>

          </div>


          {viewType === 'list' &&
            <div className='row mt-3 mt-0 justify-content-around align-item-center'>
              {eventsAr.length < 1 && <p className='display-4 text-center text-white'>לא נמצאו אירועים</p>}
              {eventsAr.map((event, i) => (
                <PreviewPostItem event={event} key={i} imageInLeft={i % 2 === 0} />
              ))}
            </div>
          }

          {viewType === 'calendar' &&
            <CalendarView events={eventsAr} />
          }

          {viewType === 'map' &&
            <EventsMap events={eventsAr}/>
          }

        </div>



      </div>
      <i
        onClick={() => { nav(`/${userInfo.user.role}/newEvent`) }}
        className="fa fa-plus p-4 text-white h2 d-flex align-items-center justify-content-center"
        aria-hidden="true"
        style={{
          width: "80px",
          height: "80px",
          background: "#077F7A",
          borderRadius: "100%",
          border: "solid white 2 px",
          position: "sticky",
          right: "50px",
          bottom: "50px",
          cursor: "pointer"
        }} />
    </div>
  )
}

export default Posts