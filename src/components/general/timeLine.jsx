import React, { useEffect, useState } from 'react';
import {
  MDBContainer,
} from "mdb-react-ui-kit";
import TimelineItem from './TimelineItem';

const TimeLine = () => {
  const [scrollY, setScrollY] = useState(0);

  const steps = [
    {
      title: "בוחרים מקום",
      description: "בשלה הראשון בחורים מקום אליו בא לכם לצאת. זה יכול להיות כול מקום, מסעדה, ים, טיפוס הרים או באולינג.",
      stage: "שלב 1",
      image: "https://www.tel-aviv.gov.il/en/PublishingImages/1ab0eca3eb2649c1b9c8473c7bdee591.jpg",
    },
    {
      title: "יוצרים אירוע",
      description: "בשלה זה ממלאים פרטים על האירוע. תאריך, למי מיועד, ציוד שצריך להביא.",
      stage: "שלב 2",
      image: "https://img.etimg.com/thumb/width-640,height-480,imgsize-201359,resizemode-75,msid-65975178/magazines/panache/travel-in-a-clique-be-sane-4-point-guide-to-organise-a-big-group-trip/travellinginagroup.jpg",
    },
    {
      title: "מאשרים משתתפים לאירוע",
      description: "מקבלים התראות לגבי משתמשים שמעוניינים להשתתף באירוע שלכם.",
      stage: "שלב 3",
      image: "https://as2.ftcdn.net/v2/jpg/04/65/61/11/1000_F_465611180_ARFx2XKFApavWZexrLMT3wECt7HdUPcS.jpg",
    },
    {
      title: "יוצאים לטייל!",
      description: "נפגשים כל החברה' החדשים ועושים חיים!",
      stage: "שלב 4",
      image: "https://campmichigan.com/wp-content/uploads/2017/12/group-camping-2.jpg",
    },
    {
      title: "מדרגים",
      description: "כל משתתף יוכל לדרג את החוויה שלו לאחר הטיול או האטרקציה שהתקיימו.",
      stage: "שלב 5",
      image: "https://res-4.cloudinary.com/hipcamp/image/upload/c_limit,h_1200,w_1200/v1/journal/oz1fcaahue5k5imxcgrk",
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className='container-fluid' style={{ background: "#F0F2F5" }}>
      <div className='container'>
        <MDBContainer
          fluid
          className="py-5"
          style={{ backgroundColor: "#F0F2F5" }}
          dir="ltr"
        >
          <div className="main-timeline-2">
            {steps.map((step, index) => (
              <TimelineItem step={step} index={index} key={index} />
            ))}
            <style jsx>{`
              .timeline-2 {
                position: relative;
              }
              .timeline-2::after {
                transform: translateY(${scrollY * 0.18}px) translateY(-50%);
              }
            `}</style>
          </div>
        </MDBContainer>
      </div>
    </div>
  );
};

export default TimeLine;
