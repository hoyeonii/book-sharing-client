import React from "react";
import axios from "axios";
import { useEffect, useContext, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import CategorySlider from "../helpers/CategorySlider";
import Liking from "../helpers/Liking";
import "../css/Home.css";
import home from "../helpers/home2.jpg";
import how1 from "../Images/how1.png";
import how2 from "../Images/how2.png";
import how3 from "../Images/how3.png";
import { AuthContext } from "../helpers/AuthContext";
import { initReactI18next, useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import logo from "../Images/anbda_logo.png";
import mainPic from "../Images/mainPic.jfif";

function Home() {
  const [listOfPosts, setListOfPosts] = useState([]);
  const { authState } = useContext(AuthContext);
  const { t } = useTranslation();

  let navigate = useNavigate();
  useEffect(() => {
    axios.get("https://anbda.herokuapp.com/posts").then((res) => {
      setListOfPosts(res.data);
      console.log(res);
    });
  }, []);
  const [titleRef1, titleInView1] = useInView({
    triggerOnce: false,
    rootMargin: "100px 0px",
  });
  const [titleRef2, titleInView2] = useInView({
    triggerOnce: false,
    rootMargin: "100px 0px",
  });
  const [titleRef3, titleInView3] = useInView({
    triggerOnce: false,
    rootMargin: "100px 0px",
  });

  return (
    <div className="Home">
      <section className="H-header">
        {/* <img src={home} alt="한국책" style={{ width: "100%" }}></img> */}
        {/* <img
          src="http://openimage.interpark.com/goods_image/2/6/9/7/8033822697s.jpg"
          alt="덕혜옹주"
          style={{ width: "300px" }}
        ></img>
        <img
          src="https://post-phinf.pstatic.net/MjAyMDA3MjZfMjc1/MDAxNTk1Njg5OTMxMzQ5.E_A49lKCa6ot4L4voLdVselUSXHenlFCp1482mGF5NUg.S4K80PVlAH6eWPeuNJMOOkpAmJkosN91teu3ZIXdW7Ig.JPEG/GipNXrCg.jpeg?type=w1200"
          alt="키르케"
          style={{ width: "400px" }}
        ></img> */}
        <div className="H-header-img1">
          <img
            className="H-header-img1-img"
            src={mainPic}
            alt="덕혜옹주"
            // style={{ width: "200px" }}
          ></img>
          <div class="H-header-img1-shadow"></div>
        </div>

        <img
          className="H-header-img2"
          src="https://www.seekpng.com/png/full/342-3422228_experimenting-with-continuous-line-drawings-starting-simple-continuous.png"
          alt="덕혜옹주"
          // style={{ width: "200px" }}
        ></img>
        <img
          className="H-header-img3"
          src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/2ed95b18476195.562ca1a87fa73.png"
          alt="덕혜옹주"
          // style={{ width: "200px" }}
        ></img>
        <div className="H-text">
          <h5> {t(`header1`)}</h5>
          <h1 className="H-text1">{t(`header2`)}</h1>

          <h1 className="H-text2">{t(`header3`)}</h1>
          <h1 className="H-text3">{t(`header4`)}</h1>
          <button>{t("signup")}</button>
        </div>
      </section>
      <section className="H-about">
        <div>
          <h1 className="H-about-header">About</h1>

          <div className="H-about-text">
            {t(`about1`)}
            <br />
            {t(`about2`)}
            <br />
            {t(`about3`)}
            {/* 아나바다는 독일 내에서 <strong>한국어책을 교환</strong>할 수 있는
            공간입니다. <br />
            ‘내가 읽고 싶은 책, 독일에 한 권 쯤은 있지 않을까?’라는 생각으로
            시작되었습니다. <br />
            읽고 싶은 책을 내 책과 바꿔 읽어보세요 */}
          </div>
        </div>
        <div className="H-about2">
          <div className="H-circle H-c1"></div>
          <div className="H-circle H-c2"></div>
          <h1 className="H-about-header">Why</h1>
          <div className="H-about-why">
            <div className="H-about-text">
              {t("whyPickup")}
              <strong> {t("whyFree")}</strong>
              <br />
              {/* <a href={`/profile/${authState.id}`}> 거주도시 등록하기</a>
              <br /> */}
              or
              <br />
              {t("whyShipping")} <strong>{t("why4Euro")}</strong>
              <br />
              <a href="https://www.deutschepost.de/de/w/buecherundwarensendung.html">
                Deutschepost
              </a>
            </div>
            <div className="H-about-vs">vs </div>
            <div className="H-about-text">
              {t("whyOnlyOnce")} <strong>{t("whyBook")}</strong>
              <br />+<br />
              <strong>{t("whyInternational")}</strong> <br />
              <a href="https://www.kyobobook.co.kr/order/DhlContents.jsp#">
                {t("whyGyobo")}
              </a>
            </div>
          </div>
        </div>
        <div>
          <h1 className="H-about-header">How</h1>
          <div className="H-about-text">
            <motion.div
              className="H-about-text1"
              ref={titleRef1}
              animate={{
                scale: titleInView1 ? 1 : 0,
                opacity: titleInView1 ? 1 : 0,
              }}
              transition={{ duration: 0.7 }}
            >
              <span>1</span>
              <img src={how1} alt="how1" style={{ width: "30%" }} />
              <div>
                {/* <span>1</span> */}
                {/* 내가 소장하고 있는 책을 <strong>등록</strong>해주세요 */}
                {t(`how1`)}
              </div>
              <div className="H-circle-left" />
            </motion.div>
            <motion.div
              className="H-about-text1"
              ref={titleRef2}
              animate={{
                scale: titleInView2 ? 1 : 0,
                opacity: titleInView2 ? 1 : 0,
              }}
              transition={{ duration: 0.7 }}
            >
              <span className="H-about-text1-2">2</span>
              <div>
                {/* <strong>책 구경하기</strong>에서 읽고 싶은 책을 찾아보세요 */}
                {t("how2")}
              </div>
              <img src={how2} alt="how2" style={{ width: "32%" }}></img>
              <div className="H-circle-right" />
            </motion.div>
            <motion.div
              className="H-about-text1"
              ref={titleRef3}
              animate={{
                scale: titleInView3 ? 1 : 0,
                opacity: titleInView3 ? 1 : 0,
              }}
              transition={{ duration: 0.7 }}
            >
              <span>3</span>
              <img src={how3} alt="how3" style={{ width: "50%" }} />
              <div>
                {/* 책 주인에게 <strong>메시지</strong>를 보내 책을 바꿔 읽어보세요! */}
                {t("how3")}
              </div>
              <div className="H-circle-left" />
            </motion.div>
          </div>
        </div>
      </section>
      <footer className="H-footer">
        <img src={logo} alt="logo" className="H-footer-logo" />
        <span>©2022 BillyDa</span>
        <span>Contact : billyda@gmail.com</span>
      </footer>
    </div>
  );
}

export default Home;

//  {/* <CategorySlider />
//       {listOfPosts.map((val, key) => {
//         return (
//           <>
//             <div
//               className="CP-result"
//               key={key}
//               onClick={(e) => {
//                 navigate(`/post/${val.id}`);
//               }}
//             >
//               <Liking postId={val.id} />
//               <img className="CP-result-img" src={val.image} alt="no image" />
//               <div className="CP-result-info">
//                 <div className="CP-result-info-title">{val.title}</div>
//                 <br />
//                 글쓴이 : {val.author}
//                 <br />
//                 출판사 : {val.publisher}
//                 <br />
//                 ISBN : {val.isbn}
//               </div>
//             </div>
//           </>
//         );
//       })}/
