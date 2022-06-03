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
  const [genresOpen, setGenresOpen] = useState(false);
  const { t } = useTranslation();
  const target = useRef();

  let navigate = useNavigate();
  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    let copiedList = [...listOfPosts];
    if (filter !== "전체") {
      copiedList = copiedList.filter((el) => el.genres === filter);
    }
    if (onlyAvail == true) {
      copiedList = copiedList.filter((el) => el.available == 1);
    }
    setListOfPosts(copiedList);
  }, [filter, onlyAvail]);

  let params = {
    pageSize: 1,
    // offset: offset,
  };
  const loadData = () => {
    axios
      .get("https://anbda.herokuapp.com/posts", { params: params })
      .then((res) => {
        setListOfPosts(...listOfPosts, res.data);
        params.offset = res.data.offset;
      });
  };

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
    t("전체"),
    t("소설"),
    t("에세이"),
    t("역사"),
    t("아동"),
    t("기타"),
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
              style={{
                color: `${t(filter) == val ? "var(--main-stress)" : ""}`,
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
        <label>{listOfPosts.length + " results"}</label>
        {/* {filter + ` > ` + listOfPosts.length + " results"} */}
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
                setGenresOpen(false);
              }}
              type="checkbox"
            ></input>
            <label>{t("onlyAvailable")}</label>
          </div>
        </div>
        {listOfPosts
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
                  <div className="CP-result-img-container">
                    <img
                      className="CP-result-img"
                      src={val.image}
                      alt="no image"
                    />
                  </div>
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
