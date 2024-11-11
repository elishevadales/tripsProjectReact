import React, { useState } from "react";
import { API_URL, doApiMethod } from "../../services/apiService";
import { useSelector } from "react-redux";


const LikeButton = (props) => {
  const {  event, setEvent } = props;
  const userInfo = useSelector((myStore) => myStore.userInfoSlice);
  const onClickLikeIcon = async () => {
    await doApiAddLike();
  };

  const doApiAddLike = async () => {
    let url = API_URL + "/events/addOrRemoveLike/" + event._id;

    try {
      let resp = await doApiMethod(url, "PATCH");
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
        color: isLiked ? "red" : "black",
        borderRadius: "100%",
        fontSize: "24px",
        background: "white",
        cursor:"pointer"
      }}
      className={isLiked ? "fa fa-heart p-2 m-2" : "fa fa-heart-o p-2 m-2"}
      aria-hidden="true"
      onClick={(e) => {
        e.stopPropagation(); // Prevent the click event from propagating to the container
        onClickLikeIcon();
      }}
    >
      {event.like_list.length < 1 ? "" : event.like_list.length}
    </i>
  );
};

export default LikeButton;
