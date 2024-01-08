

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import InfoPopUp from '../infoPopUp';
import { API_URL, doApiGet, doApiMethod } from '../../../services/apiService';
import EditAvatar from './editAvatar';
import EditBackground from './editBackground';

const MyInfo = () => {

    const userInfo = useSelector((myStore) => myStore.userInfoSlice);
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();

    const [showPopup, setPopup] = useState(false);
    const [textPopUp, setTextPopUp] = useState(false);
    const [showPopupAvatar, setPopupAvatar] = useState(false);
    const [showPopupBackground, setPopupBackground] = useState(false);

    useEffect(() => {
        // Fetch user information and set default values
        const fetchData = async () => {
            try {
                // Fetch user information
                const userResponse = await doApiGet(API_URL + '/users/myInfo');
                const userData = userResponse.data;

                // Set default values using setValue from react-hook-form
                setValue('name', userData.name);
                setValue('nick_name', userData.nick_name);
                setValue('gender', userData.gender);
                setValue('age', userData.age);
                setValue('district_address', userData.district_address);
                setValue('about', userData.about);
            } catch (error) {
                console.error('Error fetching user information:', error);
            }
        };

        fetchData();
    }, [setValue]);

    const handleCancelPopUp = () => {
        setPopup(false);
    };

    const onSub = (data) => {
        console.log(data);

        if(!data.age){
            data.age = ""
        }else{
            //"10" means decimel number:
            data.age = parseInt(data.age,10);
        }

          
        console.log(data);

        doApiUpdateUserInfo(data);
    };

    const doApiUpdateUserInfo = async (data) => {
        let url = API_URL + '/users/changeMyInfo';


        try {
            let resp = await doApiMethod(url, 'PUT', data);
            console.log(resp.data);
            alert('updated');
        } catch (err) {
            console.log(err);
        }
    };

    const onClickAvatar = () => {
        setPopupAvatar(true);
    };
    const handleCancelPopUpAvatar = () => {
        setPopupAvatar(false);
    };

    const onClickBackground = () => {
        setPopupBackground(true);
    };
    const handleCancelPopUpBackground = () => {
        setPopupBackground(false);
    };

    return (
        <div >
        {/* <div style={{ backgroundImage: `url(${require('../../../images/background.jpg')})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}> */}
            <section className="py-5">
                <div className="container h-100 ">
                    <div className="row d-flex justify-content-center align-items-center h-100 ">
                        <div className="col-lg-12 col-xl-11">
                            <div className="border shadow text-black  bg-white" style={{ borderRadius: '25px', border: 'none' }}>
                                <div
                                    style={{
                                        height: '200px',
                                        borderTopLeftRadius: '25px',
                                        position: 'relative',
                                        borderTopRightRadius: '25px',
                                        backgroundImage: `url(${userInfo.user.background_image})`,
                                        backgroundPosition: 'center',
                                        backgroundSize: 'cover',
                                        backgroundRepeat: 'no-repeat',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <div
                                        onClick={onClickAvatar}
                                        style={{
                                            cursor: 'pointer',
                                            height: '150px',
                                            border: '8px solid white',
                                            width: '150px',
                                            borderRadius: '100px',
                                            backgroundImage: `url(${userInfo.user.profile_image})`,
                                            backgroundPosition: 'center',
                                            backgroundSize: 'cover',
                                            backgroundRepeat: 'no-repeat',
                                            position: 'absolute',
                                            right: '75px',
                                            bottom: '-65px',
                                        }}
                                    />
                                    <i
                                        onClick={onClickBackground}
                                        style={{ background: 'white', cursor: 'pointer', padding: '12px', borderRadius: '50%', position: 'absolute', left: '10px', bottom: '10px' }}
                                        className="fa fa-pencil"
                                    ></i>
                                </div>
                                <div className="card-body p-md-5">
                                    <div className="row justify-content-center">
                                        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-md-5" style={{ marginTop: '65px' }}>
                                                עדכון פרופיל
                                            </p>
                                            <form onSubmit={handleSubmit(onSub)} className="mx-1 mx-md-4">
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fa fa-user fa-lg ms-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <label className="form-label">שם</label>
                                                        <input {...register('name', { minLength: 2, maxLength: 50, required: true })} type="text" className="form-control" />
                                                        {errors.name && <div className="text-danger">* השם צריך להיות בין 2 ל50 תווים</div>}
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fa fa-user fa-lg ms-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <label className="form-label">כינוי</label>
                                                        <input {...register('nick_name', { minLength: 2, maxLength: 50 })} type="text" className="form-control" />
                                                        {errors.nick_name && <div className="text-danger">* השם צריך להיות בין 2 ל50 תווים</div>}
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fa fa-envelope fa-lg ms-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <label className="form-label">אימייל</label>
                                                        <input defaultValue={userInfo.user.email} type="email" className="form-control" disabled />
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fa fa-key fa-lg ms-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <label className="form-label">מין</label>
                                                        <select {...register('gender', { required: true })} className="form-select">
                                                            <option value="male">זכר</option>
                                                            <option value="female">נקבה</option>
                                                            <option value="other">אחר</option>
                                                        </select>
                                                        {errors.gender && <div className="text-danger">* יש לבחור מין</div>}
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fa fa-user fa-lg ms-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <label className="form-label">גיל</label>
                                                        <input {...register('age', { min: 1, max: 120 })} type="number" className="form-control" />
                                                        {errors.age && <div className="text-danger">* הגיל צריך להיות בין 1-120</div>}
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fa fa-user fa-lg ms-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <label className="form-label">מקום מגורים</label>
                                                        <input {...register('district_address', { minLength: 2, maxLength: 100 })} type="text" className="form-control" />
                                                        {errors.district_address && <div className="text-danger">* יש להזין בין 2 ל100 תווים</div>}
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fa fa-user fa-lg ms-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <label className="form-label">קצת עליי</label>
                                                        <textarea {...register('about', { minLength: 2, maxLength: 1000 })} type="text" className="form-control" />
                                                        {errors.about && <div className="text-danger">* יש להזין בין 2 ל1000 תווים</div>}
                                                    </div>
                                                </div>
                                                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                    <button className="btn btn-warning btn-lg">שמור שינויים</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {showPopup && <InfoPopUp show={showPopup} message={textPopUp} onCancel={handleCancelPopUp} />}
                {showPopupAvatar && <EditAvatar show={showPopupAvatar} onCancel={handleCancelPopUpAvatar} />}
                {showPopupBackground && <EditBackground show={showPopupBackground} onCancel={handleCancelPopUpBackground} />}
            </section>
        </div>
    );
};

export default MyInfo;
