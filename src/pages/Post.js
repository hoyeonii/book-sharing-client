import React, { useEffect, useState, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";
import { useNavigate } from "react-router-dom";
import "../css/Post.css";
import Liking from "../helpers/Liking";
import Available from "../helpers/Available";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../helpers/Loading";

function Post() {
  let { id } = useParams();
  const [bookId, setBookId] = useState(id);
  const [bookInfo, setBookInfo] = useState({});
  // const [comments, setComments] = useState([]);
  // const [newComment, setNewComment] = useState("");
  const [userPosts, setUserPosts] = useState([]);
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  const { authState } = useContext(AuthContext);
  let navigate = useNavigate();
  const carousel = useRef();

  useEffect(() => {
    let isMounted = true;
    axios
      .get(`https://anbda.herokuapp.com/posts/byId/${bookId}`)
      .then((response) => {
        if (isMounted) setBookInfo(response.data);
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [bookId]);

  useEffect(() => {
    axios
      .get(`https://anbda.herokuapp.com/posts/byuserId/${bookInfo.UserId}`)
      .then((res) => {
        setUserPosts(res.data);
      });

    axios
      .get(`https://anbda.herokuapp.com/auth/basicinfo/${bookInfo.UserId}`)
      .then((res) => {
        setUserName(res.data.name);
      });
  }, [bookInfo]);

  // function addComment() {
  //   axios
  //     .post(
  //       "https://anbda.herokuapp.com/comments",
  //       {
  //         commentBody: newComment,
  //         PostId: id,
  //       },
  //       {
  //         headers: {
  //           accessToken: localStorage.getItem("accessToken"),
  //         },
  //       }
  //     )
  //     .then((response) => {
  //       if (localStorage.getItem("accessToken") == null) {
  //         // alert(`Log in to leave comment`);
  //         toast("Log in to leave comment", { type: "error" });
  //         navigate("/login");
  //       }
  //       console.log(response.data);
  //       console.log("username??");
  //       if (response.data.error) {
  //         console.log(response.data.error);
  //       } else {
  //         const commentToAdd = {
  //           commentBody: response.data.commentBody,
  //           username: response.data.username,
  //           id: response.data.id,
  //         };
  //         setComments([...comments, commentToAdd]);
  //         setNewComment("");
  //       }
  //     });
  // }

  // function deleteComment(id) {
  //   axios
  //     .delete(`https://anbda.herokuapp.com/comments/${id}`, {
  //       headers: { accessToken: localStorage.getItem("accessToken") },
  //     })
  //     .then(() => {
  //       setComments(
  //         comments.filter((val) => {
  //           return val.id != id;
  //         })
  //       );
  //     });
  // }

  function deletePost() {
    axios
      .delete(`https://anbda.herokuapp.com/posts/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        toast("Deleted");
        navigate("/books");
      });
  }

  return (
    <div className="postPage">
      {/* <div className="PP-info-buttons">{bookInfo.available}</div> */}
      {loading && (
        <section className="loading">
          <Loading />
        </section>
      )}
      {!loading && (
        <section className="PP-info">
          <img className="PP-info-img" src={bookInfo.image} alt="no image" />
          <div className="PP-info-detail">
            <div className="PP-info-detail-title">{bookInfo.title}</div>
            <div className="PP-info-detail-author">{bookInfo.author}</div>
            <div className="PP-info-detail-rest">
              <ul className="PP-info-detail-rest-index">
                <li>{t("publisher")}</li>
                <li>ISBN</li>
                <li>{t("genres")}</li>
                {bookInfo.description && <li>{t("description")}</li>}
              </ul>
              <div className="PP-info-detail-rest-text">
                {bookInfo.publisher}
                <br />
                {bookInfo.isbn}
                <br />
                {bookInfo.genres}
                <br />
                {bookInfo.description}
                <br />
              </div>
            </div>
          </div>
          <div className="PP-info-btn">
            <div className="PP-info-user">
              <strong>{userName}</strong>
              {authState.id === bookInfo.UserId ? (
                <div>
                  <button
                    onClick={() => {
                      deletePost();
                    }}
                    style={{
                      cursor: "pointer",
                      width: "60px",
                      alignSelf: "center",
                    }}
                  >
                    Delete
                  </button>
                  <ToastContainer />
                </div>
              ) : (
                <div>
                  <button
                    onClick={() => {
                      navigate(`/profile/${bookInfo.UserId}`);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    view profile
                  </button>
                </div>
              )}
            </div>
            <div className="PP-info-right">
              {bookInfo.id && <Liking postId={bookInfo.id} preliked={true} />}
              <Available available={bookInfo.available} />
            </div>
          </div>
        </section>
      )}

      {/* <div className="addCommentContainer">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addComment();
          }}
        >
          <input
            type="text"
            placeholder="Comment..."
            autoComplete="off"
            value={newComment}
            onChange={(event) => {
              setNewComment(event.target.value);
            }}
          />
          <button type="submit"> Add Comment</button>
        </form>
      </div> */}

      {/* <div className="listOfComments">
        {comments.map((comment, key) => {
          console.log(comment);
          return (
            <div key={key} className="comment">
              {comment.commentBody}
              <label> Username: {comment.username}</label>
              {
                 authState.username === comment.username &&
                <button
                  onClick={() => {
                    deleteComment(comment.id);
                  }}
                >
                  X
                </button>
              }
            </div>
          );
        })}
      </div> */}

      {userPosts.length > 1 && (
        <section className="PP-more">
          <div className="PP-more-header">
            {userName} {t("alsoHas")}
            {/* 한번에 여러권을 교환하면 배송비를 아낄 수 있어요 */}
          </div>
          <div className="PP-more-carousel" ref={carousel}>
            {userPosts
              .filter((post) => post.id !== bookInfo.id)
              .map((post, i) => (
                <div
                  className="PP-more-books"
                  key={i}
                  onClick={() => {
                    navigate(`/post/${post.id}`);
                    setLoading(true);
                    setBookId(post.id);
                  }}
                >
                  <div className="PP-more-books-imgContainer">
                    <img
                      className="PP-more-books-img"
                      src={post.image}
                      alt="img"
                    />
                  </div>
                  <div className="PP-more-books-title">{post.title}</div>
                  <div style={{ fontSize: "13px", padding: "5px 0px" }}>
                    {post.author}
                  </div>
                </div>
              ))}
          </div>
          <button
            className="PP-more-leftbtn"
            onClick={() => {
              carousel.current.scrollBy({
                left: -window.innerWidth + 300,
                behavior: "smooth",
              });
            }}
          >
            <i className="fa-solid fa-angle-left"></i>
          </button>
          <button
            className="PP-more-rightbtn"
            onClick={() => {
              carousel.current.scrollBy({
                left: window.innerWidth - 300,
                behavior: "smooth",
              });
            }}
          >
            <i className="fa-solid fa-angle-right"></i>
          </button>
        </section>
      )}
    </div>
  );
}

export default Post;
