import React, { useEffect, useState } from 'react'
import { API_URL, doApiGet, doApiMethod } from '../../services/apiService';
import { useSelector } from 'react-redux'
import CalendarView from './calendarView'

import PreviewPostItem from './previewPostItem';
import { Link } from 'react-router-dom';


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
    <div style={{ position: "relative", backdropFilter: "blur(20px)",minHeight:"100vh" }}>
      
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
          <div onClick={handleSearch} className="text-white display-6 col-1 d-flex flex-column alignItems-center justify-content-center" style={{ background: "#BBE4E2", cursor: "pointer" }}>
            <button
              className={`btn `}
              onClick={() => toggleView('list')}
            >
              <i className="fa fa-list-alt fa-2x" aria-hidden="true"></i>
            </button>
            <button
              className={`btn`}
              onClick={() => toggleView('calendar')}
            >
              <i className="fa fa-calendar fa-2x" aria-hidden="true"></i>
            </button>
          </div>

          <div onClick={handleSearch} className="button text-white display-6 p-3 col-2 d-flex alignItems-center justify-content-center" style={{ background: "#077F7A", cursor: "pointer" }}>
            חיפוש
          </div>

        </div>
        {viewType === 'list' ? (
          <div className='row my-3 mt-0 justify-content-around align-item-center mb-0'>
            {eventsAr.length < 1 && <p className='display-4 text-center'>לא נמצאו אירועים</p>}
            {eventsAr.map((event, i) => (
              <PreviewPostItem event={event} key={i} imageInLeft={i % 2 === 0} />
            ))}
          </div>
        ) : (
          <CalendarView events={eventsAr} />
        )}

      </div>
      <Link to={userInfo.user.role == "admin" ? "http://localhost:3001/admin/newEvent" : "http://localhost:3001/user/newEvent"}>
        <i className="fa fa-plus p-4 text-white fa-3x " aria-hidden="true" style={{ boxShadow: '0 4px 8px rgba(137,137,137,0.75)', background: "#077F7A", borderRadius: "100%", border: "solid white 2 px", position: "sticky", right: "50px", bottom: "50px", cursor: "pointer" }}></i>
      </Link>
    </div>

  )
}

export default Posts