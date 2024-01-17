import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form'
import { API_URL, TOKEN_NAME, doApiGet, doApiMethod } from '../../services/apiService'
import { Link, useNavigate } from 'react-router-dom'
import InfoPopUp from './infoPopUp'
import { useDispatch } from 'react-redux'
import { updateUserInfo } from '../reducer/userInfoSlice'
import { MDBInput } from "mdbreact";

const ResetPasswordMessage = () => {
    const [sendMail, setSendMail] = useState(false)
    const { register, handleSubmit, formState: { errors }, getValues } = useForm()
    const nav = useNavigate();
    const [showPopup, setPopup] = useState(false);
    const [textPopUp, setTextPopUp] = useState();

    const emailRef = register("email", { required: true })

    const doApi = async (bodyData) => {
        let url = API_URL + "/users/forgot-password"
        try {
            let resp = await doApiMethod(url, "POST", bodyData);
            console.log(resp.data)
            setSendMail(true)
        }
        catch (err) {

            console.log(err);
            if (err.response?.data?.code == 1) {
                setTextPopUp("כתובת המייל לא נמצאה")
                setPopup(true)
            } else {
                setTextPopUp("נסו שוב מאוחר יותר")
                setPopup(true)
            }
        }
    }

    const onSub = async (data) => {

        doApi(data)

    }
    const handleCancelPopUp = () => {
        setPopup(false)
        nav("/login")
    }

    return (
        <div style={{ position: "relative", backdropFilter: "blur(30px)", height: '100vh' }}>
            {showPopup && (
                <InfoPopUp
                    show={showPopup}
                    message={textPopUp}
                    onCancel={handleCancelPopUp}
                />
            )}
            {!sendMail ?
                <div className='container-fluid p-5' >
                    <div className='container p-5 d-flex text-center justify-content-center flex-column align-items-center'>
                        <div className='d-flex text-center p-5 justify-content-center flex-column align-items-center mt-5 ' style={{ background: 'white', maxWidth: '500px', borderRadius: '10px' }}>
                            <form onSubmit={handleSubmit(onSub)} className="">
                                <h3> איפוס סיסמא </h3>
                                <p className=' pt-3' style={{ maxWidth: '300px' }}> הכנס את כתובת המייל שאיתו נירשמת למערכת</p>
                                <div className="form-group row">
                                    <label className="col-sm-2 col-form-label font-weight-bold" htmlFor="form3Example3c">
                                        אימייל
                                    </label>
                                    <div className="col-sm-10">
                                        <input {...emailRef} type="email" id="form3Example3c" className="form-control p-2" />
                                    </div>
                                </div>
                                <p className='text-muted pt-3' style={{ maxWidth: '300px' }}> מייל עם קישור לאיפוס סיסמא ישלך אליך</p>

                                <button className="btn  btn-lg text-white mt-4" style={{ borderRadius: '3px', background: "#077F7A", boxShadow: "9px 9px 55px -12px rgba(0,0,0,0.75)" }}>
                                    שלח
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                :
                <div className='container-fluid p-5' >
                    <div className='container p-5 d-flex text-center justify-content-center flex-column align-items-center'>
                        <div className='d-flex text-center p-5 justify-content-center flex-column align-items-center mt-5 ' style={{ background: 'white', maxWidth: '500px', borderRadius: '10px' }}>
                            <h2>Trip With Me</h2>
                            <h3> איפוס סיסמא </h3>
                            <p className='h4 pt-3' style={{ maxWidth: '300px' }}> קישור לאיפוס סיסמא נשלח למייל שלך, תוקף הקישור הוא 10 דקות</p>
                            <div className='col  me-3 p-5' style={{ backgroundImage: `url(${require('../../images/email.gif')})`, backgroundSize: 'cover', backgroundPosition: 'center', transition: 'background-image 5s ease-in-out', height: '90px', width: '90px' }}>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default ResetPasswordMessage