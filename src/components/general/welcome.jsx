import React from "react";
import { useNavigate } from "react-router";
import TimeLine from "./timeLine";

const Welcome = () => {
  const nav = useNavigate();
  const start = () => {
    nav("/login");
  };

  return (
    <>
      <div
        className="d-flex align-items-center"
        style={{
          backgroundImage: `url(${require("../../images/group3.jpg")})`,
          backgroundSize: "cover",
          backgroundPosition: "top",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh", // Use vh unit to represent 95% of the viewport height
        }}
      >
        <div className="pt-5 me-4 d-flex flex-column align-items-center">
          <p className="display-3 text-white text-start pt-5">
            טיול טוב מתחיל כאן
          </p>
          <div
            onClick={start}
            className="btn  text-white px-5 py-3 display-5"
            style={{
              background: "rgb(35, 140, 156)",
              boxShadow: "-4px 7px 13px -2px rgba(0,0,0,0.75)",
              fontWeight: "bold",
            }}
          >
            כניסה
          </div>

          <svg className="arrows mt-5">
            <path className="a1" d="M0 0 L30 32 L60 0"></path>
            <path className="a2" d="M0 20 L30 52 L60 20"></path>
            <path className="a3" d="M0 40 L30 72 L60 40"></path>
          </svg>
        </div>
      </div>
      <TimeLine />
    </>
  );
};

export default Welcome;
