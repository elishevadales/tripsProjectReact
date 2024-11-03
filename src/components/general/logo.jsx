import React from "react";
import { useNavigate } from "react-router";

const Logo = ({ withtext }) => {
  const nav = useNavigate();

  return (
    <div
      className="logo d-flex align-items-end justify-content-center position-relative"
      style={{ cursor: "pointer" }}
    >
      <h2
        className="me-1 mb-0"
        style={{
          color: "rgb(35, 140, 156)",
          fontSize: "32px",
          fontFamily:
            "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
        }}
      >
        ripMates
      </h2>
      <img
        className="mb-1 position-absolute"
        src={`${process.env.PUBLIC_URL}/favicon.ico`}
        alt="Favicon"
        style={{ width: "40px", height: "40px", left: "-28px" }} 
      />
    </div>
  );
};

export default Logo;
