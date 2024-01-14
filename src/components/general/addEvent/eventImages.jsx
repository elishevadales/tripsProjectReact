import React, { useState } from 'react'
import uniqid from 'uniqid';


const EventImages = (props) => {


    const [previewURL, setPreviewURL] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);


    const handleImageChange = (e) => {

        // update selectedImage
        const newSelectedImage = e.target.files[0];
        newSelectedImage.filename = `file_${props.index}`;
        setSelectedImage(newSelectedImage);

        //update images array
        props.setImages((prevImages) =>
            prevImages.filter((image) => image.filename !== `file_${props.index}`)
        );
        props.setImages((prevImages) => [...prevImages, newSelectedImage]);

        // Show preview of the selected image
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewURL(reader.result);
        };
        reader.readAsDataURL(newSelectedImage);
    };

    const deleteImage = () => {
        if (selectedImage) {
            const filename = selectedImage.filename;
            props.setImages((prevImages) =>
                prevImages.filter((image) => image.filename !== filename)
            );
            setPreviewURL(null);
            setSelectedImage(null);
        }
    }


    return (
        <div key={props.index} className='col-sm-6 col-md-4 col-lg-3'>
            {!previewURL && (
                <div
                    className="placeholder-image border shadow"
                    style={{
                        width: '100%',
                        height: '150px',
                        backgroundImage: `url("https://i0.wp.com/akadem.org.il/wp-content/uploads/2020/01/placeholder.png?ssl=1")`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                ></div>
            )}

            {previewURL && (

                <div
                    className="placeholder-image border shadow"
                    style={{
                        width: '100%',
                        height: '150px',
                        backgroundImage: `url(${previewURL})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                ></div>

            )}
            <div className='d-flex justify-content-between'>
                <label htmlFor={`file-input${props.index}`} style={{ cursor: 'pointer' }}
                >בחר תמונה
                    {props.index}
                    <i className="fa fa-pencil" aria-hidden="true"></i>
                    <input
                        id={`file-input${props.index}`}
                        className='d-none'
                        type="file"
                        accept="image/*"
                        // {...imgRef}
                        onChange={handleImageChange}
                    />
                </label>
                <i onClick={deleteImage} className="fa fa-trash" aria-hidden="true"></i>


            </div>

        </div>
    )
}

export default EventImages