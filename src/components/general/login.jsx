import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { API_URL, TOKEN_NAME, doApiGet, doApiMethod } from '../../services/apiService'
import { Link, useNavigate } from 'react-router-dom'
import InfoPopUp from './infoPopUp'
import { useDispatch } from 'react-redux'
import { updateUserInfo } from '../reducer/userInfoSlice'
import { MDBInput } from "mdbreact";

const Login = () => {

  const [showPopup, setPopup] = useState(false);
  const [textPopUp, setTextPopUp] = useState();
  const dispatch = useDispatch();

  const handleCancelPopUp = () => {
    setPopup(false)
  }

  const { register, handleSubmit, formState: { errors }, getValues } = useForm()
  const nav = useNavigate();


  const emailRef = register("email", { required: true })
  const passRef = register("password", { required: true });

  const onSub = async (data) => {

    await doApiLogin(data);
    await doApiMyInfo();

  }

  const doApiLogin = async (bodyData) => {
    let url = API_URL + "/users/login"
    try {
      let resp = await doApiMethod(url, "POST", bodyData);
      console.log(resp.data)

      //delete old token from localStorage
      localStorage.removeItem(TOKEN_NAME);
      //save new token in localStorage
      localStorage.setItem(TOKEN_NAME, resp.data.token);

      if (resp.data.role == "user") {
        nav("/user/events")
      } else if (resp.data.role == "admin") {
        nav("/admin/events")
      }

    }
    catch (err) {

      console.log(err);
      if (err.response?.data?.code == 1 || err.response?.data?.code == 2) {
        setTextPopUp("המייל או הסיסמה שגויים")
        setPopup(true)
      }
      else if (err.response?.data?.code == 3) {
        setTextPopUp("החשבון שלך חסום. פנה למנהל האתר")
        setPopup(true)
      }
      else if (err.response?.data?.code == 5) {
        setTextPopUp("עליך לאשר את החשבון במייל")
        setPopup(true)
      }
      else {
        setTextPopUp("היתה בעיה להיכנס למערכת. נסו שוב מאוחר יותר")
        setPopup(true)
      }
    }
  }


  const doApiMyInfo = async () => {

    let url = API_URL + "/users/myInfo";

    try {
      let resp = await doApiGet(url);
      console.log(resp.data)

      dispatch(updateUserInfo({
        update: resp.data
      }))
    }

    catch (err) {
      console.log(err);
    }
  }




  return (
    <section className="py-5" style={{ backdropFilter: "blur(20px)" }} >
      <div className='background-login'></div>
      <div className="container h-100 my-5 py-5 ">
        <div className='row pt-5 justify-content-center'>
          {/* <div className='col-12 col-md-5' style={{ backgroundImage: `url(${require('../../images/group2.jpg')})`, backgroundSize: 'cover', backgroundPosition: 'right', backgroundRepeat: 'no-repeat' }}></div> */}
          <div className='col-12 col-md-7 m-0 p-0 py-5 bg-white' style={{ boxShadow: "-4px 7px 13px -2px rgba(0,0,0,0.75)" }}>
            <div className="text-black px-5" >
              <div className="m-0 p-5">
                <p className="text-center h1 fw-bold">כניסה</p>
                <form onSubmit={handleSubmit(onSub)} className="">
                  <div className="d-flex flex-row align-items-center mb-4">
                    <div className="form-outline flex-fill mb-0">
                      <label className="form-label font-weight-bold" htmlFor="form3Example3c">
                        אימייל
                      </label>
                      <input {...emailRef} type="email" id="form3Example3c" className="form-control p-2" />
                    </div>
                  </div>
                  <div className="d-flex flex-row align-items-center mb-4">
                    <div className="form-outline flex-fill mb-0">
                      <label className="form-label font-weight-bold" htmlFor="form3Example4c">
                        סיסמה
                      </label>
                      <input {...passRef} type="password" id="form3Example4c" className="form-control p-2" />
                    </div>
                  </div>
                  <div className="d-flex justify-content-center flex-column text-center mx-4 mb-3 mb-lg-4 mt-2">
                    <button className="btn  btn-lg text-white mt-4" style={{ borderRadius: 0, background: "#5C7D84", boxShadow: "9px 9px 55px -12px rgba(0,0,0,0.75)" }}>
                      כניסה
                    </button>
                    
                    <p className='mt-4'>עדיין אין לך חשבון? <Link to="/signUp">לחץ כאן</Link></p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11"></div>
        </div>
      </div>
      {showPopup && (
        <InfoPopUp
          show={showPopup}
          message={textPopUp}
          onCancel={handleCancelPopUp}
        />
      )}
    </section>
  )
}

export default Login