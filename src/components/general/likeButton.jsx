
import React, { useState } from "react";
import { useSelector } from "react-redux";

import { API_URL, doApiGet, doApiMethod } from "../../services/apiService";



const LikeButton = (event,setEvent) => {
    const userInfo = useSelector((myStore) => myStore.userInfoSlice);
    const onClickLikeIcon = async () => {
        await doApiAddLike();
      };
      
      const doApiAddLike = async () => {
        let url = API_URL + "/events/addOrRemoveLike/" + event._id;
      
        try {
          let resp = await doApiMethod(url, "PATCH");
          console.log("Updated event data:", resp.data.event);
          console.log("User ID:", userInfo.user._id);
          console.log("Like List:", resp.data.event.like_list);
          setEvent(resp.data.event);
          setIsLiked(resp.data.event.like_list.includes(userInfo.user._id));
        } catch (err) {
          console.log(err);
        }
      };

      const [isLiked, setIsLiked] = useState(
        event.like_list.includes(userInfo.user._id)
      );
  return (
    <i
      style={{
        position: "absolute",
        left: 0,
        bottom: 0,
        color: isLiked ? "red" : "black",
        borderRadius: "100%",
        fontSize: "24px",
        background: "white",
      }}
      className={
        isLiked ? "fa fa-heart p-2 m-2" : "fa fa-heart-o p-2 m-2"
      }
      aria-hidden="true"
      onClick={(e) => {
        e.stopPropagation(); // Prevent the click event from propagating to the container
        onClickLikeIcon();
      }}
    >
      {/* {event.like_list.length < 1 ? "" : event.like_list.length} */}
    </i>
  );
};

export default LikeButton;
