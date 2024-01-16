import React from 'react'
import { useNavigate } from 'react-router';

const Logo = ({ withtext }) => {

    const nav = useNavigate()

 

    return (
        <div className='logo d-flex align-items-center justify-content-center' style={{ cursor: "pointer" }}>
            <i className='fa fa-car fa-2x' aria-hidden='true' style={{ color: "rgb(35, 140, 156)" }}></i>

            <h2 className='me-1' style={{ color: "rgb(35, 140, 156)", fontSize: "32px", fontFamily: "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif" }}> trips</h2>
        </div>
    )
}

export default Logo