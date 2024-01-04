import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { storage } from '../../../firebase/config';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { API_URL, doApiMethod } from '../../../services/apiService';
import { useDispatch } from 'react-redux'
import { updateProfileImg } from '../../reducer/userInfoSlice'
import { useSelector } from 'react-redux'
import ConfirmPopUp from '../confirmPopUp';
import { defaultAvatar } from '../../../constants/imagesUrls';

const EditAvatar = ({ show, onCancel }) => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [previewURL, setPreviewURL] = useState(null);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [textDeletePopup, setTextDeletePopup] = useState();
    const [image, setImage] = useState(null);
    const imgRef = register("avatar", { required: true })
    const dispatch = useDispatch();
    const userInfo = useSelector((myStore) =>
        myStore.userInfoSlice
    )

    const onSub = async () => {
        try {
            //save new image in firebase
            const storageRef = ref(storage, `avatars/${userInfo.user._id}`);
            await uploadBytes(storageRef, image);
            const imageURL = await getDownloadURL(storageRef);


            // save the new url in mongo
            doApiUpdateMyInfo(imageURL);

            //update redux with the new image
            dispatch(updateProfileImg({
                profile_image: imageURL
            }));


            console.log(imageURL);
            onCancel();

        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };


    // save the new url in mongo
    const doApiUpdateMyInfo = async (imageURL) => {
        const data = { profile_image: imageURL }
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

    const handleDeleteAvatar = () => {
        setTextDeletePopup(`האם אתה בטוח שברצונך למחוק את תמונת הפרופיל שלך?`)
        setShowDeletePopup(true)
    }

    const handleConfirmDelete = async () => {
        setShowDeletePopup(false)

        // save the new url in mongo
        await doApiUpdateMyInfo(defaultAvatar);

        //update redux with the new image
        dispatch(updateProfileImg({
            profile_image: defaultAvatar
        }));


        console.log(defaultAvatar);
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
                                    width: '150px',
                                    height: '150px',
                                    borderRadius: '50%',
                                    backgroundImage: `url(${userInfo.user.profile_image})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                            </div>

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
                    {errors.avatar && <p className='text-danger'>בחר תמונה</p>}

                    <div className="buttons row justify-content-center mt-4">

                        <button type='button' className="btn btn-secondary col-sm-3 m-2" onClick={onCancel}>
                            סגור
                        </button>
                        <button type='button' className="btn btn-danger col-sm-3 m-2" onClick={handleDeleteAvatar}>
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
};

export default EditAvatar;
