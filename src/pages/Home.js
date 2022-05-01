import React from "react";
import axios from "axios";
import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import CategorySlider from "../helpers/CategorySlider";
import Liking from "../helpers/Liking";
import "../css/Home.css";
import home from "../helpers/home2.jpg";
import { AuthContext } from "../helpers/AuthContext";
import { initReactI18next, useTranslation } from "react-i18next";

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
            src="https://image.yes24.com/goods/30149037/XL"
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
          <h5>그럴 때 있지 않아요?</h5>
          <h1 className="H-text1">한국책 읽고 싶을 때</h1>

          <h1 className="H-text2">종이질감 그리울 때</h1>
          <h1 className="H-text3">국제배송 부담스러울 때</h1>
          <button>{t("signin")}</button>
        </div>
      </section>
      <section className="H-about">
        <div>
          <h1 className="H-about-header">About</h1>
          <div className="H-about-text">
            아나바다는 독일 내에서 <strong>한국어책을 교환</strong>할 수 있는
            공간입니다. <br />
            ‘내가 읽고 싶은 책, 독일에 한 권 쯤은 있지 않을까?’라는 생각으로
            시작되었습니다. <br />
            읽고 싶은 책을 내 책과 바꿔 읽어보세요
          </div>
        </div>
        <div className="H-about2">
          <h1 className="H-about-header">Why</h1>
          <div className="H-about-why">
            <div className="H-about-text">
              직거래 하면<strong> 무료</strong>
              <br />
              {/* <a href={`/profile/${authState.id}`}> 거주도시 등록하기</a>
              <br /> */}
              or
              <br />
              왕복 택배비 <strong>4유로</strong>
              <br />
              <a href="https://www.deutschepost.de/de/w/buecherundwarensendung.html">
                Deutschepost 기준
              </a>
            </div>
            <div className="H-about-vs">vs </div>
            <div className="H-about-text">
              한 번 읽을 <strong>책값</strong>
              <br />+<br />
              <strong>해외배송비</strong> <br />
              <a href="https://www.kyobobook.co.kr/order/DhlContents.jsp#">
                교보문고 기준
              </a>
            </div>
          </div>
        </div>
        <div>
          <h1 className="H-about-header">How</h1>
          <div className="H-about-text">
            1. 내가 소장하고 있는 책을 <strong>등록</strong>해주세요 <br />
            2. <strong>책 구경하기</strong>에서 읽고 싶은 책을 찾아보세요 <br />
            3. 책 주인에게 <strong>메시지</strong>를 보내서 책을 바꿔
            읽어보세요!
          </div>
        </div>
      </section>

      {/* <img
        src="https://cdn.kbmaeil.com/news/photo/202006/849934_862504_4741.jpg"
        alt="종이질감"
        style={{ opacity: "0.7" }}
      ></img> */}
      {/* <img
        src="https://assets.interparcel.com/blog/headers/common-shipping-problems.jpg"
        alt="국제배송"
        style={{ opacity: "0.7" }}
      ></img> */}
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
