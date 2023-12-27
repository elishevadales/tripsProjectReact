import React from 'react'
import { Link, Outlet } from 'react-router-dom'



const HeaderAdmin = () => {


    return (
        <>
        <header className='bg-dark text-white p-2'>
            <div className="container d-flex justify-content-between">
                <div className="logo">
                    <h2 className='lead display-5'>My Resume</h2>
                </div>
                <div className="nav d-flex align-items-center">
                    <Link to='/admin/createResume' className='text-white text-decoration-none mx-3 lead'>create-resume</Link>
                    <Link to='/admin/myResumes' className='text-white text-decoration-none mx-3 lead'>my-resumes</Link>
                    <Link to='/admin/allUsersResumes' className='text-white text-decoration-none mx-3 lead'>users'-resumes</Link>
                    <button className='lead p-2' style={{border:"none", borderRadius:"10px"}}>log-out</button>

                </div>
            </div>
        </header>
        <Outlet/>
        </>
    )
}

export default HeaderAdmin