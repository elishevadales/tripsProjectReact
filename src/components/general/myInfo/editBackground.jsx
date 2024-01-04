
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { storage } from '../../../firebase/config';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { API_URL, doApiMethod } from '../../../services/apiService';
import { useDispatch } from 'react-redux'
import { updateBackgroundImg } from '../../reducer/userInfoSlice'
import { useSelector } from 'react-redux'
import ConfirmPopUp from '../confirmPopUp';
import { defaultBackground } from '../../../constants/imagesUrls';


const EditBackground = ({ show, onCancel }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [textDeletePopup, setTextDeletePopup] = useState();
    const [previewURL, setPreviewURL] = useState(null);
    const [image, setImage] = useState(null);
    const imgRef = register("background", { required: true })
    const dispatch = useDispatch();
    const userInfo = useSelector((myStore) =>
        myStore.userInfoSlice
    )

    const onSub = async () => {
        try {

            //save new image in firebase
            const storageRef = ref(storage, `backgrounds/${userInfo.user._id}`);
            await uploadBytes(storageRef, image);
            const imageURL = await getDownloadURL(storageRef);

            // save the new url in mongo
            doApiUpdateMyInfo(imageURL);

            //update redux with the new image
            dispatch(updateBackgroundImg({
                background_image: imageURL
            }));


            console.log(imageURL);
            onCancel();

        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };


    // save the new url in mongo
    const doApiUpdateMyInfo = async (imageURL) => {
        const data = { background_image: imageURL }
        let url = API_URL + "/users/changeMyInfo";

        try {
            let resp = await doApiMethod(url, "PUT", data);
            console.log(resp.data)
        }

        catch (err) {
            console.log(err);
        }
    }

    const handleImageChange = (e) => {
        console.log(e.target.files[0])
        const selectedImage = e.target.files[0];
        setImage(selectedImage);

        // Show preview of the selected image
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewURL(reader.result);
        };
        reader.readAsDataURL(selectedImage);
    };


    const handleDeleteBackground = () => {
        setTextDeletePopup(`האם אתה בטוח שברצונך למחוק את תמונת האווירה שלך?`)
        setShowDeletePopup(true)
    }

    const handleConfirmDelete = async() => {
        setShowDeletePopup(false)
        
        // save the new url in mongo
        await doApiUpdateMyInfo(defaultBackground);

        //update redux with the new image
        dispatch(updateBackgroundImg({
            background_image: defaultBackground
        }));


        console.log(defaultBackground);
        onCancel();
    }


    const handleCancelDelete = () => {
        setShowDeletePopup(false)

    }

    return (
        <Modal show={show} onHide={onCancel} backdrop="static" keyboard={false} centered>
            <Modal.Body className='text-center'>
                <form onSubmit={handleSubmit(onSub)} className='d-flex text-center justify-content-center flex-column p-3'>


                    {!previewURL && (
                        <div className='d-flex justify-content-center'>
                            <div
                                className="placeholder-image"
                                style={{
                                    width: '100%',
                                    height: '150px',
                                    
                                    backgroundImage: `url(${userInfo.user.background_image})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            ></div>
                        </div>
                    )}

                    {previewURL && (

                        <div className='d-flex justify-content-center'>
                            <div
                                className="placeholder-image"
                                style={{
                                    width: '150px',
                                    height: '150px',
                                    borderRadius: '50%',
                                    backgroundImage: `url(${previewURL})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            ></div>
                        </div>

                    )}

                    <label htmlFor={"file-input"} style={{ cursor: 'pointer' }}>שנה תמונה <i className="fa fa-pencil" aria-hidden="true"></i>
                        <input
                            id='file-input'
                            className='d-none'
                            type="file"
                            accept="image/*"
                            {...imgRef}
                            onChange={handleImageChange}
                        />
                    </label>
                    {errors.background && <p className='text-danger'>בחר תמונה</p>}

                    <div className="buttons row justify-content-center mt-4">

                        <button type='button' className="btn btn-secondary col-sm-3 m-2" onClick={onCancel}>
                            סגור
                        </button>
                        <button type='button' className="btn btn-danger col-sm-3 m-2" onClick={handleDeleteBackground}>
                            הסר תמונה
                        </button>
                        <button type="submit" className="btn btn-warning col-sm-3 m-2">
                            עדכן תמונה
                        </button>
                    </div>
                </form>
                {showDeletePopup && (
                    <ConfirmPopUp
                        show={showDeletePopup}
                        message={textDeletePopup}
                        onConfirm={handleConfirmDelete}
                        onCancel={handleCancelDelete}
                    />
                )}
            </Modal.Body>
        </Modal>
    );
}

export default EditBackground