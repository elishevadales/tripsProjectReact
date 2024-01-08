import React from 'react'
import { useNavigate } from 'react-router'
import TimeLine from './timeLine';

const Welcome = () => {

    const nav = useNavigate();
    const start = () => {
        nav("/login")
    }

    return (
        <>
         <div
    className='text-center d-flex justify-content-center align-items-center'
    style={{
        backgroundImage: `url(${require('../../images/welcome3.jpg')})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        minHeight: '95vh'  // Use vh unit to represent 95% of the viewport height
    }}
>
            <div className='pt-5'>
                <p className='display-3 text-warning text-center pt-5'>welcome!</p>
                <div onClick={start} className='btn  text-white px-5 py-3 display-5' style={{ background: "#4d938ec8", boxShadow: "-4px 7px 13px -2px rgba(0,0,0,0.75)", fontWeight: 'bold' }}>כניסה</div>
            </div>
        </div>
        <TimeLine/>
        </>
      
    )
}

export default Welcome