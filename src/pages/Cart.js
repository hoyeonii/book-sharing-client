import React, { useContext } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { deleteCart, deleteAll } from "../helpers/actions";
import { AuthContext } from "../helpers/AuthContext";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";

function Cart() {
  const { authState } = useContext(AuthContext);
  const cartArr = useSelector((state) => state);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  console.log(cartArr);

  const sendMessage = () => {
    console.log("yss");
    let date = new Date();
    date = date.setHours(date.getHours() + 2);
    cartArr.forEach((el) =>
      axios
        .post(
          "https://anbda.herokuapp.com/message",
          {
            send: authState.id,
            receive: el.UserId,
            text: `안녕하세요 ${el.Post.title}에 관심있어요 저랑 책 바꾸실래요?`,
            read: false,
            createdAt: date,
          },
          {
            headers: { accessToken: localStorage.getItem("accessToken") },
          }
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err))
    );
    toast("Message Successfully sent!");
  };

  return (
    <div>
      <h3>{t("cart")}</h3>
      <span>{t("cartTip")}</span>
      {cartArr.map((el) => (
        <div className="CP-result">
          <div className="CP-result-img-container">
            <img className="CP-result-img" src={el.Post.image} alt="no image" />
          </div>
          <div className="CP-result-info">
            <div className="CP-result-info-title">{el.Post.title}</div>
            <br />
            {t("by")} : {el.Post.author}
            <br />
            {t("publisher")} : {el.Post.publisher}
            <br />
            ISBN : {el.Post.isbn}
          </div>
          <button
            className="CP-result-deleteBtn"
            onClick={() => {
              dispatch(deleteCart(el));
            }}
          >
            X
          </button>
        </div>
      ))}
      {cartArr.length > 0 && (
        <button
          onClick={() => {
            dispatch(deleteAll());
          }}
        >
          Clear
        </button>
      )}
      <button onClick={sendMessage}>Send Message to All</button>
    </div>
  );
}

export default Cart;
