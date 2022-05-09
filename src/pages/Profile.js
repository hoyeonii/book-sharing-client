import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form } from "formik";
import UploadImage from "../helpers/UploadImage";
import Liking from "../helpers/Liking";
import "../css/Profile.css";
import { green } from "@material-ui/core/colors";
import ToggleButton from "react-toggle-button";
import Available from "../helpers/Available";
import { AuthContext } from "../helpers/AuthContext";
import { LanguageContext } from "../helpers/LanguageContext";
import ScrollTopBtn from "../helpers/ScrollTopBtn";

import uploadBook from "../Images/uploadBook.png";
import { useTranslation } from "react-i18next";

function Profile() {
  let { id } = useParams(); // 프로필이 보여질 유저의 id
  const [userData, setUserData] = useState("");
  const [userPosts, setUserPosts] = useState([]);
  const [followers, setfollowers] = useState([]);
  const [following, setfollowing] = useState([]);
  const [uploadStatus, setUploadStatus] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [showMyBook, setShowMyBook] = useState(true);
  const [toggle, setToggle] = useState(false);
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [editMode, setEditMode] = useState(false);
  const { authState } = useContext(AuthContext);
  const { language } = useContext(LanguageContext);
  const { t } = useTranslation();

  let navigate = useNavigate();

  useEffect(() => {
    console.log(language);
    // axios.get(`http://localhost:3001/auth/basicinfo/${id}`).then((res) => {

    //   setUserData(res.data);
    //   console.log(res.data);
    // });
    loadUserData();
    // axios.get(`http://localhost:3001/posts/byuserId/${id}`).then((res) => {
    //   setUserPosts(res.data);
    // });
    axios
      .get(`https://anbda.herokuapp.com/follow/byfollowedId/${id}`)
      .then((res) => {
        setfollowers(res.data);
      });
    axios
      .get(`https://anbda.herokuapp.com/follow/byfollowerId/${id}`)
      .then((res) => {
        setfollowing(res.data);
      });

    loadPost();
  }, [id]);

  const loadUserData = () => {
    axios
      .get(`https://anbda.herokuapp.com/auth/basicinfo/${id}`)
      .then((res) => {
        setUserData(res.data);
        setUsername(res.data.name);
        setLocation(res.data.location);
        console.log(res.data);
      });
  };

  const loadPost = () => {
    axios
      .get(`https://anbda.herokuapp.com/posts/byuserId/${id}`)
      .then((res) => {
        setUserPosts(res.data);
      });
    axios
      .get(`https://anbda.herokuapp.com/likes/likedPosts/${id}`)
      .then((res) => {
        setLikedPosts(res.data);
      });
    console.log("loaded");
  };

  const follow = () => {
    axios
      .post(
        "https://anbda.herokuapp.com/follow",
        {
          followed: id,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        if (localStorage.getItem("accessToken") == null) {
          alert(`Log in to leave comment`);
          navigate("/login");
        }

        // if (response.data.error) {
        //   console.log(response.data.error);
        // } else {

        //   const commentToAdd = {
        //     commentBody: response.data.commentBody,
        //     username: response.data.username,
        //     id: response.data.id,
        //   };
        //   setComments([...comments, commentToAdd]);
        //   setNewComment("");
        //   }
      });
  };
  const handleLocationSave = () => {
    console.log(id);
    axios
      .put(
        `https://anbda.herokuapp.com/auth/byUserId/${id}`,
        { name: username, location: location },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        // console.log(response.data);
        setLocation("");
        window.location.replace("/");
      })
      .catch((err) => {
        console.log(err);
      });
    alert(`프로필 변경이 완료되었습니다.`);
    loadUserData();
  };

  const handleAvailable = (postId, postAvailable) => {
    console.log(postId);
    axios
      .put(
        `https://anbda.herokuapp.com/posts/byId/${postId}`,
        {
          available: !postAvailable,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        // console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
    alert(`책 대여가능 상태가 바뀌었습니다`);

    loadPost();
    // setToggle(!toggle);
  };
  const handleUsernameSave = () => {
    axios
      .put(
        `https://anbda.herokuapp.com/auth/changeName/${id}`,
        {
          name: username,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {})
      .catch((err) => {
        console.log(err);
      });
    alert(``);
    loadUserData();
  };

  return (
    <div>
      <ScrollTopBtn target={window} />
      <div className="P-info">
        {editMode ? (
          <div className="P-info-username">
            <form
              onSubmit={() => {
                // handleUsernameSave();
                handleLocationSave();

                setEditMode(false);
              }}
            >
              {/* <div className="P-info-input"> */}
              {t("id")}
              <input
                onChange={(e) => {
                  e.preventDefault();
                  setUsername(e.target.value);
                }}
                style={{ marginLeft: "20px" }}
                value={username}
              />
              <br />
              {t("city")}
              <input
                onChange={(e) => {
                  e.preventDefault();
                  setLocation(e.target.value);
                }}
                style={{ marginLeft: "10px", marginTop: "10px" }}
                value={location}
              />
              {/* </div> */}
              {/* <div className="P-info-savebtn"> */}
              <button className="P-info-savebtn">save</button>
              {/* </div> */}
            </form>
          </div>
        ) : (
          <div className="P-info-username">
            <h3>
              <strong>{username}</strong>
            </h3>
            <div className="P-info-location">
              <i
                class="fa-solid fa-location-dot"
                style={{ color: "var(--main-stress)", paddingRight: "5px" }}
              ></i>
              {/* {"location : "} */}
              {location ? location : "-"}
            </div>
          </div>
        )}

        <div className="P-info-right">
          {authState.id === Number(id) ? (
            !editMode && (
              <button
                onClick={() => {
                  setEditMode(true);
                }}
              >
                edit
              </button>
            )
          ) : (
            <button
              onClick={() => {
                authState.id
                  ? navigate(`/message/${id}`)
                  : alert("로그인 해주세요");
              }}
            >
              <i
                class="fa-regular fa-envelope"
                style={{ paddingRight: "5px" }}
              ></i>
              {t("message")}
            </button>
          )}
        </div>
      </div>
      {/* <button onClick={follow}>Follow</button> */}
      {/* <div>followed by.... {followers.length} ppl</div>
      <div>id: {followers.map((el) => el.follower).join(", ")}</div>
      <div>following.... {following.length}</div>
      <div>id: {following.map((el) => el.followed).join(", ")}</div>
      <div>--------------------</div>
      {toggle ? "true" : "false"} */}
      <div className="P-buttons">
        <div
          onClick={() => {
            setShowMyBook(true);
          }}
          style={{
            fontWeight: "600",
            borderBottom: `5px solid ${
              showMyBook ? "var(--main-stress)" : "transparent"
            }`,
          }}
        >
          {t("mybook")}
        </div>
        <div
          onClick={() => {
            setShowMyBook(false);
          }}
          style={{
            fontWeight: "600",
            borderBottom: `5px solid ${
              !showMyBook ? "var(--main-stress)" : "transparent"
            }`,
          }}
        >
          {t("liked")}
        </div>
      </div>
      {showMyBook && userPosts ? (
        <div>
          <div className="P-books">
            {authState.id == id && (
              <div
                className="P-book"
                style={{
                  justifyContent: "center",
                  // backgroundColor: "var(--yellow-light)",
                }}
                onClick={() => {
                  navigate(`/createPost`);
                }}
              >
                <img
                  src={uploadBook}
                  alt="사진추가"
                  style={{ width: "150px", height: "150px" }}
                />
                <strong>{t("Upload")}</strong>
                <div style={{ fontSize: "13px" }}>{t("MUpload")}</div>
              </div>
            )}

            {userPosts.map((post, i) => (
              <div key={i} className="P-book" style={{ cursor: "default" }}>
                <div className="P-book-detail">
                  <div className="P-book-img">
                    <img
                      src={post.image}
                      alt="img"
                      style={{ height: "100%" }}
                    />
                  </div>
                  <div style={{ fontWeight: "600", padding: "5px 0px" }}>
                    {post.title}
                  </div>
                  <div style={{ fontSize: "13px", padding: "5px 0px" }}>
                    {post.author}
                  </div>
                </div>
                <div>
                  <Available available={post.available} />
                  {authState.id == id && (
                    <ToggleButton
                      value={post.available}
                      onToggle={(e) => {
                        handleAvailable(post.id, post.available);
                        setToggle(!toggle);
                      }}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="P-books">
          {likedPosts &&
            likedPosts.map((post) => (
              <div className="P-book">
                <div
                  className="P-book-detail"
                  onClick={() => {
                    navigate(`/post/${post.Post.id}`);
                  }}
                >
                  <div className="P-book-img">
                    <img
                      src={post.Post.image}
                      alt="img"
                      style={{ height: "100%" }}
                    />
                  </div>
                  <div style={{ fontWeight: "600", padding: "5px 0px" }}>
                    {post.Post.title}
                  </div>
                  <div style={{ fontSize: "13px", padding: "5px 0px" }}>
                    {post.Post.author}
                  </div>
                </div>

                <Available available={post.Post.available} />
                {/* {post.available == 0 ? "true" : "false"}
                  <Liking postId={post.Post.id} />
                  <button
                    onClick={() => {
                      console.log(likedPosts);
                    }}
                  >
                    likedpost
                  </button> */}
              </div>
            ))}
          {/* <button
            onClick={() => {
              console.log(likedPosts);
            }}
          >
            likedpost
          </button> */}
        </div>
      )}
    </div>
  );
}

export default Profile;
