
import React, { useState } from 'react'
import axios from "axios";
import { Modal } from 'react-bootstrap';
import Map from './map';



const EventLocation = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showLoading, setShowLoading] = useState(false)
    const [isLocationFound, setIsLocationFound] = useState(false)
    const [location, setLocation] = useState({lat:34.8789789, lon:31.3435})



    const onClickSearch = async () => {
        setShowLoading(true)
        console.log('input:', searchTerm);
        try {
            let url = ` https://nominatim.openstreetmap.org/search?addressdetails=1&q=${searchTerm}&format=jsonv2&limit=1`;
            let resp = await doApiNominatim(url);
            setShowLoading(false)
            console.log(resp.data[0]);
            if (resp.data[0]) {
                setIsLocationFound(true)
                setLocation({
                    lat: resp.data[0].lat,
                    lon: resp.data[0].lon
                })
            }
            else {
                setIsLocationFound(false)

            }

        }
        catch (err) {
            console.log(err);
        }
    }

    const doApiNominatim = async (_url) => {
        try {
            let resp = await axios.get(_url)
            return resp;
        }
        catch (err) {
            console.log(err)
            throw err;

        }
    }


    return (
        <div>
            <p className="h5 mb-3"
            >מיקום האירוע
            </p>
            <div className='border shadow p-3 d-flex align-items-center flex-column'>
                <div className=' d-flex col-8'>
                    <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className='form-control' placeholder='הזן כתובת/מקום לחיפוש'></input>
                    <button type='button' onClick={onClickSearch} className='btn btn-warning'>חיפוש</button>
                </div>
                {isLocationFound ? <p>נמצאה כתובת</p> : <p>לא נמצאה כתובת</p>}

                <Map location={location} />
            </div>



            <Modal show={showLoading} backdrop="static" centered>
                <Modal.Body className='text-center'>
                    <p>מחפש מיקום...</p>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default EventLocation