import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon, IonImg, IonHeader, IonToolbar, IonContent } from '@ionic/react';
import { IonCol, IonGrid, IonRow } from '@ionic/react';
import React, { useState, useEffect } from 'react';

const MyReview = ({ index, review, removeReviews, editReview }) => {

    const [onEdit, setOnEdit] = useState(false);
    const [editedComment, setEditedComment] = useState();
    const [hoveredStars, setHoveredStars] = useState();
    const [stars, setStars] = useState();

    useEffect(() => {
        setHoveredStars(review?.rate)
        setStars(review?.rate)
    }, []);

    const edit = () => {
        editReview(index, { ...review, comment: editedComment, rate: stars })
        setOnEdit(false)
    }

    const renderStarsOnEdit = () => {
        const starsArr = [];
        const yellowStars = hoveredStars || stars;
        const blackStars = 5 - yellowStars;

        for (let i = 0; i < yellowStars; i++) {
            starsArr.push(
                <i
                    key={i}
                    className="fa fa-star ps-1"
                    style={{ color: 'yellow', fontSize: "18px" }}
                    onMouseEnter={() => setHoveredStars(i + 1)}
                    onMouseLeave={() => setHoveredStars(0)}
                    onClick={() => handleStarClick(i + 1)}
                />
            );
        }

        for (let i = 0; i < blackStars; i++) {
            starsArr.push(
                <i
                    key={i + yellowStars}
                    className="fa fa-star-o ps-1"
                    style={{ color: 'yellow', fontSize: "18px" }}
                    onMouseEnter={() => setHoveredStars(yellowStars + i + 1)}
                    onMouseLeave={() => setHoveredStars(0)}
                    onClick={() => handleStarClick(yellowStars + i + 1)}
                />
            );
        }

        return starsArr;
    };


    const handleStarClick = (clickedStars) => {
        setHoveredStars(clickedStars);
        setStars(clickedStars)
        // setOnEdit(false);
        // setEditedComment(review?.comment);

    };


    const renderStars = () => {
        const stars = [];
        const yellowStars = review?.rate > 0 ? review?.rate : 1;
        const blackStars = 5 - yellowStars;

        for (let i = 0; i < yellowStars; i++) {
            stars.push(<i key={i} className="fa fa-star ps-1" style={{ color: 'yellow', fontSize: "18px" }} />);
        }

        for (let i = 0; i < blackStars; i++) {
            stars.push(<i key={i + yellowStars} className="fa fa-star-o ps-1" style={{ color: 'yellow', fontSize: "18px" }} />);
        }

        return stars;
    };
    return (
        <div className=' mb-3 bg-white p-2' style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', border:"solid 2px rgb(35, 140, 156)" }}>
            <div className='text-center text-white py-1 lead' style={{background:"rgba(35, 140, 156, 0.745)", borderRadius:"5px"}}>
                הדירוג שלי:
            </div>

            <IonGrid>
                <IonRow>
                    {onEdit && <IonCol size="8">{renderStarsOnEdit()}</IonCol>}
                    {!onEdit && <IonCol size="8">{renderStars()}</IonCol>}
                    {!onEdit && <IonCol size="2"> <button
                        type="button"
                        className="btn  btn-rounded btn-icon pencil"
                        style={{ transition: 'color 0.3s', color: 'black', background: "rgba(0, 0, 0, 0)", borderRadius: '50%' }}
                        onMouseEnter={(e) => (e.target.style.color = 'green')}
                        onMouseLeave={(e) => (e.target.style.color = 'black')}
                        onClick={() => setOnEdit(true)}
                    >
                        <i className="fa fa-pencil" style={{ fontSize: "18px" }}></i>
                    </button>
                    </IonCol>}
                    {onEdit && <IonCol size="2"> <button
                        type="button"
                        className="btn  btn-rounded btn-icon"
                        style={{ transition: 'color 0.3s', color: 'black', background: "rgba(0, 0, 0, 0)", borderRadius: '50%' }}
                        onMouseEnter={(e) => (e.target.style.color = 'blue')}
                        onMouseLeave={(e) => (e.target.style.color = 'black')}
                        onClick={() => edit()}
                    >
                        <i className="fa  fa-check" style={{fontSize:"18px"}}></i>
                    </button>
                    </IonCol>}

                    <IonCol size="1"> <button
                        type="button"
                        className="btn  btn-rounded btn-icon"
                        style={{ transition: 'color 0.3s', color: 'black', background: "rgba(0, 0, 0, 0)", borderRadius: '50%' }}
                        onMouseEnter={(e) => (e.target.style.color = 'red')}
                        onMouseLeave={(e) => (e.target.style.color = 'black')}
                        onClick={() => removeReviews(index)}
                    >
                        <i className="fa  fa-trash" style={{ fontSize: "18px" }}></i>
                    </button>
                    </IonCol>

                </IonRow>
                <IonRow>
                    <IonCol size="3">
                        <div
                            style={{
                                height: '40px',
                                width: '40px',
                                borderRadius: '100px',
                                backgroundImage: `url(${review?.user_id?.profile_image})`,
                                backgroundPosition: 'center',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                                boxShadow: '0 4px 8px rgba(137,137,137,0.75)'
                            }}
                        />
                        
                    </IonCol>
                    {!onEdit && <IonCol  className='px-2 border' size="9">{review?.comment}</IonCol>}
                    {onEdit && (
                        <IonCol size="9">
                            <textarea
                                style={{ width: '100%', height: '80px' }}
                                value={editedComment}
                                onChange={(e) => setEditedComment(e.target.value)}
                                maxLength={300}
                            />
                        </IonCol>
                    )}

                </IonRow>
            </IonGrid>
        </div>
    )
}

export default MyReview