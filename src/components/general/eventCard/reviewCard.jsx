import React from 'react';
import { IonCol, IonGrid, IonRow } from '@ionic/react';

const ReviewCard = ({ review }) => {
  const renderStars = () => {
    const stars = [];
    const yellowStars = review?.rate > 0 ? review?.rate : 0;
    const blackStars = 5 - yellowStars;

    for (let i = 0; i < yellowStars; i++) {
      stars.push(<i key={i} className="fa fa-star fa ps-1" style={{ color: 'yellow', fontSize: "18px" }} />);
    }

    for (let i = 0; i < blackStars; i++) {
      stars.push(<i key={i + yellowStars} className="fa fa-star-o ps-1" style={{ color: 'yellow', fontSize: "18px" }} />);
    }

    return stars;
  };

  return (
    <div className='border  mb-3 p-2 bg-white' style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <IonGrid>
        <IonRow>
          <IonCol size="10">{renderStars()}</IonCol>
          <IonCol size="2" className='h6'>{review?.user_id?.nick_name}</IonCol>
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
          <IonCol size="9" className='px-2 border'>{review?.comment}</IonCol>
        </IonRow>
      </IonGrid>
    </div>
  );
};

export default ReviewCard;
