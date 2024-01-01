

import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { storage } from '../../../firebase/config';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { API_URL, doApiMethod } from '../../../services/apiService';
import { useDispatch } from 'react-redux'
import { updateProfileImg } from '../../reducer/userInfoSlice'
import { useSelector } from 'react-redux'

const EditAvatar = ({ show, onCancel }) => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [previewURL, setPreviewURL] = useState(null);
    const [image, setImage] = useState(null);  
    const imgRef = register("avatar", { required: true })
    const dispatch = useDispatch();
    const userInfo = useSelector((myStore) =>
        myStore.userInfoSlice
    )

    const onSub = async (data) => {
        try {

            console.log(data.avatar[0]);
            const image = data.avatar[0];
            const storageRef = ref(storage, `avatars/${image.name}`);
            await uploadBytes(storageRef, image);
            const imageURL = await getDownloadURL(storageRef);

            //delete old image from firebase
            const oldImageRef = ref(storage, userInfo.user.profile_image);
            await deleteObject(oldImageRef);

            // Do something with the imageURL, for example, save it in the database
            doApiUpdateMyInfo(imageURL);

            dispatch(updateProfileImg({
                profile_image: imageURL
            }));


            console.log(imageURL);
            onCancel();

        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

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
        const selectedImage = e.target.files[0];
        setImage(selectedImage);

        // Show preview of the selected image
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewURL(reader.result);
        };
        reader.readAsDataURL(selectedImage);
    };

    return (
        <Modal show={show} onHide={onCancel} backdrop="static" keyboard={false} centered>
            <Modal.Body className='text-center'>
                <form onSubmit={handleSubmit(onSub)}>
                    <input type="file" accept="image/*" {...imgRef} onChange={handleImageChange}/>
                    {errors.avatar && <p className='text-danger'>Please select an image</p>}

                    {!previewURL && (
                  <div
                    className="placeholder-image"
                    style={{
                      width: '150px',
                      height: '150px',
                      borderRadius: '50%',
                      backgroundImage: `url(${userInfo.user.profile_image})`,
                      backgroundSize: 'cover',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginBottom: '20px',
                    }}
                  ></div>
                )}

                    {previewURL && (
                        <img
                            id="image-preview"
                            alt="Preview"
                            src={previewURL}
                            style={{ maxWidth: '100%', maxHeight: '200px', margin: '10px 0' }}
                        />
                    )}
                    <br></br>

                    <button type='button' className="btn btn-secondary col-3" onClick={onCancel}>
                        סגור
                    </button>
                    <button type="submit" className="btn btn-warning col-3">
                        עדכן תמונה
                    </button>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default EditAvatar;
