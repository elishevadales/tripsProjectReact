import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'



const HeaderAdmin = () => {

    const nav = useNavigate()
    const onClickLogo = () => {
        nav("/")
    }

    return (
        <>
            <header className='bg-dark text-white p-3'>
                <div className="container d-flex justify-content-between">
                    <div className="logo d-flex" onClick={onClickLogo}>
                        <i className="fa fa-car fa-2x" aria-hidden="true"></i>
                        <h2 className='lead mr-3'>לוגו</h2>
                    </div>
                    <div className="nav d-flex align-items-center">
                        <Link to='/admin/usersList' className='text-white text-decoration-none mx-3 lead'>משתמשים</Link>
                    </div>
                </div>
            </header>
            <Outlet />
        </>
    )
}

export default HeaderAdmin