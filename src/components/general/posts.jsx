import React, { useEffect, useState } from 'react'
import { API_URL, doApiGet } from '../../services/apiService';

const Posts = () => {

const [eventsAr,setEventsAr] = useState([]);

useEffect(() => {

doApiGetEvents();

},[])

const doApiGetEvents = async() => {
    let url = API_URL + "/events/eventList";

    try {
      let resp = await doApiGet(url);
      console.log(resp.data)
      setEventsAr(resp.data)
    }

    catch (err) {
      console.log(err);
    }
}

  return (
    <div className='row'>
        {
            eventsAr.map((event,i) =>{
                return(
                    <div key={i} className='shadow m-3 col-md-5'>
                        <p>{event.category}</p>
                        <p>{event.parking}</p>
                        <p>{event.district}</p>
                        <p>{event.accessibility}</p>
                        <p>{event.place_info}</p>
                        <p>{event.date_and_time}</p>
                        <p>{event.during}</p>
                        <p>{event.date_created}</p>
                    </div>
                )
            })
        }
    </div>
  )
}

export default Posts