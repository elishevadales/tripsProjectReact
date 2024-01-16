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
                    minHeight: '100vh'  // Use vh unit to represent 95% of the viewport height
                }}
            >
                <div className='pt-5'>
                    <p className='display-3 text-warning text-center pt-5'>welcome</p>
                    <div onClick={start} className='btn  text-white px-5 py-3 display-5' style={{ background: "#4d938ec8", boxShadow: "-4px 7px 13px -2px rgba(0,0,0,0.75)", fontWeight: 'bold' }}>כניסה</div>
                </div>


                <svg className="arrows">
              <path className="a1" d="M0 0 L30 32 L60 0"></path>
              <path className="a2" d="M0 20 L30 52 L60 20"></path>
              <path className="a3" d="M0 40 L30 72 L60 40"></path>
            </svg>
            </div>
            <TimeLine />
        </>

    )
}

export default Welcome