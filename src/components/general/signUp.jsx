import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { API_URL, TOKEN_NAME, doApiMethod } from '../../services/apiService'
import { useNavigate } from 'react-router-dom'
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

      setTextPopUp("החשבון נוצר בהצלחה")
      setPopup(true)

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


    <section className="py-5" style={{ backgroundImage: `url(${require('../../images/background.jpg')})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: "center", backgroundAttachment: "fixed" }}>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: '25px' }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">רישום</p>

                    <form onSubmit={handleSubmit(onSub)} className="mx-1 mx-md-4">
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fa fa-user fa-lg ms-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label className="form-label" htmlFor="form3Example1c">
                            שם
                          </label>
                          <input {...nameRef} type="text" id="form3Example1c" className="form-control" />
                          {errors.name && <div className='text-danger'>* השם צריך להיות בין 2 ל50 תווים</div>}


                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fa fa-envelope fa-lg ms-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label className="form-label" htmlFor="form3Example3c">
                            אימייל
                          </label>
                          <input {...emailRef} type="email" id="form3Example3c" className="form-control" />
                          {errors.email && <div className='text-danger'>* יש להכניס אימייל תקין</div>}


                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fa fa-lock fa-lg ms-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">

                          <label className="form-label" htmlFor="form3Example4c">
                            סיסמה
                          </label>
                          <input {...passRef} type="password" id="form3Example4c" className="form-control" />
                          {errors.password && <div className='text-danger'>* יש להכניס סיסמה תקינה</div>}

                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fa fa-key fa-lg ms-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">

                          <label className="form-label" htmlFor="form3Example4cd">
                            סיסמה שוב
                          </label>
                          <input {...passAgainRef} type="password" id="form3Example4cd" className="form-control" />
                          {errors.passwordAgain && <div className='text-danger'>* סיסמאות לא תואמות</div>}

                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fa fa-key fa-lg ms-3 fa-fw"></i>
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



                      <div className="d-flex mb-5 align-items-center">

                        <input
                          className="ms-2"
                          type="checkbox"
                          value=""
                        />
                        <label>
                          אני מסכים לקבל דיוור במייל
                        </label>

                      </div>

                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button className="btn btn-warning btn-lg">
                          רשום אותי
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                      className="img-fluid"
                      alt="Sample image"
                    />
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
    </section>
  )
}

export default SignUp