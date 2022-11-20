import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home.js";
import CreatePost from "./pages/CreatePost.js";
import Post from "./pages/Post.js";
import Registration from "./pages/Registration.js";
import Login from "./pages/Login.js";
import Books from "./pages/Books.js";
import PageNotFound from "./pages/PageNotFound.js";
import Profile from "./pages/Profile.js";
import Message from "./pages/Message.js";
import Cart from "./pages/Cart.js";
import Chatroom from "./pages/Chatroom.js";
import { AuthContext } from "./helpers/AuthContext";
import { LanguageContext } from "./helpers/LanguageContext";
import { useState, useEffect, Suspense } from "react";
import axios from "axios";
import i18n from "i18next";
import { translationsEng, translationsKor } from "./helpers/I18n";
import { initReactI18next, useTranslation } from "react-i18next";
import logo from "./Images/anbda_logo.png";
import { useSelector } from "react-redux";

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
  });
  const [language, setLanguage] = useState("eng");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const cartArr = useSelector((state) => state);

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      axios
        .get("https://anbda.herokuapp.com/auth/auth", {
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
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: 0, status: false });
    // navigate("/profile/1");
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
                <img src={logo} alt="logo" className="header-l-logo" />
              </Link>
              <Link to="/books">{t("books")} </Link>
              <Link to="/createpost">{t("upload")}</Link>{" "}
              {!authState.status ? (
                <>
                  <Link to="/login">{t("login")}</Link>
                  <Link to="/registration">{t("signup")}</Link>
                </>
              ) : (
                <>
                  <Link to={`/profile/${authState.id}`}>{t("mypage")}</Link>
                  <Link to={`/message`}>{t("message")}</Link>
                  <Link to={`/cart`}>{t("cart")}</Link>
                  <Link to="/" onClick={logout}>
                    {t("logout")}
                  </Link>
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
                      <img src={logo} alt="logo" className="header-l-logo" />
                    </Link>
                    <Link to="/books">{t("books")} </Link>
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
                        <Link to="/registration">{t("signup")}</Link>
                      </>
                    ) : (
                      <>
                        <Link to={`/profile/${authState.id}`}>
                          {t("mypage")}
                        </Link>
                        <Link to={`/message`}>{t("message")}</Link>
                        <Link to={`/cart`}>
                          {t("cart")}
                          <div id="cartNum">{cartArr.length}</div>
                        </Link>
                        <Link to="/" onClick={logout}>
                          {t("logout")}
                        </Link>
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
                <Route path="/books" element={<Books />} />
                <Route path="/login" element={<Login />} />
                <Route path="/message" element={<Message />} />
                <Route path="/message/:id" element={<Chatroom />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/profile/:id" element={<Profile />} />
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
