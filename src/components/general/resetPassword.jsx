import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form'
import { API_URL, TOKEN_NAME, doApiGet, doApiMethod } from '../../services/apiService'
import { Link, useNavigate, useParams } from 'react-router-dom'
import InfoPopUp from './infoPopUp'


const ResetPassword = () => {

    const [sendMail, setSendMail] = useState(false)
    const { register, handleSubmit, formState: { errors }, getValues } = useForm()
    const nav = useNavigate();
    const [showPopup, setPopup] = useState(false);
    const [textPopUp, setTextPopUp] = useState();
    const { token } = useParams();
    const passRef = register("password", { required: true, minLength: 6, maxLength: 50 });


    const handleCancelPopUp = () => {
        setPopup(false)
        nav("/login")
    }
    const doApi = async (bodyData) => {
        const url = `${API_URL}/users/reset-password/${token}`
        try {
            let resp = await doApiMethod(url, "POST", bodyData);
            console.log(resp.data)
            setTextPopUp("הסיסמא החדשה עודכנה בהצלחה")
            setPopup(true)
        }
        catch (err) {

            console.log(err);
            if (err.response?.data?.code == 1) {
                setTextPopUp("הקישור לאיפוס הסיסמא פג תוקף")
                setPopup(true)
            } else {
                setTextPopUp("שגיאה, נסו שוב מאוחר יותר")
                setPopup(true)
            }
        }
    }


    const onSub = async (data) => {
        console.log("hi")
        delete data.passwordAgain
        doApi(data)
    }

    const passAgainRef = register("passwordAgain", {
        required: true, validate: (val) => {
            return val == getValues("password")
        }
    });

    return (
        <div style={{ position: "relative", backdropFilter: "blur(30px)", height: '100vh' }}>
            {showPopup && (
                <InfoPopUp
                    show={showPopup}
                    message={textPopUp}
                    onCancel={handleCancelPopUp}
                />
            )}
            <div className='container-fluid p-5'>
                <div className='container p-5 d-flex text-center justify-content-center flex-column align-items-center'>
                    <div className='d-flex text-center p-5 justify-content-center flex-column align-items-center mt-5' style={{ background: 'white', maxWidth: '1000px', borderRadius: '10px' }}>
                        <form onSubmit={handleSubmit(onSub)} className=" ">
                            <h3>איפוס סיסמא</h3>
                            <p className='pt-3' style={{ maxWidth: '900px' }}>בחר סיסמא חדשה</p>

                            {/* Password Field */}
                            <div className="form-group mb-4 d-flex align-items-center">
                                <label className="form-label" htmlFor="form3Example4c" style={{ flexBasis: '30%', textAlign: 'right' }}>
                                    סיסמא
                                </label>
                                <input {...passRef} type="password" id="form3Example4c" className="form-control p-2" />
                                {errors.password && <div className='text-danger'>* יש להכניס סיסמה תקינה</div>}
                            </div>

                            {/* Password Again Field */}
                            <div className="form-group mb-4 d-flex align-items-center">
                                <label className="form-label" htmlFor="form3Example4cd" style={{ flexBasis: '30%', textAlign: 'right' }}>
                                    סיסמא שוב
                                </label>
                                <input {...passAgainRef} type="password" id="form3Example4cd" className="form-control p-2" />
                                {errors.passwordAgain && <div className='text-danger'>* סיסמאות לא תואמות</div>}
                            </div>

                            <button  className="btn btn-lg text-white mt-4" style={{ borderRadius: '3px', background: "#077F7A", boxShadow: "9px 9px 55px -12px rgba(0,0,0,0.75)" }}>
                                אישור
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default ResetPassword