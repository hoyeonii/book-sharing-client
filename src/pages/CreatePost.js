import React, { useState, useContext } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/CreatePost.css";
import { AuthContext } from "../helpers/AuthContext";
import Loading from "../helpers/Loading";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";

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

  function handleSearch() {
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
        setLoading(false);
        setResult(res.data.items);
      });
  }

  function onSubmit() {
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
        navigate(`/books`);
        console.log(response);
      });
  }

  function removeTags(text) {
    return text
      .replaceAll("&#x0D;", "")
      .replaceAll("<b>", "")
      .replaceAll("</b>", "")
      .replaceAll("&lt;", "")
      .replaceAll("&gt;", "")
      .replaceAll("^", "/");
  }

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
          {loading === true && (
            <div className="loading">
              <Loading />
            </div>
          )}
          {/* {result[0].title === "nothing" ? <div>아직 검색 안했을때</div>:<div></div> } */}
          <div className="CP-results">
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
                        removeTags(item.title)
                        // .replaceAll("<b>", "").replaceAll("</b>", "")
                      );
                      setDescription(
                        removeTags(item.description)
                        // .replaceAll("&#x0D;", "")
                        // .replaceAll("<b>", "")
                        // .replaceAll("</b>", "")
                        // .replaceAll("&lt;", "")
                        // .replaceAll("&gt;", "")
                      );
                      setAuthor(
                        removeTags(item.author)
                        // .replaceAll("<b>", "").replaceAll("</b>", "")
                      );
                      setPublisher(
                        removeTags(item.publisher)
                        // .replaceAll("<b>", "")
                        // .replaceAll("</b>", "")
                      );
                      setIsbn(
                        removeTags(item.isbn)
                        // .replaceAll("<b>", "").replaceAll("</b>", "")
                      );
                      setImage(item.image);
                      window.scrollTo(0, document.body.scrollHeight + 100);
                    }}
                  >
                    {item.image ? (
                      <div className="CP-result-img-container">
                        <img
                          className="CP-result-img"
                          src={item.image}
                          alt="selectedImg"
                        />
                      </div>
                    ) : (
                      <Loading />
                    )}
                    <div className="CP-result-info">
                      <div className="CP-result-info-title">
                        {
                          removeTags(item.title)
                          // .replaceAll("<b>", "")
                          // .replaceAll("</b>", "")
                        }
                      </div>
                      <br />
                      {item.author && `${t("by")} : ${removeTags(item.author)}`}
                      <br />
                      {t("publisher")} :{" "}
                      {
                        removeTags(item.publisher)
                        // .replaceAll("<b>", "")
                        // .replaceAll("</b>", "")
                      }
                      <br />
                      ISBN :{" "}
                      {
                        removeTags(item.isbn)
                        // .replaceAll("<b>", "").replaceAll("</b>", "")
                      }
                    </div>
                  </div>
                );
              })
            )}
          </div>
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
            <div className="CP-result-img-container">
              <img className="CP-result-img" src={image} alt="no image" />
            </div>
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
                  authState.id ? onSubmit() : toast("로그인 해주세요");
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
