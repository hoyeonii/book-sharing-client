import React from "react";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Liking from "../helpers/Liking";
import "../css/Book.css";
import Available from "../helpers/Available";
import ScrollTopBtn from "../helpers/ScrollTopBtn";
import { initReactI18next, useTranslation } from "react-i18next";

function Home() {
  const [listOfPosts, setListOfPosts] = useState([]);
  const [filter, setFilter] = useState("전체");
  const [onlyAvail, setOnlyAvail] = useState(false);
  const [filteredList, setFilteredList] = useState([]);
  const [genresOpen, setGenresOpen] = useState(false);
  const { t } = useTranslation();
  const target = useRef();

  let navigate = useNavigate();
  useEffect(() => {
    axios.get("http://localhost:3001/posts").then((res) => {
      setListOfPosts(res.data);
      setFilteredList(res.data);
    });
  }, []);

  // 여러 필터를 걸고 싶을때
  useEffect(() => {
    console.log(filter);
    let updatedList = [...listOfPosts];
    if (filter !== "전체") {
      updatedList = updatedList.filter((el) => el.genres === filter);
    }
    if (onlyAvail == true) {
      updatedList = updatedList.filter((el) => el.available == 1);
    }
    console.log(updatedList);
    setFilteredList(updatedList);
    console.log(filteredList);
  }, [filter, onlyAvail]);

  const handleCategorybtn = (val) => {
    let filter = "";
    console.log(val);
    switch (val) {
      case "All":
        filter = "전체";
        break;
      case "Novel":
        filter = "소설";
        break;
      case "Essay":
        filter = "에세이";
        break;
      case "History":
        filter = "역사";
        break;
      case "Kids":
        filter = "아동";
        break;
      case "Etc.":
        filter = "기타";
        break;

      default:
        filter = val;
    }
    console.log(filter);
    setFilter(filter);
  };

  const category = [
    t("all"),
    t("novel"),
    t("essay"),
    t("history"),
    t("kids"),
    t("etc"),
  ];
  return (
    <div className="Books">
      <div className="B-category">
        {category.map((val, i) => {
          return (
            <div
              className="B-category-btn"
              key={i}
              onClick={() => {
                handleCategorybtn(val);
              }}
            >
              {val}
            </div>
          );
        })}
        <div className="B-category-checkbox">
          <input
            onChange={() => {
              setOnlyAvail(!onlyAvail);
            }}
            type="checkbox"
          ></input>
          <label>{t("onlyAvailable")}</label>
        </div>
      </div>
      <div className="B-result" ref={target}>
        <ScrollTopBtn target={target.current} />

        <i
          className="fa-solid fa-bars"
          onClick={() => {
            setGenresOpen(!genresOpen);
          }}
        ></i>
        {filter + ` > ` + filteredList.length + " results"}
        <div
          className="B-category-small"
          style={{ display: `${genresOpen ? "block" : "none"}` }}
        >
          {category.map((val, i) => {
            return (
              <div
                className="B-category-btn"
                key={i}
                onClick={() => {
                  handleCategorybtn(val);
                  setGenresOpen(false);
                }}
              >
                {val}
              </div>
            );
          })}
          <div className="B-category-checkbox">
            <input
              onChange={() => {
                setOnlyAvail(!onlyAvail);
              }}
              type="checkbox"
            ></input>
            <label>{t("onlyAvailable")}</label>
          </div>
        </div>
        {filteredList
          .sort(function (a, b) {
            return b.id - a.id;
          })
          .map((val, key) => {
            return (
              <div style={{ display: `${genresOpen ? "none" : "block"}` }}>
                <div
                  className="CP-result"
                  key={key}
                  onClick={() => {
                    navigate(`/post/${val.id}`);
                  }}
                  // style={{ display: `${genresOpen ? "none" : "inline-block"}` }}
                >
                  <Liking postId={val.id} />
                  <img
                    className="CP-result-img"
                    src={val.image}
                    alt="no image"
                  />
                  <div className="CP-result-info">
                    <Available available={val.available} />
                    <div className="CP-result-info-title">{val.title}</div>
                    <br />
                    글쓴이 : {val.author}
                    <br />
                    출판사 : {val.publisher}
                    <br />
                    ISBN : {val.isbn}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Home;

// //rfce 자동생성

// import React from "react";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import CategorySlider from "../helpers/CategorySlider";
// import Liking from "../helpers/Liking";
// // import ThumbUpAltIcon from '@mate'

// function Portfolio() {
//   const [listOfPosts, setListOfPosts] = useState([]);
//   const [likes, setLikes] = useState([]);
//   let navigate = useNavigate();

//   useEffect(() => {
//     axios.get("http://localhost:3001/posts").then((res) => {
//       setListOfPosts(res.data);
//       console.log(listOfPosts);
//     });

//     axios.get(`http://localhost:3001/likes`).then((res) => {
//       setLikes(res.data);
//       // console.log(likes.filter((el) => el.id == 23).length);
//     });
//   }, []);

//   const likeAPost = (postId) => {
//     axios
//       .post(
//         "http://localhost:3001/likes",
//         { PostId: postId },
//         { headers: { accessToken: localStorage.getItem("accessToken") } }
//       )
//       .then((res) => {
//         setListOfPosts(
//           listOfPosts.map((post) => {
//             if (post.id === postId) {
//               if (res.data.liked) {
//                 return { ...post, Likes: [...post.Likes, 1] };
//               } else {
//                 let sumLikes = post.Likes;
//                 sumLikes.pop();
//                 return { ...post, Likes: sumLikes };
//               }
//             } else {
//               return post;
//             }
//           })
//         );
//       });
//   };

//   return (
//     <div className="Home">
//       <CategorySlider />
//       <div>it should be here</div>

//       {listOfPosts.map((val, key) => {
//         return (
//           <>
//             <div key={key} className="post">
//               <div
//                 onClick={() => {
//                   navigate(`/post/${val.id}`);
//                 }}
//               >
//                 {val.postText}
//                 {val.genres}
//               </div>
//               {/* <span>{val.id}</span> */}

//               {/* <span>{val.id}</span> */}
//               <span>{val.Likes.length}</span>
//               <button
//                 onClick={() => {
//                   likeAPost(val.id); // ()=>{로 안덮어주고 } likeAPost(val.id만 썼을때는 클릭하지 않아도 function이 계속 trigger 됐음. 왤까)
//                   console.log(val);
//                 }}
//               >
//                 like
//               </button>
//               <Liking postId={val.id} />
//             </div>
//           </>
//         );
//       })}
//     </div>
//   );
// }

// export default Portfolio;
