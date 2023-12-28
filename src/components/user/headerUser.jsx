import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import ConfirmPopUp from '../general/confirmPopUp';
import { updateUserInfo } from '../reducer/userInfoSlice';
import { TOKEN_NAME } from '../../services/apiService';

const HeaderUser = () => {

    const [showLogOutPopup, setShowLogOutPopup] = useState(false);



    const nav = useNavigate()
    const dispatch = useDispatch();

    const userInfo = useSelector((myStore) =>
        myStore.userInfoSlice
    )

    const onClickLogo = () => {
        nav("/")
    }
    const handleLogOutClick = () => {
        setShowLogOutPopup(true)
    }
    const handleConfirmLogout = () => {
        localStorage.removeItem(TOKEN_NAME);
        dispatch(updateUserInfo({
            update: {}
          }))
        setShowLogOutPopup(false)
        nav('/')
    }
    const handleCancelLogout = () => {
        setShowLogOutPopup(false)
    }


    useEffect(() => {
        console.log(userInfo)
    })

    return (
        <>
            <header className='bg-warning text-white p-3'>
                <div className="container d-flex justify-content-between">
                    <div className="logo d-flex" onClick={onClickLogo}>
                        <i className="fa fa-car fa-2x" aria-hidden="true"></i>
                        <h2 className='lead mr-3'>לוגו</h2>
                    </div>
                    <div className="nav d-flex align-items-center">
                        <Link to='/login' className='text-white text-decoration-none mx-3 lead'>כניסה</Link>
                        <Link to='/signUp' className='text-white text-decoration-none mx-3 lead'>רישום</Link>
                        <button onClick={handleLogOutClick} className='btn btn-dark'>יציאה</button>
                    </div>
                </div>
            </header>
            <Outlet />
            {showLogOutPopup && (
                <ConfirmPopUp
                    show={showLogOutPopup}
                    message={"האם אתה בטוח שברצונך לצאת מהמערכת?"}
                    onConfirm={handleConfirmLogout}
                    onCancel={handleCancelLogout}
                />
            )}
        </>
    )
}

export default HeaderUser