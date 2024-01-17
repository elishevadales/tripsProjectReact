import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { API_URL, TOKEN_NAME, doApiMethod } from '../../services/apiService'
import { Link,useNavigate } from 'react-router-dom'
import InfoPopUp from './infoPopUp'

const SignUp = () => {

  const [showPopup, setPopup] = useState(false);
  const [textPopUp, setTextPopUp] = useState();
  const { register, handleSubmit, formState: { errors }, getValues } = useForm()
  const nav = useNavigate()

  const onSub = (data) => {
    delete data.passwordAgain;
    console.log(data)
    doApiSignUp(data)

  }

  const handleCancelPopUp = () => {
    setPopup(false)
    nav("/login")
  }

  const doApiSignUp = async (bodyData) => {
    let url = API_URL + "/users"
    try {
      let resp = await doApiMethod(url, "POST", bodyData);
      console.log(resp)

      nav("/confirmRegistration")
      // setTextPopUp("החשבון נוצר בהצלחה")
      // setPopup(true)

      delete bodyData.gender;
      delete bodyData.name;


    }
    catch (err) {
      if (err.response.data.code == 11000) {
        setTextPopUp("קיים כבר משתמש עם המייל הזה")
        setPopup(true)
      }
      console.log(err.response);
    }
  }



  const nameRef = register("name", { required: true, minLength: 2, maxLength: 50 })
  const emailRef = register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })
  const passRef = register("password", { required: true, minLength: 6, maxLength: 50 });
  
  const passAgainRef = register("passwordAgain", {
    required: true, validate: (val) => {
      return val == getValues("password")
    }
  });
  const genderRef = register("gender", { required: true })
  // const ageRef = register("age", { required: true , min:1, max:120})

  return (


    <section className="py-4" style={{ backdropFilter: "blur(20px)" }}>
      <div className='background-signup'></div>
      <div className="container h-100 my-5 py-5 ">
        <div className='row pt-5'>
          <div className='col-12 col-md-5' style={{ backgroundImage: `url(${require('../../images/kids.jpg')})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}></div>
          <div className='col-12 col-md-7 m-0  p-5 bg-white py-3' style={{ boxShadow: "-4px 7px 13px -2px rgba(0,0,0,0.75)" }}>

            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">רישום</p>

            <form onSubmit={handleSubmit(onSub)} className="mx-1 mx-md-4">
              <div className="d-flex flex-row align-items-center mb-4">
                <div className="form-outline flex-fill mb-0">
                  <label className="form-label" htmlFor="form3Example1c">
                    שם
                  </label>
                  <input {...nameRef} type="text" id="form3Example1c" className="form-control p-2" />
                  {errors.name && <div className='text-danger'>* השם צריך להיות בין 2 ל50 תווים</div>}


                </div>
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <div className="form-outline flex-fill mb-0">
                  <label className="form-label" htmlFor="form3Example3c">
                    אימייל
                  </label>
                  <input {...emailRef} type="email" id="form3Example3c" className="form-control  p-2" />
                  {errors.email && <div className='text-danger'>* יש להכניס אימייל תקין</div>}


                </div>
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <div className="form-outline flex-fill mb-0">

                  <label className="form-label" htmlFor="form3Example4c">
                    סיסמה
                  </label>
                  <input {...passRef} type="password" id="form3Example4c" className="form-control  p-2" />
                  {errors.password && <div className='text-danger'>* יש להכניס סיסמה תקינה</div>}

                </div>
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <div className="form-outline flex-fill mb-0">

                  <label className="form-label" htmlFor="form3Example4cd">
                    סיסמה שוב
                  </label>
                  <input {...passAgainRef} type="password" id="form3Example4cd" className="form-control  p-2" />
                  {errors.passwordAgain && <div className='text-danger'>* סיסמאות לא תואמות</div>}

                </div>
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <div className="form-outline flex-fill mb-0">

                  <label className="form-label" htmlFor="form3Example4cd">
                    מין                          </label>
                  <select {...genderRef} className='form-select'>
                    <option value="" defaultValue>בחר</option>
                    <option value="male">זכר</option>
                    <option value="female">נקבה</option>
                    <option value="other">אחר</option>
                  </select>
                  {errors.gender && <div className='text-danger'>* יש לבחור מין</div>}
                </div>
              </div>
              <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
              <p className='mt-4'> יש לך כבר חשבון? <Link to="/login">לחץ כאן</Link></p>
                <button className="btn  btn-lg text-white mt-4" style={{ borderRadius: '3px', background: "#077F7A", boxShadow: "9px 9px 55px -12px rgba(0,0,0,0.75)"}}>
                  רשום אותי
                </button>
              </div>
            </form>

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
    </section>
  )
}

export default SignUp