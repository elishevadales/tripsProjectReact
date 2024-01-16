// Message.js
import React from 'react';
import { useNavigate } from 'react-router';


const Message = ({ message, last, alignLeft , index}) => {

    const nav = useNavigate()
    const profile = (_id) => {
        localStorage.setItem("userProfileId", _id);

        // if (userInfo.user.role == "admin") {
        //     nav("/admin/profile")
        // }
        // else {
        nav("/user/profile")
        // }

    }


    return (
        <div className="container p-0 m-0 ">
            <div className="row  mt-1">
                <div className="col-md-1  d-flex justify-content-end ">
                    {last ? (<img className='mt-auto'
                        src={message?.user_id?.profile_image ? message?.user_id?.profile_image : "https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp"}
                        alt={message?.user_id?.nick_name}
                        title={message?.user_id?.nick_name}
                        onClick={() => profile(message?.user_id?._id)}
                        style={{ cursor: 'pointer',width: '40px', height: '40px', borderRadius: '50%', boxShadow: '0 4px 8px rgba(137,137,137,0.75)' }}
                    />) : null}
                </div>
                <div className="col d-flex p-0 ">
                        {last ? (
                        <div
                            className={` d-flex text-white p-2 mb-3 justify-content-center px-3 ${alignLeft ? 'align-left' : 'align-right'
                                }`}
                            style={{
                                borderRadius: '20px 20px 0px 20px',
                                maxWidth: '400px',
                                minWidth: 'min-content',
                                whiteSpace: 'pre-wrap',
                                boxShadow: '0 4px 8px rgba(137,137,137,0.75)',
                                background:'#077F7A'
                            }}
                        >
                            {message?.text}
                             
                            <span className='text-muted' style={{fontSize:'13px'}}> <br/> {new Date( message?.time_stamp).getUTCHours()}:{new Date( message.time_stamp).getUTCMinutes()}</span>

                           
                        </div>
                        ) : (
                            <div
                                className={` d-flex text-white p-1 justify-content-center px-3 mb-0 ${alignLeft ? 'align-left' : 'align-right'
                                    }`}
                                style={{
                                    borderRadius: '20px 20px 20px 20px',
                                    maxWidth: '400px',
                                    minWidth: 'min-content',
                                    whiteSpace: 'pre-wrap',
                                    boxShadow: '0 4px 8px rgba(137,137,137,0.75)',
                                    background:'#077F7A'
                                }}
                            >
                                {message?.text}
                            </div>)
                        }

                </div>
            </div>
        </div>
    )
}


export default Message;
