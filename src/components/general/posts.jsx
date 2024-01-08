import React, { useEffect, useState } from 'react'
import { API_URL, doApiGet, doApiMethod } from '../../services/apiService';
import { useSelector } from 'react-redux'


import PreviewPostItem from './previewPostItem';
import { Link } from 'react-router-dom';


const Posts = () => {

  const [eventsAr, setEventsAr] = useState([]);

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
    <div style={{ position: "relative" }}>
      <div className="container">
        <div className="search d-flex border shadow my-4">
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
          <div onClick={handleSearch} className="button text-white display-6 p-4 col-3 d-flex alignItems-center justify-content-center" style={{ background: "rgb(76, 116, 126)", cursor: "pointer" }}>
            חיפוש
          </div>
        </div>
        <div className='row my-3 mt-0 justify-content-around align-item-center mb-0'>
          {eventsAr.length < 1 && <p className='display-4 text-center'>לא נמצאו אירועים</p>}
          {
            eventsAr.map((event, i) => {

              return (
                <PreviewPostItem event={event} key={i} imageInLeft={i % 2 === 0} />

              )
            })
          }
        </div>
      </div>
      <Link to={userInfo.user.role == "admin" ? "http://localhost:3001/admin/newEvent" : "http://localhost:3001/user/newEvent"}>
        <i class="fa fa-plus p-5 text-white" aria-hidden="true" style={{ background: "rgb(76, 116, 126)", fontSize: "32px", borderRadius: "100%", border: "solid white 2 px", position: "sticky", right: "50px", bottom: "50px", cursor: "pointer" }}></i>
      </Link>
    </div>

  )
}

export default Posts