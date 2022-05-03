import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";

function Liking({ postId, alreadyLiked }) {
  const [liked, setLiked] = useState(alreadyLiked);
  const { authState } = useContext(AuthContext);
  useEffect(() => {
    let isMounted = true;
    axios.get("https://anbda.herokuapp.com/likes").then((res) => {
      let likedExist = res.data.find(
        (like) => like.PostId === postId && like.UserId === authState.id
      );
      if (isMounted) setLiked(likedExist);
    });
    return () => {
      isMounted = false;
    };
  }, [postId]);

  const likeAPost = (postId) => {
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
      : alert("로그인 해주세요");
  };
  return (
    <button
      className="likingButton"
      onClick={(e) => {
        e.stopPropagation();
        authState.id ? likeAPost(postId) : alert("로그인 해주세요");
        // ()=>{로 안덮어주고 } likeAPost(val.id만 썼을때는 클릭하지 않아도 function이 계속 trigger 됐음. 왤까)
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
