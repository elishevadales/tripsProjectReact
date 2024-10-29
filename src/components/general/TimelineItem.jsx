import React from 'react';
import PropTypes from 'prop-types';
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBIcon,
} from "mdb-react-ui-kit";


const TimelineItem = ({ step, index }) => (
  <div className={`timeline-2 ${index % 2 === 0 ? 'left-2' : 'right-2'}`}>
    <MDBCard style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <MDBCardImage
        src={step.image}
        position="top"
        style={{
          height: '300px',
          objectFit: 'cover',
        }}
      />
      <MDBCardBody className="p-4" dir="rtl">
        <h4 className="fw-bold mb-4">{step.title}</h4>
        <p className="text-muted mb-4">
          <MDBIcon far icon="clock" /> {step.stage}
        </p>
        <p className="mb-0">{step.description}</p>
      </MDBCardBody>
    </MDBCard>
  </div>
);

TimelineItem.propTypes = {
  step: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    stage: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default TimelineItem;
