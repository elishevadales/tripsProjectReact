import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon, IonImg, IonHeader, IonToolbar, IonContent } from '@ionic/react';
import { IonCol, IonGrid, IonRow } from '@ionic/react';
import React, { useState, useEffect } from 'react';

const MyReview = ({ index, review, removeReviews, editReview }) => {

    const [onEdit, setOnEdit] = useState(false);
    const [editedComment, setEditedComment] = useState(review.comment);
    const [hoveredStars, setHoveredStars] = useState(review.rate);
    const [stars, setStars] = useState(review.rate);

    useEffect(() => {
        //setOnEdit(onEditProp)
    });

    const edit = () => {
        editReview(index, { ...review, comment: editedComment, rate: stars })
        setOnEdit(false)
    }

    const renderStarsOnEdit = () => {
        const stars = [];
        const yellowStars = hoveredStars || review.rate;
        const blackStars = 5 - yellowStars;

        for (let i = 0; i < yellowStars; i++) {
            stars.push(
                <i
                    key={i}
                    className="fa fa-star fa-2x ps-1"
                    style={{ color: 'yellow' }}
                    onMouseEnter={() => setHoveredStars(i + 1)}
                    onMouseLeave={() => setHoveredStars(0)}
                    onClick={() => handleStarClick(i + 1)}
                />
            );
        }

        for (let i = 0; i < blackStars; i++) {
            stars.push(
                <i
                    key={i + yellowStars}
                    className="fa fa-star-o fa-2x ps-1"
                    style={{ color: 'yellow' }}
                    onMouseEnter={() => setHoveredStars(yellowStars + i + 1)}
                    onMouseLeave={() => setHoveredStars(0)}
                    onClick={() => handleStarClick(yellowStars + i + 1)}
                />
            );
        }

        return stars;
    };

    const handleStarClick = (clickedStars) => {
        console.log(clickedStars)
        setHoveredStars(clickedStars);
        setStars(clickedStars)
        //  setOnEdit(false);
        // setEditedComment(review.comment);
        // Update the review rate in your state or wherever it's stored
        // For example, you can call editReview(index, { ...review, rate: clickedStars });
    };


    const renderStars = () => {
        const stars = [];
        const yellowStars = review.rate > 0 ? review.rate : 0;
        const blackStars = 5 - yellowStars;

        for (let i = 0; i < yellowStars; i++) {
            stars.push(<i key={i} className="fa fa-star fa-2x ps-1" style={{ color: 'yellow' }} />);
        }

        for (let i = 0; i < blackStars; i++) {
            stars.push(<i key={i + yellowStars} className="fa fa-star-o fa-2x ps-1" style={{ color: 'yellow' }} />);
        }

        return stars;
    };
    return (
        <div className='border my-2 p-2' style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', width: '400px' }}>
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
                        <i className="fa  fa-pencil fa-2x"></i>
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
                        <i className="fa  fa-check fa-2x"></i>
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
                        <i className="fa  fa-trash fa-2x"></i>
                    </button>
                    </IonCol>

                </IonRow>
                <IonRow>
                    <IonCol size="3">
                        <img
                            src={review?.profile_image}
                            alt={review?.nick_name}
                            style={{ width: '80px', height: '80px', borderRadius: '50%' , boxShadow: '0 4px 8px rgba(137,137,137,0.75)'}}
                        />
                    </IonCol>
                    {!onEdit && <IonCol size="9">{review?.comment}</IonCol>}
                    {onEdit && (
                        <IonCol size="9">
                            <textarea style={{ width: '250px', height: '80px' }}
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