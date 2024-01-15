
import React, { useState } from 'react'
import axios from "axios";
import { Modal } from 'react-bootstrap';
import Map from './map';



const EventLocation = ({ setCoordinates , setAddress }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showLoading, setShowLoading] = useState(false)
    const [isLocationFound, setIsLocationFound] = useState(false)
    const [center, setCenter] = useState([32.43634, 35.122432])
    const [locationConfirmed, setLocationConfirmed] = useState(false)
    const [locationData, setLocationData] = useState()




    const onClickSearch = async () => {
        setShowLoading(true)
        console.log('input:', searchTerm);
        try {
            let url = ` https://nominatim.openstreetmap.org/search?addressdetails=1&q=${searchTerm}&format=jsonv2&limit=1`;
            let resp = await doApiNominatim(url);
            setShowLoading(false)
            console.log("locationData:", resp.data[0]);
            setLocationData(resp.data[0])
            if (resp.data[0]) {
                setIsLocationFound(true)
                setCenter(
                    [resp.data[0].lat,
                    resp.data[0].lon]
                )
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

    const confirmLocation = () => {
        console.log("center:",center)
        setCoordinates(
            {
                lat: center[0],
                lon: center[1]
            }
        )
        setAddress(
            locationData.address
        )

        setLocationConfirmed(true)
    }

    const removeLocation = () => {
        setCoordinates(null)
        setLocationConfirmed(false)

    }


    return (
        <div className='mt-3'>
            <p className="h5 mb-3 d-flex align-items-center"
            >מיקום האירוע
            {
                        locationConfirmed &&
                        <i className="fa fa-check-circle text-success me-3" aria-hidden="true" style={{ fontSize: "36px" }}></i>
                    }
            </p>
            <div className='border shadow p-3 d-flex align-items-center flex-column'>
                <div className=' d-flex col-8 align-items-center'>
                    
                    <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className='form-control' placeholder='כתובת/מקום'></input>
                    <button type='button' onClick={onClickSearch} className='btn btn-warning'>חיפוש</button>
                </div>
                {isLocationFound ?
                    <div className='border shadow col-12 mt-4 d-flex'>
                        <div className='col-8 p-3'>
                            <p className='h5'>{locationData.address.country}</p>
                            <div className='h6'>
                                <p>{locationData.address.state}</p>
                                <p>{locationData.address.state_district}</p>
                                <p>{locationData.address.town}</p>
                                <p>{locationData.address.city}</p>
                                <p>{locationData.address.road} {locationData.address.house_number}</p>
                            </div>

                        </div>
                        <div className='col-4 border p-3 d-flex flex-column justify-content-center align-items-center'>
                            <button type='button' className='btn btn-success mb-3' onClick={confirmLocation} style={{ cursor: "pointer" }}>מאשר כתובת</button>

                            <button type='button' onClick={removeLocation} className='btn btn-danger' style={{ cursor: "pointer" }}> מחק כתובת </button>
                        </div>

                    </div>
                    : <p className='text-danger'>לא נמצא מיקום</p>
                }

                <Map center={center} />
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