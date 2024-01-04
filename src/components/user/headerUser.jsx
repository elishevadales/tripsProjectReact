import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import ConfirmPopUp from '../general/confirmPopUp';
import { updateUserInfo } from '../reducer/userInfoSlice';
import { API_URL, TOKEN_NAME, doApiGet } from '../../services/apiService';

const HeaderUser = (props) => {

    const [showLogOutPopup, setShowLogOutPopup] = useState(false);
    const nav = useNavigate()
    const dispatch = useDispatch();
    const userInfo = useSelector((myStore) =>
        myStore.userInfoSlice
    )


    useEffect(() => {
        const token = localStorage.getItem(TOKEN_NAME);
        if (!token) {
            nav('/')
        }
        else {
            doApiMyInfo();
        }
        
    }, [])

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

    const doApiMyInfo = async () => {
        let url = API_URL + "/users/myInfo";
        try {

            let resp = await doApiGet(url);
            console.log(resp.data);
            dispatch(updateUserInfo({
                update: resp.data

            }))


        }
        catch (err) {
            console.log(err);
            alert("there is a problem ,try again later")
        }

    }


    return (
        <>
            {/* <div style={{ height: "220px", backgroundImage: `url(${require('../../images/background.jpg')})`, backgroundSize: 'cover', backgroundPosition: "center" }}> */}
            <header className={`${props.color} text-white p-3`}>
                {/* <header className={`text-white p-3`} style={{background:"rgba(255, 193, 7, 0.3)", position:"sticky", top: 0, zIndex: 1000}}> */}
                <div className="container d-flex justify-content-between">
                    <div className="logo d-flex" onClick={onClickLogo}>
                        <i className="fa fa-car fa-2x" aria-hidden="true"></i>
                        <h2 className='lead mr-3'>לוגו</h2>
                    </div>
                    <div className="nav d-flex align-items-center">
                        {
                            props.links.map((link, i) => {
                                return (
                                    <Link key={i} to={link.path} className='text-white text-decoration-none mx-3 lead'>{link.title}</Link>
                                )
                            })
                        }
                        <button onClick={handleLogOutClick} className='btn btn-danger'>יציאה</button>
                    </div>
                </div>
            </header>
            {/* </div> */}
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