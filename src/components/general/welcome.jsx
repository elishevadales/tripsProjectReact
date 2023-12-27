import React from 'react'
import { useNavigate } from 'react-router'

const Welcome = () => {

    const nav = useNavigate();
    const start = () => {
        nav("/login")
    }

    return (
        <div className='text-center'>
            <p className='display-3 text-warning text-center m-5'>welcome!</p>
            <div onClick={start} className='btn btn-dark text-white px-5 py-3 display-5'>start</div>
        </div>
    )
}

export default Welcome