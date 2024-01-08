import React from 'react';
import { IonCol, IonGrid, IonRow } from '@ionic/react';

const ReviewCard = ({ review }) => {
  const renderStars = () => {
    const stars = [];
    const yellowStars = review?.rate > 0 ? review?.rate : 0;
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
    <div className='border my-3 p-2' style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', width: '400px' }}>
      <IonGrid>
        <IonRow>
          <IonCol size="10">{renderStars()}</IonCol>
          <IonCol size="2">{review?.user_id?.nick_name}</IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="3">
            <img
              src={review?.user_id?.profile_image? review?.user_id?.profile_image:"https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp"}
              alt={review?.user_id?.nick_name}
              style={{ width: '80px', height: '80px', borderRadius: '50%' , boxShadow: '0 4px 8px rgba(137,137,137,0.75)'}}
            />
          </IonCol>
          <IonCol size="9">{review?.comment}</IonCol>
        </IonRow>
      </IonGrid>
    </div>
  );
};

export default ReviewCard;
