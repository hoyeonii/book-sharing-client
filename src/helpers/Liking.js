import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";
import { ToastContainer, toast } from "react-toastify";

function Liking({ postId, alreadyLiked }) {
  const [liked, setLiked] = useState(alreadyLiked);
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    checkIfLiked();
  }, [postId]);

  function checkIfLiked() {
    axios.get("https://anbda.herokuapp.com/likes").then((res) => {
      let likedExist = res.data.find(
        (like) => like.PostId === postId && like.UserId === authState.id
      );
      setLiked(likedExist);
    });
  }

  function likeAPost(postId) {
    authState
      ? axios
          .post(
            "https://anbda.herokuapp.com/likes",
            { PostId: postId },
            { headers: { accessToken: localStorage.getItem("accessToken") } }
          )
          .then((res) => {
            setLiked(res.data.liked);
            // setListOfPosts(
            //   listOfPosts.map((post) => {
            //     if (post.id === postId) {
            //       if (res.data.liked) {
            //         return { ...post, Likes: [...post.Likes, 1] };
            //       } else {
            //         let sumLikes = post.Likes;
            //         sumLikes.pop();
            //         return { ...post, Likes: sumLikes };
            //       }
            //     } else {
            //       return post;
            //     }
            //   })
            // );
          })
      : toast("로그인 해주세요");
  }
  return (
    <button
      className="likingButton"
      onClick={(e) => {
        e.stopPropagation();
        authState.id ? likeAPost(postId) : toast("로그인 해주세요");
      }}
    >
      <i
        style={{
          color: `${liked && liked ? "red" : "black"}`,
          cursor: "pointer",
        }}
        class={`fa-${liked && liked ? "solid" : "regular"} fa-heart`}
      ></i>
    </button>
  );
}

export default Liking;
