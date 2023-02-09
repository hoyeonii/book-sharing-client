import React, { useContext } from "react";
import "../css/Home.css";
import how1 from "../Images/how1.png";
import how2 from "../Images/how2.png";
import how3 from "../Images/how3.png";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import logo from "../Images/anbda_logo.png";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

function Home() {
  const { t } = useTranslation();
  let navigate = useNavigate();
  const { authState } = useContext(AuthContext);

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
        <img
          className="H-header-img1"
          src="https://ouch-cdn2.icons8.com/CltBK7JX-fYQ4v6G4Nsi4Wu8qlLMdcIT0B7BLANHn_8/rs:fit:627:456/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9wbmcvNDg0/L2VmNGY5YzM2LTFh/ZDgtNGYxMi04M2Uz/LWY2OGI5YmQ1OWVh/YS5wbmc.png"
          alt="H-header-img1"
        ></img>
        <div className="H-text">
          <h5> {t(`header1`)}</h5>
          <h1 className="H-text1">{t(`header2`)}</h1>
          <h1 className="H-text2">{t(`header3`)}</h1>
          <h1 className="H-text3">{t(`header4`)}</h1>
          <button
            onClick={() =>
              navigate(authState.status ? "/createpost" : "/registration")
            }
          >
            {authState.status ? t("upload") : t("signup")}
          </button>
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
          </div>
        </div>
        <div className="H-about2">
          {/* <div className="H-circle H-c1"></div>
          <div className="H-circle H-c2"></div> */}
          <h1 className="H-about-header">Why</h1>
          <div className="H-about-why">
            <div className="H-about-text">
              {t("whyPickup")}
              <strong> {t("whyFree")}</strong>
              <br />
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
              <span>01</span>
              <img
                src={how1}
                alt="how1"
                style={{ width: "25%", maxWidth: "250px" }}
              />
              <div>{t(`how1`)}</div>
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
              <span className="H-about-text1-2">02</span>
              <div>{t("how2")}</div>
              <img
                src={how2}
                alt="how2"
                style={{ width: "28%", maxWidth: "280px" }}
              ></img>
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
              <span>03</span>
              <img
                src={how3}
                alt="how3"
                style={{ width: "40%", maxWidth: "400px" }}
              />
              <div>{t("how3")}</div>
              <div className="H-circle-left" />
            </motion.div>
          </div>
        </div>
      </section>
      <footer className="H-footer">
        <img src={logo} alt="logo" className="H-footer-logo" />
        <span>©2023 BillyDa</span>
        <span>Contact : billyda@gmail.com</span>
      </footer>
    </div>
  );
}

export default Home;
