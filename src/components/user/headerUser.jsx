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
            console.log("my info:",resp.data);
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
            <header
                className='container-fluid m-0 pt-5'
                style={{
                    boxShadow: "-4px 7px 13px -2px rgba(0,0,0,0.75)",
                    background: '#ffffff24',
                    width: '100%',
                    backdropFilter: "blur(20px)",
                    top: 0,
                    transition: 'top 0.3s',
                    height: '100px',
                    zIndex: 1000,
                }}
            >
                <div className="container d-flex justify-content-between">
                    <div className="logo d-flex" onClick={onClickLogo}>
                        <i className="fa fa-car fa-2x text-white" aria-hidden="true"></i>
                        <h2 className='lead mr-3'> </h2>
                    </div>
                    <div className="nav d-flex align-items-center">
                        {
                            props.links.map((link, i) => {
                                return (
                                    <Link key={i} to={link.path} className='text-white text-decoration-none mx-3 lead'>{link.title}</Link>
                                )
                            })
                        }
                        <button onClick={handleLogOutClick} className='btn text-white' style={{ background: '#077F7A' }}>יציאה</button>
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