import React, { useEffect, useState } from 'react'
import { API_URL, doApiGet, doApiMethod } from '../../services/apiService';

import PreviewPostItem from './previewPostItem';


const Posts = () => {

  const [eventsAr, setEventsAr] = useState([]);



  useEffect(() => {

    doApiGetEvents();

  }, [])

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
    <div style={{ backgroundImage: `url(${require('../../images/background.jpg')})`, backgroundSize: 'cover', backgroundPosition: "center", backgroundAttachment: "fixed" }}>
      <div className="container">
        <div className='row my-3 mt-0 justify-content-around align-item-center mb-0'>
          {
            eventsAr.map((event, i) => {
              return (
                <PreviewPostItem event={event} key={i}/>
                
              )
            })
          }
        </div>
      </div>
    </div>

  )
}

export default Posts