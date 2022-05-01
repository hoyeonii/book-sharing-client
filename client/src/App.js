import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home.js";
import CreatePost from "./pages/CreatePost.js";
import Post from "./pages/Post.js";
import Registration from "./pages/Registration.js";
import Login from "./pages/Login.js";
import Book from "./pages/Book.js";
import PageNotFound from "./pages/PageNotFound.js";
import Profile from "./pages/Profile.js";
import Message from "./pages/Message.js";
import Chatroom from "./pages/Chatroom.js";
import CategorySlider from "./helpers/CategorySlider";
import { AuthContext } from "./helpers/AuthContext";
import { LanguageContext } from "./helpers/LanguageContext";
import { useState, useEffect } from "react";
import axios from "axios";
import Search from "./pages/Search";
import i18n from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";
// import { useTranslation }  from "react-i18next";
import { Suspense } from "react";

const translationsEng = {
  books: "Books",
  upload: "Upload",
  message: "Message",
  logout: "Log out",
  mypage: "My account",
  login: "Log in",
  signin: "Sign in",

  //registration
  id: "ID",
  location: "City",
  Mlocation: "In case you want local/in-person pickup",

  //Profile
  id: "ID",
  city: "City",
  mybook: "My book",
  liked: "Liked",
  MUpload: "The more books you have, the more requests you get",
  available: "Available",
  notAvailable: "not Available",

  //post
  publisher: "Publisher",
  genres: "Genres",
  description: "Description",
  alsoHas: "also has..",

  //book
  all: "All",
  novel: "Novel",
  essay: "Essay",
  history: "History",
  kids: "Kids",
  etc: "Etc.",
  onlyAvailable: "Available",

  //upload
  step1: "Search for the book to register",
  search: "Search",
  Mstep1: "",
  noresult: "No results found",
  trywith: "Try with Publishers/writers/ISBN codes",
  by: "by",
  step2: "Select the genre of the book and press `Upload`",
  searchAgain: "Search again",
};
const translationsKor = {
  //Nav
  books: "책 구경하기",
  upload: "책 등록하기",
  message: "메세지",
  logout: "로그아웃",
  mypage: "마이 페이지",
  login: "로그인",
  signin: "가입하기",

  //registration
  id: "닉네임",
  location: "사는 도시",
  Mlocation: "직거래를 원하시면 입력해주세요",

  //Profile
  id: "닉네임",
  city: "지역",
  mybook: "내 책",
  liked: "읽고싶은 책",
  MUpload: "책이 많을수록 교환 가능성이 높아져요!",
  available: "대여가능",
  notAvailable: "대여중",

  //post
  publisher: "출판사",
  genres: "장르",
  description: "소개",
  alsoHas: "님의 다른 책",
  //book
  all: "전체",
  novel: "소설",
  essay: "에세이",
  history: "역사",
  kids: "아동",
  etc: "기타",
  onlyAvailable: "대여가능만",

  //upload
  step1: "등록할 책을 검색 후 선택해주세요",
  search: "검색",

  Mstep1: "검색이 안될 경우 출판사나 글쓴이를 추가로 검색해주세요",
  noresult: "검색결과가 없습니다",
  trywith: "출판사나 글쓴이, ISBN 코드를 이용해보세요",
  by: "글쓴이",
  step2: "선택한 책의 장르를 고른 후 '등록하기' 버튼을 눌러주세요",
  searchAgain: "다시 검색하기",
};
i18n.use(initReactI18next).init({
  resources: {
    eng: { translation: translationsEng },
    kor: { translation: translationsKor },
  },
  lng: "eng",
  fallbackLng: "eng",
  interpolation: { escapeValue: false },
});

function App() {
  const { t } = useTranslation();
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  }); //로그인 상태 처음에는 false
  const [language, setLanguage] = useState("eng");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      axios
        .get("http://localhost:3001/auth/auth", {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((res) => {
          if (res.data.error) {
            setAuthState({ ...authState, status: false }); // authState중에서 status 상태만 바꿈
          } else {
            setAuthState({
              username: res.data.username,
              id: res.data.id,
              status: true,
            });
          }
        });
    }
    // setLanguage();
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: 0, status: false });
  };

  const handleLanguagebtn = (e) => {
    i18n.changeLanguage(e.target.value);
    setLanguage(e.target.value);
  };
  return (
    <Router>
      <Suspense fallback="loading..">
        <div className="App">
          <div
            className="App-sidenavBack"
            style={{
              display: `${sidebarOpen ? "flex" : "none"}`,
            }}
            onClick={() => {
              setSidebarOpen(false);
            }}
          ></div>
          <div
            className="App-sidenav"
            style={{
              display: `${sidebarOpen ? "flex" : "none"}`,
              animation: "movingRight50 0.5s ease-in-out",
            }}
          >
            <div
              className="App-sidenav-content"
              onClick={() => {
                setSidebarOpen(false);
              }}
            >
              <Link
                to="/"
                className="logo"
                style={{ color: "var(--main-stress)" }}
              >
                ANBDA
              </Link>
              <Link to="/book">{t("books")} </Link>
              <Link to="/createpost">{t("upload")}</Link>{" "}
              {!authState.status ? (
                <>
                  <Link to="/login">{t("login")}</Link>
                  <Link to="/registration">{t("signin")}</Link>
                </>
              ) : (
                <>
                  <Link to={`/profile/${authState.id}`}>{t("mypage")}</Link>
                  <Link to={`/message`}>{t("message")}</Link>
                  <a onClick={logout}>{t("logout")}</a>
                </>
              )}
              <select
                onChange={handleLanguagebtn}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <option value="eng">ENG</option>
                <option value="kor">한글</option>
              </select>
            </div>
          </div>
          <AuthContext.Provider value={{ authState, setAuthState }}>
            <LanguageContext.Provider value={{ language }}>
              {/* AuthContext : 앱 전체에서 로그인이 되어있는지 없는지를 항상 확인 가능 */}
              <header>
                <div className="header">
                  <div className="header-l">
                    <Link to="/" className="logo" style={{ display: "block" }}>
                      ANBDA
                    </Link>
                    <Link to="/book">{t("books")} </Link>
                    <Link to="/createpost">{t("upload")}</Link>
                  </div>

                  <div className="header-r">
                    {/* 검색기능 */}
                    {/* <div className="header-r-search">
                  <i
                    class="fa-solid fa-magnifying-glass"
                    style={{ padding: "5px", paddingTop: "7px" }}
                  ></i>
                  <input className="searchBar" placeholder="Search" />
                  </div> */}
                    {!authState.status ? (
                      <>
                        <Link to="/login">{t("login")}</Link>
                        <Link to="/registration">{t("signin")}</Link>
                      </>
                    ) : (
                      <>
                        <Link to={`/profile/${authState.id}`}>
                          {t("mypage")}
                        </Link>
                        <Link to={`/message`}>{t("message")}</Link>
                        <a onClick={logout}>{t("logout")}</a>
                      </>
                    )}
                    <select onChange={handleLanguagebtn}>
                      <option value="eng">ENG</option>
                      <option value="kor">한글</option>
                    </select>
                    <div className="header-burger">
                      <i
                        className="fa-solid fa-bars"
                        onClick={() => {
                          setSidebarOpen(!sidebarOpen);
                        }}
                      ></i>
                    </div>
                  </div>
                </div>
              </header>

              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/createpost" element={<CreatePost />} />
                <Route
                  path="/post/:id"
                  render={() => <Post key={this.props.location.key} />}
                  element={<Post />}
                />
                <Route path="/registration" element={<Registration />} />
                <Route path="/book" element={<Book />} />
                <Route path="/login" element={<Login />} />
                <Route path="/message" element={<Message />} />
                <Route path="/message/:id" element={<Chatroom />} />
                <Route path="/profile/:id" element={<Profile />} />
                {/* <Route path="/book" element={<Search />} /> */}
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </LanguageContext.Provider>
          </AuthContext.Provider>
        </div>
      </Suspense>
    </Router>
  );
}

export default App;
