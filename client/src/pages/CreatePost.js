import React, { useEffect, useState, useContext } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/CreatePost.css";
import { AuthContext } from "../helpers/AuthContext";
import Loading from "../helpers/Loading";
import { initReactI18next, useTranslation } from "react-i18next";

function CreatePost() {
  const [search, setSearch] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [isbn, setIsbn] = useState("");
  const [genres, setGenres] = useState("소설");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState("notyet");
  const { authState } = useContext(AuthContext);
  const { t } = useTranslation();

  let navigate = useNavigate();

  const handleSearch = () => {
    // axios
    //   // .get("http://localhost:3002/search/book?query=" + search)
    //   .get("https://anbda.herokuapp.com/search/book?query=" + search)
    //   .then((res) => {
    //     setLoading(false);

    //     setResult(res.data.items);
    //   });

    // "https://openapi.naver.com/v1/search/book?query="
    // "proxy": "https://openapi.naver.com",
    axios
      .get("/api" + "/v1/search/book.json", {
        params: { query: search, display: 10 },
        headers: {
          Accept: "*/*",
          "X-Naver-Client-Id": "sp1QymlZx1vxvhn8kJNE",
          "X-Naver-Client-Secret": "Gxigs4hqIk",
        },
      })
      .then((res) => {
        // 실제 API를 요청한다/
        setLoading(false);

        setResult(res.data.items);
        console.log(res);
      });
  };

  const onSubmit = (data) => {
    axios
      .post(
        "https://anbda.herokuapp.com/posts",
        {
          title: title,
          description: description,
          author: author,
          publisher: publisher,
          isbn: isbn,
          available: true,
          genres: genres,
          image: image,
        },
        {
          headers: { accessToken: localStorage.getItem("accessToken") },
        }
      )
      .then((response) => {
        navigate(`/book`);
        console.log(response);
      });
  };

  return (
    <div className="createPostPage">
      {!title && (
        <div style={{ minHeight: "50vh" }}>
          <h2 style={{ marginBottom: "3px" }}>1. {t("step1")}</h2>
          {t("Mstep1")}
          <form
            className="CP-search"
            onSubmit={(e) => {
              e.preventDefault();
              setLoading(true);
              setResult([]);
              handleSearch();
            }}
          >
            <input
              className="CP-searchBar"
              placeholder={t("search")}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <button className="CP-searchBarbtn" type="submit">
              <i
                class="fa-solid fa-magnifying-glass"
                style={{
                  padding: "5px",
                  paddingTop: "7px",
                  color: "var(--main-stress)",
                }}
              ></i>
            </button>
          </form>
          <div className="CP-results">
            {loading === true && <Loading />}
            {/* {result[0].title === "nothing" ? <div>아직 검색 안했을때</div>:<div></div> } */}
            {loading === false && result.length === 0 ? (
              <div className="CP-noresult">
                {t("noresult")}
                <br />
                {t("trywith")}
              </div>
            ) : (
              result.map((item) => {
                return (
                  <div
                    className="CP-result"
                    onClick={() => {
                      setTitle(
                        item.title.replaceAll("<b>", "").replaceAll("</b>", "")
                      );
                      setDescription(
                        item.description
                          .replaceAll("&#x0D;", "")
                          .replaceAll("<b>", "")
                          .replaceAll("</b>", "")
                          .replaceAll("&lt;", "")
                          .replaceAll("&gt;", "")
                      );
                      setAuthor(
                        item.author.replaceAll("<b>", "").replaceAll("</b>", "")
                      );
                      setPublisher(
                        item.publisher
                          .replaceAll("<b>", "")
                          .replaceAll("</b>", "")
                      );
                      setIsbn(
                        item.isbn.replaceAll("<b>", "").replaceAll("</b>", "")
                      );
                      setImage(item.image);
                      window.scrollTo(0, document.body.scrollHeight + 100);
                    }}
                  >
                    {item.image ? (
                      <img
                        className="CP-result-img"
                        src={item.image}
                        alt="no image"
                      />
                    ) : (
                      <Loading />
                    )}
                    <div className="CP-result-info">
                      <div className="CP-result-info-title">
                        {item.title
                          .replaceAll("<b>", "")
                          .replaceAll("</b>", "")}
                      </div>
                      <br />
                      {t("by")} :{" "}
                      {item.author.replaceAll("<b>", "").replaceAll("</b>", "")}
                      <br />
                      {t("publisher")} :{" "}
                      {item.publisher
                        .replaceAll("<b>", "")
                        .replaceAll("</b>", "")}
                      <br />
                      ISBN :{" "}
                      {item.isbn.replaceAll("<b>", "").replaceAll("</b>", "")}
                    </div>
                  </div>
                );
              })
            )}
          </div>
          {/* {result &&
          } */}
        </div>
      )}

      {/* <ErrorMessage name="postText" component="span" /> */}
      {title && (
        <div>
          <h2 style={{ marginBottom: "3px" }}>2. {t("step2")}</h2>
          <br />
          <button
            onClick={() => {
              setTitle("");
              navigate("/createpost");
            }}
          >
            {t("searchAgain")}
          </button>
          <div className="CP-result">
            <img className="CP-result-img" src={image} alt="no image" />
            <div className="CP-result-info">
              <div className="CP-result-info-title">{title}</div>
              <br />
              {t("by")} : {author}
              <br />
              {t("publisher")} : {publisher}
              <br />
              ISBN : {isbn}
            </div>
            <div className="CP-submit">
              <div>
                <label>{t("genres")} : </label>
                <select
                  onChange={(e) => {
                    let filter = "";
                    console.log(e.target.value);
                    switch (e.target.value) {
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
                        filter = e.target.value;
                    }
                    setGenres(filter);
                    console.log(e.target.value);
                  }}
                >
                  <option value="소설">{t("Novel")}</option>
                  <option value="에세이">{t("Essay")}</option>
                  <option value="역사">{t("History")}</option>
                  <option value="아동">{t("Kids")}</option>
                  <option value="기타">{t("Etc.")}</option>
                </select>
              </div>
              <button
                type="submit"
                onClick={() => {
                  authState.id ? onSubmit() : alert("로그인 해주세요");
                }}
              >
                {t("upload")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreatePost;
