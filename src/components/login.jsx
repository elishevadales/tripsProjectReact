import React from 'react'
import { useForm } from 'react-hook-form'
import { API_URL, doApiMethod } from '../services/apiService'

const Login = () => {

  const { register, handleSubmit, formState: { errors }, getValues } = useForm()
  const emailRef = register("email", { required: true })
  const passRef = register("password", { required: true });

  const onSub = (data) => {

    console.log(data)

  }

  return (
    <section className="py-5" style={{ backgroundImage: `url(${require('../images/background.jpg')})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: "center", backgroundAttachment: "fixed" }}>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: '25px' }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-4 mx-1 mx-md-4 mt-4">כניסה</p>

                    <form onSubmit={handleSubmit(onSub)} className="mx-1 mx-md-4">

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fa fa-envelope fa-lg ms-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label className="form-label" htmlFor="form3Example3c">
                            אימייל
                          </label>
                          <input {...emailRef} type="email" id="form3Example3c" className="form-control" />

                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fa fa-lock fa-lg ms-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">

                          <label className="form-label" htmlFor="form3Example4c">
                            סיסמה
                          </label>
                          <input {...passRef} type="password" id="form3Example4c" className="form-control" />
                        </div>
                      </div>

                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4 mt-2">
                        <button className="btn btn-warning btn-lg">
                       כניסה
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
    </section>
  )
}

export default Login