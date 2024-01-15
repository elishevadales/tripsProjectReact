import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { API_URL, TOKEN_NAME, doApiMethod } from '../../../services/apiService'
import { useNavigate } from 'react-router-dom'
import InfoPopUp from '../../general/infoPopUp'
import EventImages from './eventImages'
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '../../../firebase/config';
import { useSelector } from 'react-redux';
import uniqid from 'uniqid';
import { tripsCategories } from '../../../constants/tripsSubcategories'
import { attractionsCategories } from '../../../constants/attractionsSubcategories'
import { Modal } from 'react-bootstrap';
import EventLocation from './eventLocation'


const NewEvent = () => {

  const [showPopup, setPopup] = useState(false);
  const [textPopUp, setTextPopUp] = useState();
  const [isFree, setIsFree] = useState(true);
  const [isRequiredEquipment, setIsRequiredEquipment] = useState(false);
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState();
  const [imagesUrls, setImagesUrls] = useState([]);
  const [isSenddingForm, setIsSenddingForm] = useState(false)
  const [coordinates, setCoordinates] = useState({});
  const [address, setAddress] = useState();
  const userInfo = useSelector((myStore) => myStore.userInfoSlice);
  const { register, handleSubmit, formState: { errors }, getValues, setValue } = useForm()
  const nav = useNavigate()

  const onSub = async (data) => {
    setIsSenddingForm(true)
    const uploadedUrls = await uploadImages(images);
    data.images = uploadedUrls;
    console.log(data);

    data.coordinates = coordinates;
    data.address = address;

    if (!isFree) {
      data.price = {
        adult: data.adult,
        studentOrSoldier: data.studentOrSoldier,
        child: data.child
      }
    }
    else {
      data.price = {
        free: data.free
      }
    }

    if (!data.accessibility) {
      delete data.accessibility
    }
    if (!isRequiredEquipment) {
      data.required_equipment = "none"
    }


    delete data.free
    delete data.adult
    delete data.studentOrSoldier
    delete data.child

    // doApiCreateEvent(data)
    setIsSenddingForm(false)

  }

  const uploadImages = async (images) => {
    const urls = await Promise.all(images.map(async (image) => {
      const storageRef = ref(storage, `eventsImages/${uniqid()}`);
      await uploadBytes(storageRef, image);
      return getDownloadURL(storageRef);
    }));

    setImagesUrls(urls);
    return urls; // Return the URLs to be used in onSub

  }

  const handleChangeCategory = (e) => {
    setCategory(e.target.value)
    // setValue("category", e.target.value)
    setValue("sub_category", "")

  }

  const handleCancelPopUp = () => {
    setPopup(false)
    nav("/user/newEvent")
  }

  const doApiCreateEvent = async (bodyData) => {

  }


  const nameRef = register("event_name", { required: true, minLength: 2, maxLength: 50 })
  const categoryRef = register("category", { required: "יש לבחור קטגוריה" })
  const subCategoryRef = register("sub_category", { minLength: 0, maxLength: 100 })
  const freeRef = register("free", { required: "יש לסמן חינם/בתשלום" })
  const adultPriceRef = register("adult", { min: 0, max: 10000 })
  const studentOrSoldierPriceRef = register("studentOrSoldier", { min: 0, max: 10000 })
  const childPriceRef = register("child", { min: 0, max: 10000 })
  const parkingRef = register("parking", { required: true })
  const accessibilityRef = register("accessibility")
  const openEventRef = register("open_event", { required: true })
  const placeInfoRef = register("place_info", { minLength: 2, maxLength: 500 })
  const tripDetailsRef = register("trip_details", { minLength: 2, maxLength: 1000 })
  const dateRef = register("date_and_time", { required: "יש לבחור תאריך" })
  const coordinatesRef = register("coordinates");
  const duringRef = register(
    "during",
    {
      minLength: { value: 2, message: "יש להזין לפחות 2 תווים" },
      maxLength: { value: 300, message: "יש להזין עד 300 תווים" },
      required: "יש לפרט מה הצפי למשך הטיול"
    }
  )
  const requiredEquipmentRef = register("required_equipment", { minLength: 2, maxLength: 300 })



  return (
    <section className="py-4" >
      <div className='background-signup'></div>
      <div className="container h-100 ">
        <div className='pt-4'>
          <div className='col-12 d-flex align-items-center justify-content-center display-3' style={{ height: "300px", backgroundImage: `url(${require('../../../images/addEvent.jpg')})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
            <p className='p-3 m-2 text-center' style={{ borderRadius: "20px", background: "rgba(255, 255, 255, 0.477)" }}>יצירת אירוע חדש</p>
          </div>
          <div className='col-12 m-0  p-2 p-sm-4 bg-white py-3' style={{ boxShadow: "-4px 7px 13px -2px rgba(0,0,0,0.75)" }}>

            <form onSubmit={handleSubmit(onSub)} className="mx-1 mx-md-4">

              {/* event name */}
              <div className="d-flex flex-row align-items-center mb-4">
                <div className="form-outline flex-fill mb-0">
                  <label className="form-label h5 " htmlFor="form3Example1c">
                    שם האירוע
                    <span className='text-danger'>*</span>

                  </label>
                  <input {...nameRef} type="text" id="form3Example1c" className="form-control p-2" />
                  {errors.event_name && <div className='text-danger'>* השם צריך להיות בין 2 ל50 תווים</div>}
                </div>
              </div>


              {/* category */}
              <div className="d-flex flex-row align-items-center mb-4">
                <div className="form-outline flex-fill mb-0">

                  <label className='h5'
                  >קטגוריה
                    <span className='text-danger'>*</span>
                  </label>

                  <select {...categoryRef} onChange={(handleChangeCategory)} className='form-select' >
                    <option value="" defaultValue>בחר קטגוריה</option>
                    <option value="trip">טיול</option>
                    <option value="attraction">אטרקציה</option>
                  </select>
                  {errors.category && <div className='text-danger'>*{errors.category.message}</div>}
                </div>
              </div>

              {/* sub category */}
              <div>
                <select className='form-select' {...subCategoryRef} disabled={!category}>
                  <option value="" defaultValue>בחר תת קטגוריה (אופציונאלי)</option>
                  {
                    category === "trip" &&
                    tripsCategories.map((category, i) => {
                      return (
                        <option key={i} value={category}>{category}</option>
                      )
                    })
                  }
                  {
                    category === "attraction" &&
                    attractionsCategories.map((category, i) => {
                      return (
                        <option key={i} value={category}>{category}</option>
                      )
                    })

                  }

                </select>
              </div>

              {/* price */}
              <div className="d-flex flex-row align-items-center mb-4">
                <div className="form-outline flex-fill mb-0">
                  <p className="h5 my-3"
                  >עלות כניסה
                    <span className='text-danger'>*</span>
                  </p>
                  <fieldset className="mb-3">
                    <div>
                      <input {...freeRef} onChange={() => { setIsFree(true) }} className="form-check-input" type="radio" id="priceFree" value={true} />
                      <label className="form-check-label mx-2" htmlFor="priceFree">כניסה חינם לכולם</label>
                    </div>
                    <div>
                      <input {...freeRef} onChange={() => { setIsFree(false) }} className="form-check-input" type="radio" id="pricePayment" value={false} />
                      <label className="form-check-label mx-2" htmlFor="pricePayment">כניסה בתשלום</label>
                    </div>
                    {errors.free && <div className='text-danger'>*{errors.free.message}</div>}

                  </fieldset>
                </div>
              </div>

              <div className="d-flex flex-row align-items-center">
                <div style={{ display: isFree ? "none" : "block" }} className="form-outline flex-fill mb-0 border shadow p-3">
                  <div className="prices">
                    <p className="h5 mb-3">מחירי כניסה</p>

                    <label className="form-label" htmlFor="form3Example2c">
                      מחיר למבוגר
                    </label>
                    <input {...adultPriceRef} type="number" id="form3Example2c" className="form-control mb-2" />
                    {errors.adult && <div className='text-danger'>המחיר יכול לנוע בין 0 ל10000</div>}

                    <label className="form-label" htmlFor="form3Example3c">
                      מחיר לחייל או סטודנט
                    </label>
                    <input {...studentOrSoldierPriceRef} type="number" id="form3Example3c" className="form-control mb-2" />
                    {errors.studentOrSoldier && <div className='text-danger'>המחיר יכול לנוע בין 0 ל10000</div>}

                    <label className="form-label" htmlFor="form3Example4c">
                      מחיר לילד
                    </label>
                    <input {...childPriceRef} type="number" id="form3Example4c" className="form-control mb-2" />
                    {errors.child && <div className='text-danger'>המחיר יכול לנוע בין 0 ל10000</div>}
                  </div>
                </div>
              </div>


              {/* images */}
              <p className="h5 mb-3"> תמונות</p>

              <div className="images row mb-4">
                {Array.from({ length: 4 }, (_, index) => (
                  <EventImages key={index + 1} index={index + 1} register={register} setImages={setImages} />

                ))}
              </div>

              {/* parking */}
              <p className="h5 mb-3"
              >חנייה
                <span className='text-danger'>*</span>
              </p>
              <fieldset className="mb-3">
                <div>
                  <input {...parkingRef} className="form-check-input" type="radio" id="parkingFree" value="free" />
                  <label className="form-check-label mx-2" htmlFor="parkingFree">חנייה חינם </label>
                </div>
                <div>
                  <input {...parkingRef} className="form-check-input" type="radio" id="none" value="none" />
                  <label className="form-check-label mx-2" htmlFor="none">אין חנייה במקום </label>
                </div>
                <div>
                  <input {...parkingRef} className="form-check-input" type="radio" id="payment" value="payment" />
                  <label className="form-check-label mx-2" htmlFor="payment"> חנייה בתשלום  </label>
                </div>
                {errors.parking && <div className='text-danger'>*יש לסמן האם יש חנייה</div>}

              </fieldset>



              {/* accessibility */}
              <p className="h5 mb-3"
              >נגישות
              </p>
              <fieldset className="mb-3">
                <div>
                  <input {...accessibilityRef} className="form-check-input" type="radio" id="accessibilityTrue" value={true} />
                  <label className="form-check-label mx-2" htmlFor="accessibilityTrue"> יש נגישות </label>
                </div>
                <div>
                  <input {...accessibilityRef} className="form-check-input" type="radio" id="accessibilityFalse" value={false} />
                  <label className="form-check-label mx-2" htmlFor="accessibilityFalse">אין נגישות </label>
                </div>
              </fieldset>

              {/* open event */}
              <p className="h5 mb-3"
              >האם זהו אירוע פתוח?
                <span className='text-danger'>*</span>

              </p>
              <fieldset className="mb-3">
                <div>
                  <input {...openEventRef} className="form-check-input" type="radio" id="openEventTrue" value={true} />
                  <label className="form-check-label mx-2" htmlFor="openEventTrue"> כן</label>
                </div>
                <div>
                  <input {...openEventRef} className="form-check-input" type="radio" id="openEventFalse" value={false} />
                  <label className="form-check-label mx-2" htmlFor="openEventFalse">לא</label>
                </div>
                {errors.open_event && <div className='text-danger'>*יש לסמן האם האירוע פתוח</div>}

              </fieldset>

              {/* place info */}
              <p className="h5 mb-3"
              > קצת על המקום:
              </p>
              <textarea {...placeInfoRef} className='form-control'>

              </textarea>
              {errors.place_info && <div className='text-danger'> יש למלא בין 2 ל500 תווים*</div>}

              {/* trip details */}
              <p className="h5 my-3"
              > אז מה בתכנית:
              </p>
              <textarea {...tripDetailsRef} className='form-control' />
              {errors.trip_details && <div className='text-danger'> יש למלא בין 2 ל1000 תווים*</div>}

              {/* during */}
              <p className="h5 my-3"
              >  משך זמן האירוע
                <span className='text-danger'>*</span>

              </p>
              <textarea {...duringRef} className='form-control' />
              {errors.during && <div className='text-danger'> *{errors.during.message}</div>}

              {/* date */}
              <p className="h5 my-3"
              > תאריך יציאה
                <span className='text-danger'>*</span>
              </p>
              <input {...dateRef} className='form-control' type='date' />
              {errors.date_and_time && <div className='text-danger'> *{errors.date_and_time.message}</div>}

              {/* required equipment */}
              <p className="h5 my-3"
              > האם יש צורך להביא ציוד מסויים לאירוע?
              </p>
              <fieldset className="mb-3">
                <div>
                  <input onChange={() => { setIsRequiredEquipment(false) }} name="requiredEquipment" className="form-check-input" type="radio" id="requiredEquipmentFalse" />
                  <label className="form-check-label mx-2" htmlFor="requiredEquipmentFalse">לא</label>
                </div>
                <div>
                  <input onChange={() => { setIsRequiredEquipment(true) }} name="requiredEquipment" className="form-check-input" type="radio" id="requiredEquipmentTrue" />
                  <label className="form-check-label mx-2" htmlFor="requiredEquipmentTrue"> כן</label>
                </div>

              </fieldset>

              {isRequiredEquipment &&
                <div>
                  <p className="h6 mb-3"
                  > פירוט הציוד שיש להביא:
                  </p>
                  <textarea {...requiredEquipmentRef} className='form-control'>

                  </textarea>
                </div>
              }

              {/* location */}
              <EventLocation setCoordinates={setCoordinates} setAddress={setAddress} />


              {/* create button */}
              <div className="d-flex justify-content-center mx-4 my-4 mb-lg-4">
                <button type="submit" className="btn btn-lg text-white" style={{background: '#077F7A'}}>
                  צור אירוע
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
      <Modal show={isSenddingForm} backdrop="static" centered>
        <Modal.Body className='text-center'>
          <p>יוצר אירוע...</p>
        </Modal.Body>
      </Modal>
    </section>
  )
}

export default NewEvent