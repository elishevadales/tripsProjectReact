import React from 'react'
import { useNavigate } from 'react-router'

const Welcome = () => {

    const nav = useNavigate();
    const start = () => {
        nav("/login")
    }

    return (
        <div className='text-center'>
            <p className='display-3 text-primary text-center m-5'>wellcome!</p>
            <div onClick={start} className='btn btn-primary px-5 py-3 display-5'>start</div>
        </div>
    )
}

export default Welcome