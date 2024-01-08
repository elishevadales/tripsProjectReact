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
    },[]);

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
                    className="fa fa-star fa-2x ps-1"
                    style={{ color: 'yellow' }}
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
                    className="fa fa-star-o fa-2x ps-1"
                    style={{ color: 'yellow' }}
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
            stars.push(<i key={i} className="fa fa-star fa-2x ps-1" style={{ color: 'yellow' }} />);
        }

        for (let i = 0; i < blackStars; i++) {
            stars.push(<i key={i + yellowStars} className="fa fa-star-o fa-2x ps-1" style={{ color: 'yellow' }} />);
        }

        return stars;
    };
    return (
        <div className='border my-2 p-2 bg-white' style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
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
                            src={review?.user_id?.profile_image}
                            alt={review?.user_id?.nick_name}
                            style={{ width: '80px', height: '80px', borderRadius: '50%', boxShadow: '0 4px 8px rgba(137,137,137,0.75)' }}
                        />
                    </IonCol>
                    {!onEdit && <IonCol size="9">{review?.comment}</IonCol>}
                    {onEdit && (
                        <IonCol size="9">
                            <textarea
                                style={{ width: '250px', height: '80px' }}
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