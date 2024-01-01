import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import InfoPopUp from './infoPopUp'
import { API_URL, doApiGet, doApiMethod } from '../../services/apiService';
import EditAvatar from './myInfo/editAvatar';

const MyInfo = () => {






    const userInfo = useSelector((myStore) =>
        myStore.userInfoSlice
    )
    const { register, handleSubmit, formState: { errors }, getValues } = useForm()
    const [showPopup, setPopup] = useState(false);
    const [textPopUp, setTextPopUp] = useState();
    const [showPopupAvatar, setPopupAvatar] = useState(false);
    const [textPopUpAvatar, setTextPopUpAvatar] = useState();

    const nameRef = register("name", { required: true, minLength: 2, maxLength: 50 })
    const nickNameRef = register("nick_name", { minLength: 2, maxLength: 50 })
    const genderRef = register("gender", { required: true })
    const ageRef = register("age", { min: 1, max: 120 })
    const addressRef = register("district_address", { minLength: 2, maxLength: 100 })
    const aboutRef = register("about", { minLength: 2, maxLength: 1000 })


    useEffect(() => {
        console.log(userInfo)
    }, [])

    const handleCancelPopUp = () => {
        setPopup(false)
    }

    const onSub = (data) => {
        console.log(data)
        doApiUpdateUserInfo(data)
    }

    const doApiUpdateUserInfo = async (data) => {
        let url = API_URL + "/users/changeMyInfo";

        try {
            let resp = await doApiMethod(url, "PUT", data);
            console.log(resp.data)

        }

        catch (err) {
            console.log(err);
        }
    }

    const onClickAvatar = () => {
        setPopupAvatar(true);

    }
    const handleCancelPopUpAvatar = () => {
        setPopupAvatar(false);
    }

    return (
        <div>
            <section className="py-5" style={{ backgroundImage: `url(${require('../../images/background.jpg')})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: "center", backgroundAttachment: "fixed" }}>
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-lg-12 col-xl-11">

                            <div className="card text-black" style={{ borderRadius: '25px', border: "none" }}>

                                <div style={{
                                    height: "200px",
                                    borderTopLeftRadius: '25px',
                                    borderTopRightRadius: '25px',
                                    backgroundImage: `url(${userInfo.user.background_image})`,
                                    backgroundPosition: 'center',
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <div onClick={onClickAvatar} style={{
                                        cursor:'pointer',
                                        height: "170px",
                                        border: "8px solid white",
                                        width: "170px",
                                        borderRadius: '100px',
                                        backgroundImage: `url(${userInfo.user.profile_image})`,
                                        backgroundPosition: 'center',
                                        backgroundSize: 'cover',
                                        backgroundRepeat: 'no-repeat'
                                    }}>

                                    </div>
                                </div>

                                <div className="card-body p-md-5">
                                    <div className="row justify-content-center">
                                        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4">עדכון פרופיל</p>
                                            <form onSubmit={handleSubmit(onSub)} className="mx-1 mx-md-4">



                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fa fa-user fa-lg ms-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <label className="form-label" htmlFor="form3Example1c">
                                                            שם
                                                        </label>
                                                        <input defaultValue={userInfo.user.name} {...nameRef} type="text" id="form3Example1c" className="form-control" />
                                                        {errors.name && <div className='text-danger'>* השם צריך להיות בין 2 ל50 תווים</div>}
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fa fa-user fa-lg ms-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <label className="form-label" htmlFor="form3Example1c">
                                                            כינוי
                                                        </label>
                                                        <input defaultValue={userInfo.user.nick_name} {...nickNameRef} type="text" id="form3Example9c" className="form-control" />
                                                        {errors.nick_name && <div className='text-danger'>* השם צריך להיות בין 2 ל50 תווים</div>}
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fa fa-envelope fa-lg ms-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <label className="form-label" htmlFor="form3Example3c">
                                                            אימייל
                                                        </label>
                                                        <input type="email" id="form3Example3c" className="form-control" defaultValue={userInfo.user.email} disabled />
                                                    </div>
                                                </div>


                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fa fa-key fa-lg ms-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">

                                                        <label className="form-label" htmlFor="form3Example4cd">
                                                            מין                          </label>
                                                        <select defaultValue={userInfo.user.gender} {...genderRef} className='form-select'>
                                                            <option value="male">זכר</option>
                                                            <option value="female">נקבה</option>
                                                            <option value="other">אחר</option>
                                                        </select>
                                                        {errors.gender && <div className='text-danger'>* יש לבחור מין</div>}

                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fa fa-user fa-lg ms-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <label className="form-label" htmlFor="form3Example1c">
                                                            גיל
                                                        </label>
                                                        <input defaultValue={userInfo.user.age} {...ageRef} type="number" id="form3Example34c" className="form-control" />
                                                        {errors.age && <div className='text-danger'>* הגיל צריך להיות בין 1-120</div>}
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fa fa-user fa-lg ms-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <label className="form-label" htmlFor="form3Example1c">
                                                            מקום מגורים
                                                        </label>
                                                        <input defaultValue={userInfo.user.district_address} {...addressRef} type="text" id="form3Example35c" className="form-control" />
                                                        {errors.district_address && <div className='text-danger'>* יש להזין בין 2 ל100 תווים</div>}
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fa fa-user fa-lg ms-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <label className="form-label" htmlFor="form3Example1c">
                                                            קצת עליי                                                        </label>
                                                        <textarea defaultValue={userInfo.user.about} {...aboutRef} type="text" id="form3Example35c" className="form-control" />
                                                        {errors.about && <div className='text-danger'>* יש להזין בין 2 ל1000 תווים</div>}
                                                    </div>
                                                </div>

                                                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                    <button className="btn btn-warning btn-lg">
                                                        שמור שינויים
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {showPopup && (
                    <InfoPopUp
                        show={showPopup}
                        message={textPopUp}
                        onCancel={handleCancelPopUp}
                    />
                )}
                {showPopupAvatar && (
                    <EditAvatar 
                    show={showPopupAvatar}
                    onCancel={handleCancelPopUpAvatar}
                    />
                )}
            </section>
        </div>
    )
}

export default MyInfo