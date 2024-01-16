import { API_URL, doApiGet, doApiMethod } from '../../../services/apiService'
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom';
import MyEventList from './myEventList'
import { useNavigate } from 'react-router';
import CalendarView from '../calendarView';
import Avatar from '@mui/joy/Avatar';
import ParticipantsConfirmation from './participantsConfirmation'


const Profile = ({ myProfile = false }) => {

    const nav = useNavigate()

    const [userId, setUserId] = useState("")
    const [user, setUser] = useState("")
    const [currentUser, setCurrentUser] = useState(false)
    const [showEventListModal, setShowEventListModal] = useState(false);
    const [showMyJointedEventListModal, setShowMyJointedEventListModal] = useState(false);
    const [active, setActive] = useState(false);

    const [joinRequestListDialog, setJoinRequestListDialog] = useState(false);
    const [joinRequestList, setJoinRequestList] = useState([]);

    const [showNotification, setShowNotification] = useState(false)
    const [notifications, setNotifications] = useState(false)

    const userInfo = useSelector((myStore) =>
        myStore.userInfoSlice
    )

    const handleEventListClick = () => {
        setShowEventListModal(true);
    };

    const handleEventListModalClose = () => {
        setShowEventListModal(false);
    };



    const handleRequestListClick = () => {
        setJoinRequestListDialog(true);
    };

    const handleRequestListClickClose = () => {
        setJoinRequestListDialog(false);
    };


    const handleMyJointedEventClick = (active) => {
        setActive(active)
        setShowMyJointedEventListModal(true);
    };


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

    const participantsConfirmation = async () => {
        // let url = API_URL + `/users/getJoinRequest`;
        try {
            // let resp = await doApiGet(url);
            // setJoinRequestList(resp.data.data)
            setJoinRequestListDialog(true)
            // console.log("requests", resp.data.data)
        }
        catch (err) {
            console.log(err);
            alert("there is a problem ,try again later")
        }
    }


    const handleMyJointedEventClose = () => {
        setShowMyJointedEventListModal(false);
    };

    const editProfile = () => {
        nav("/user/myInfo")
    }

    const doApiGetUser = async () => {
        try {

            const user_id = localStorage.getItem("userProfileId")
            setCurrentUser(userInfo?.user?._id === user_id);
            let url = API_URL + `/users/userInfo/${user_id}`;
            let resp = await doApiGet(url)
            console.log("user", resp.data)
            setUser(resp.data)
        }

        catch (err) {
            console.log(err);
        }

    }

    useEffect(() => {
        if (myProfile)
            localStorage.setItem("userProfileId", userInfo?.user._id);
        doApiGetUser()
        checkNotification()

    }, [userInfo]);

    return (
        <div style={{ position: "relative", backdropFilter: "blur(30px)" }}>
            {showEventListModal && user?.my_created_events &&
                <MyEventList
                    events={user?.my_created_events}
                    isOpen={handleEventListClick}
                    onClose={handleEventListModalClose}
                    title={`האירועים של ${user.nick_name}`}
                />}


            {joinRequestListDialog &&
                <ParticipantsConfirmation
                    // requestList={joinRequestList}
                    isOpen={handleRequestListClick}
                    onClose={handleRequestListClickClose}
                    title={"בקשות הצטרפות"}
                />}


            {showMyJointedEventListModal && user?.my_join_events &&
                <MyEventList
                    events={user?.my_join_events?.filter(event => event.active === active)}
                    isOpen={setShowMyJointedEventListModal}
                    onClose={handleMyJointedEventClose}
                    title={active ? "אירועים עתידיים" : "האירועים בהם השתתפתי"}
                />}


            <div className='container-fluid pt-3' >
                <div className='container p-5' >
                    <div className='grid' style={{ boxShadow: '0 4px 8px rgba(137,137,137,0.75)', background: 'white' }}>
                        <div className='position-relative' style={{ backgroundImage: `url(${user?.background_image ? user?.background_image : "../../../images/bg.jpg"})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '300px', backdropFilter: 'blur(20px)' }}>
                            <div className='row d-flex text-center  justify-content-center flex-column align-items-center p-5 m-0' style={{ background: 'rgba(255, 255, 255, 0.505)' }}>
                                {/* Profile Image and Info */}
                                <Avatar variant="soft" sx={{ width: 150, height: 150 }} color="neutral" src={user?.profile_image ? user?.profile_image : "https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp"} style={{ boxShadow: '0 4px 8px rgba(137,137,137,0.75)', }} />
                                {/* <div className='p-5'
                                    style={{
                                        width: '150px',
                                        height: '150px',
                                        borderRadius: '50%',
                                        boxShadow: '0 4px 8px rgba(137,137,137,0.75)',
                                        background: `url(${user?.profile_image ? user?.profile_image : "https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp"})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        backgroundRepeat: 'no-repeat',
                                        display: 'block',
                                        margin: '0 auto',
                                    }}
                                    alt={user?.nick_name}
                                /> */}
                                {/* User Info */}
                                <p>
                                    <span className='h3 px-1'>{user?.nick_name}</span>
                                    {user?.gender === "female" ? <i className="fa fa-venus"></i> : <i className="fa fa-mars"></i>}
                                    <br />
                                    <span className='h4 px-1'>{user.age}</span>
                                </p>
                                <div>
                                    <div className='row'>
                                        <div className='col'></div>
                                        <div className='col'>
                                            <span className=''> פרסמתי</span>
                                            <br />
                                            <span className='h4 px-1'>{user?.my_created_events?.length}</span>
                                            <br />
                                            <span className=''> אירועים</span>
                                        </div>
                                        <div className='col'>
                                            <span className=''> השתתפתי ב</span>
                                            <br />
                                            <span className='h4 px-1'>{user?.my_join_events?.length}</span>
                                            <br />
                                            <span className=''> אירועים</span>
                                        </div>
                                        <div className='col'></div>
                                    </div>
                                </div>

                                {currentUser &&
                                    <>  <div >
                                        <button
                                            type="button"
                                            className="btn  btn-rounded btn-icon"
                                            style={{ color: 'black', position: 'absolute', bottom: '20px', left: "20px", border: 'none' }}
                                            onClick={editProfile}
                                        >
                                            <i className="fa  fa-pencil fa-2x" style={{ transform: "scaleX(-1)" }}></i>
                                        </button>
                                    </div>
                                        {notifications &&
                                            <div >
                                                <button
                                                    type="button"
                                                    className="btn  btn-rounded btn-icon"
                                                    style={{ color: 'black', position: 'absolute', bottom: '20px', right: "20px", border: 'none' }}
                                                    onClick={participantsConfirmation}
                                                >
                                                    <i className="fa  fa-bell fa-2x" style={{ transform: "scaleX(-1)" }}></i>
                                                </button>
                                            </div>
                                        }
                                    </>
                                }


                            </div>
                            <div className='p-0 d-flex flex-column align-items-center' style={{ position: 'absolute', bottom: '-20px', width: '100%' }}>
                                <div>
                                    {currentUser && <button disabled={user?.my_join_events?.length === 0} className='btn px-3 mx-3' style={{ background: '#BBE4E2', color: "black", border: 'none', borderRadius: '40px', boxShadow: '0 4px 8px rgba(137,137,137,0.75)' }} onClick={() => handleMyJointedEventClick(false)}>אירועים שהייתי </button>}
                                    <button disabled={user?.my_created_events?.length === 0} className='btn px-3 ' style={{ background: '#077F7A', color: "white", border: 'none', borderRadius: '40px', boxShadow: '0 4px 8px rgba(137,137,137,0.75)' }} onClick={handleEventListClick}>האירועים שלי </button>
                                    {currentUser && <button disabled={user?.my_join_events?.length === 0} className='btn px-3 mx-3' style={{ background: '#BBE4E2', color: "black", border: 'none', borderRadius: '40px', boxShadow: '0 4px 8px rgba(137,137,137,0.75)' }} onClick={() => handleMyJointedEventClick(true)}>אירועים עתידיים </button>}
                                </div>
                            </div>

                        </div>


                        {/* About Me Row */}
                        <div className='row d-flex text-center justify-content-center flex-column align-items-center p-5'>
                            <h3>על עצמי</h3>
                            <div className='col-4 '> {user?.about ? user?.about : "אני אספר על עצמי בהמשך"} </div>
                        </div>

                        {user?.district_address &&
                            <div className='row d-flex text-center justify-content-center flex-column align-items-center p-5'>
                                <h4><i className="fa fa-home fa-2x"></i> </h4>
                                <div className='col-4 '> {user?.district_address}</div>
                            </div>
                        }
                    </div>



                    {currentUser && <div className='grid mt-2 p-5' style={{ backgroundImage: `url(${user?.background_image ? user?.background_image : "../../../images/bg.jpg"})`, backgroundSize: 'cover', backgroundPosition: 'center', boxShadow: '0 4px 8px rgba(137,137,137,0.75)', backgroundColor: 'white' }}>

                        <div className='row p-5 m-0' style={{ background: 'rgba(255, 255, 255, 0.505)' }}>

                            <CalendarView events={user?.my_created_events?.concat(user?.my_join_events) || []} />


                        </div>

                    </div>}
                </div>

            </div>
        </div>
    );
}

export default Profile