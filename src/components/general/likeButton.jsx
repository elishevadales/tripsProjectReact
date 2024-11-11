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
        borderRadius: "30px",
        fontSize: "24px",
        background: "white",
        cursor:"pointer"
      }}
      title="לייקים"
      className={`${isLiked ? "fa fa-heart " : "fa fa-heart-o"} d-flex align-items-center p-2 m-2`}
      aria-hidden="true"
      onClick={(e) => {
        e.stopPropagation(); // Prevent the click event from propagating to the container
        onClickLikeIcon();
      }}
    >
      {
      event.like_list.length < 1 
      ? "" 
      : <span className="lead me-1 text-dark">{event.like_list.length}</span>
      }
    </i>
  );
};

export default LikeButton;
