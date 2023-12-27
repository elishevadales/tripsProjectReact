import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'

const HeaderUser = () => {

const nav = useNavigate()
const onClickLogo = () => {
    nav("/")
}

    return (
        <>
            <header className='bg-warning text-white p-3'>
                <div className="container d-flex justify-content-between">
                    <div className="logo d-flex"  onClick={onClickLogo}>
                        <i className="fa fa-car fa-2x" aria-hidden="true"></i>
                        <h2 className='lead mr-3'>לוגו</h2>
                    </div>
                    <div className="nav d-flex align-items-center">
                        <Link to='/login' className='text-white text-decoration-none mx-3 lead'>כניסה</Link>
                        <Link to='/signUp' className='text-white text-decoration-none mx-3 lead'>רישום</Link>
                    </div>
                </div>
            </header>
            <Outlet />
        </>
    )
}

export default HeaderUser