import React from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBContainer,
  MDBIcon,
} from "mdb-react-ui-kit";


const TimeLine = () => {
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
            <div className="timeline-2 left-2">
              <MDBCard style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', }}>
                <MDBCardImage
                  src="https://www.tel-aviv.gov.il/en/PublishingImages/1ab0eca3eb2649c1b9c8473c7bdee591.jpg"
                  position="top"
                  style={{
                    height: '300px',
                    objectFit: 'cover',
                  }}
                />
                <MDBCardBody className="p-4" dir="rtl">
                  <h4 className="fw-bold mb-4">בוחרים מקום </h4>
                  <p className="text-muted mb-4">
                    <MDBIcon far icon="clock" /> שלב 1
                  </p>
                  <p className="mb-0">
                    בשלב הראשון בחורים מקום אליו בא לכם לצאת. זה יכול להיות כול מקום, מסעדה ים טיפוס הרים או באולינג
                  </p>
                </MDBCardBody>
              </MDBCard>
            </div>
            <div className="timeline-2 right-2">
              <MDBCard style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', }}>
                <MDBCardImage
                  src="https://img.etimg.com/thumb/width-640,height-480,imgsize-201359,resizemode-75,msid-65975178/magazines/panache/travel-in-a-clique-be-sane-4-point-guide-to-organise-a-big-group-trip/travellinginagroup.jpg"
                  style={{
                    height: '300px',  // Set the desired height
                    objectFit: 'cover',  // Ensure the image covers the specified height
                  }}
                />
                <MDBCardBody className="p-4" dir="rtl">
                  <h4 className="fw-bold mb-4">יוצרים אירוע</h4>
                  <p className="text-muted mb-4">
                    <MDBIcon far icon="clock" /> שלב 2
                  </p>
                  <p className="mb-0">
                    בשלב זה ממלאים פרטים על האירוע. תאריך, למי מיועד, ציוד שצריך להביא
                  </p>
                </MDBCardBody>
              </MDBCard>
            </div>
            <div className="timeline-2 left-2">
              <MDBCard style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', }}>
                <MDBCardImage
                  src="https://as2.ftcdn.net/v2/jpg/04/65/61/11/1000_F_465611180_ARFx2XKFApavWZexrLMT3wECt7HdUPcS.jpg"
                  alt="Responsive image"
                  position="top"
                  style={{
                    height: '300px',  // Set the desired height
                    objectFit: 'cover',  // Ensure the image covers the specified height
                  }}
                />
                <MDBCardBody className="p-4" dir="rtl">
                  <h4 className="fw-bold mb-4">מאשרים משתתפים לאירוע</h4>
                  <p className="text-muted mb-4">
                    <MDBIcon far icon="clock" /> שלב 3
                  </p>
                  <p className="mb-0">
                    מקבלים התראות לגבי משתמשים שמעוניינים להשתתף באירוע שלכם.
                    אתם בוחרים את מי לאשר, או לחילופין מגדירים את האירוע כאירוע-פתוח המאפשר לכל מי שרוצה להשתתף בו
                  </p>
                </MDBCardBody>
              </MDBCard>
            </div>
            <div className="timeline-2 right-2">
              <MDBCard style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', }}>
                <MDBCardImage
                  src="https://campmichigan.com/wp-content/uploads/2017/12/group-camping-2.jpg"
                  alt="Responsive image"
                  position="top"
                  style={{
                    height: '300px',  // Set the desired height
                    objectFit: 'cover',  // Ensure the image covers the specified height
                  }}
                />
                <MDBCardBody className="p-4" dir="rtl">
                  <h4 className="fw-bold mb-4">יוצאים לטייל!</h4>
                  <p className="text-muted mb-4">
                    <MDBIcon far icon="clock" /> שלב 4
                  </p>
                  <p className="mb-0">
                    נפגשים כל החברה' החדשים ועושים חיים!
                  </p>
                </MDBCardBody>
              </MDBCard>
            </div>
            <div className="timeline-2 left-2">
              <MDBCard>
                <MDBCardImage
                  src="https://res-4.cloudinary.com/hipcamp/image/upload/c_limit,h_1200,w_1200/v1/journal/oz1fcaahue5k5imxcgrk"
                  alt="Responsive image"
                  position="center"
                  style={{
                    height: '300px',  // Set the desired height
                    objectFit: 'cover',  // Ensure the image covers the specified height
                  }}
                />
                <MDBCardBody className="p-4">
                  <h4 className="fw-bold mb-4">מדרגים</h4>
                  <p className="text-muted mb-4">
                    <MDBIcon far icon="clock" /> שלב 5
                  </p>
                  <p className="mb-0">
                    כל משתתף יוכל לדרג את החוויה שלו לאחר הטיול או האטרקציה שהתקיימו
                  </p>
                </MDBCardBody>
              </MDBCard>
            </div>
          </div>
        </MDBContainer>
      </div>

    </div>

  )
}

export default TimeLine