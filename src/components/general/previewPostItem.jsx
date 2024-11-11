import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

//material UI
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import LikeButton from "./likeButton";

const PreviewPostItem = (props) => {
  const userInfo = useSelector((myStore) => myStore.userInfoSlice);
  const imageInLeft = props.imageInLeft;
  const [event, setEvent] = useState(props.event);
  const nav = useNavigate();

  const onClickNickName = () => {
    localStorage.setItem("userProfileId", event.user_id._id);
    nav(`/${userInfo.user.role}/profile`);
  };

  const onClickCard = () => {
    nav(`/${userInfo.user.role}/events/eventCard`, {
      state: {
        event: event,
      },
    });

    localStorage.setItem("eventId", event._id);
  };

  return (

    <div className="col-md-6 p-0">
      <div
        className=" border shadow d-flex m-3 p-0 row"
        style={{ height: "300px" }}
      >

        {/* event image */}
        <div
          onClick={onClickCard}
          className="image col-12 col-sm-6 p-0"
          style={{
            order: imageInLeft ? 1 : 2,
            cursor: "pointer",
            position:"relative",
            height: "300px",
            overflow: "hidden",
          }}
        >
          <img
            src={
              event.images.length > 0
                ? event.images[0]
                : "https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            }
            loading="lazy"
            alt="trip image"
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
          />

          {/* like icon */}
          <div className="position-absolute start-0 bottom-0">
                      <LikeButton event={event} setEvent={setEvent}/>

          </div>
          
        </div>
        


        {/* event info */}
        <div
          className="text col-12 col-sm-6 p-4"
          style={{
            order: imageInLeft ? 2 : 1,
            background: "#BBE4E2",
            position: "relative",
          }}
        >
          <Box
            className="mb-3"
            sx={{
              color: "grey",
              display: "flex",
              gap: 1.5,
              mt: "auto",
              alignItems: "center",
            }}
          >
            <Avatar
              variant="soft"
              color="neutral"
              src={
                event.user_id.profile_image
                  ? event.user_id.profile_image
                  : "https://firebasestorage.googleapis.com/v0/b/tripsproject-de869.appspot.com/o/avatars%2FdefaultAvatar.png?alt=media&token=c9b52448-9c6e-4d7a-9743-5b5115767781"
              }
            />
            <div>
              <Typography level="body-xs">
                {event.date_created && typeof event.date_created === "string"
                  ? event.date_created.split("T")[0]
                  : "N/A"}
              </Typography>
              <Typography
                level="body-sm"
                onClick={onClickNickName}
                style={{
                  textDecoration: "underline",
                  transition: "blue 0.3s ease",
                  cursor: "pointer",
                }}
                className="hover-underline"
              >
                {event?.user_id?.nick_name}
              </Typography>
            </div>
          </Box>

          <p className="h5" onClick={onClickCard} style={{ cursor: "pointer" }}>
            {event.event_name}
          </p>
          <p className="h6">{event.category == "trip" ? "טיול" : "אטרקציה"}</p>
          <p className="lead">{event.participants.length} משתתפים</p>
          <p className="lead" style={{ fontSize: "14px" }}>
            תאריך יציאה:{" "}
            {event.date_and_time && typeof event.date_and_time === "string"
              ? event.date_and_time.split("T")[0]
              : "N/A"}
          </p>
          {event.open_event && (
            <div
              className="bg-success text-white text-center lead py-1"
              style={{ position: "absolute", bottom: 0, right: 0, left: 0 }}
            >
              אירוע פתוח
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviewPostItem;
