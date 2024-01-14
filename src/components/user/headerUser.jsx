import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import ConfirmPopUp from '../general/confirmPopUp';
import { updateUserInfo } from '../reducer/userInfoSlice';
import { API_URL, TOKEN_NAME, doApiGet } from '../../services/apiService';
import Avatar from '@mui/joy/Avatar';
import Badge from '@mui/material/Badge';
import Notification from '../general/notification/notification';

const HeaderUser = (props) => {

    const [notifications, setNotifications] = useState(false)
    const [showLogOutPopup, setShowLogOutPopup] = useState(false);
    const [showNotification, setShowNotification] = useState(false)
    const nav = useNavigate()
    const dispatch = useDispatch();
    const userInfo = useSelector((myStore) =>
        myStore.userInfoSlice
    )


    const checkNotification = async () => {
        let url = API_URL + `/users/chackJoinRequest`;
        try {

            let resp = await doApiGet(url);
            setNotifications(resp.data)
        }
        catch (err) {
            console.log(err);
            alert("there is a problem ,try again later")
        }
    }


    const handleNotificationClose = () => {
        setShowNotification(false);
      };


    useEffect(() => {
        const token = localStorage.getItem(TOKEN_NAME);
        if (!token) {
            nav('/')
        }
        else {
            doApiMyInfo();
           
        }
        props.socket.on("new-notification", notification =>{
            setNotifications(true)
            setShowNotification(true)
        })

        return () => {
            props.socket.off("new-notification"); 
          };
    }, [props.socket])

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
            await dispatch(updateUserInfo({
                update: resp.data

            }))
            props.socket.emit("user", resp.data._id)
            checkNotification()
        }
        catch (err) {
            console.log(err);
            alert("there is a problem ,try again later")
        }

    }


    return (
        <>
            {/* <div style={{ height: "220px", backgroundImage: `url(${require('../../images/background.jpg')})`, backgroundSize: 'cover', backgroundPosition: "center" }}> */}
            <header
                className='container-fluid m-0 pt-5'
                style={{
                    boxShadow: "-4px 7px 13px -2px rgba(0,0,0,0.75)",
                    background: '#ffffff24',
                    //   position: visible ? 'fixed' : 'absolute',
                    width: '100%',
                    top: 0,
                    transition: 'top 0.3s',
                    height: '100px',
                    zIndex: 1000,
                }}
            >
                {/* <header className={`text-white p-3`} style={{background:"rgba(255, 193, 7, 0.3)", position:"sticky", top: 0, zIndex: 1000}}> */}
                <div className="container d-flex justify-content-between">
                    <div className="logo d-flex" onClick={onClickLogo}>
                        <i className="fa fa-car fa-2x text-white" aria-hidden="true"></i>
                        <div className='mx-3'>
                           {notifications && <Badge color="error" overlap="circular" badgeContent=" " variant="dot" >
                                <Avatar variant="soft" color="neutral" src={userInfo?.user?.profile_image} style={{boxShadow: '0 4px 8px rgba(137,137,137,0.75)'}}/>
                            </Badge>} 
                            {!notifications && <Avatar variant="soft" color="neutral" src={userInfo?.user?.profile_image} />} 
                        </div>
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
                        <button onClick={handleLogOutClick} className='btn' style={{ background: '#077F7A' }}>יציאה</button>
                    </div>
                </div>
            </header>
            {/* </div> */}
            <div>
     

      {/* Your other components */}
    </div>

    {showNotification && (
        <Notification
          message="קיבלת בקשת הצטרפות חדשה לאירוע שלך"
          onClose={handleNotificationClose}
        />
      )}
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