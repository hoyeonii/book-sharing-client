import React, { useContext } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { deleteCart, deleteAll } from "../helpers/actions";
import { AuthContext } from "../helpers/AuthContext";

function Cart() {
  const { authState } = useContext(AuthContext);
  const cartArr = useSelector((state) => state);
  const dispatch = useDispatch();

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
            // text: `안녕하세요 ${el.Post.title}에 관심있어요 저랑 책 바꾸실래요?`,
            text: "test1",
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
    );
  };

  return (
    <div>
      Cart
      {cartArr.map((el) => (
        <div>
          {el.Post.title}
          <button
            onClick={() => {
              dispatch(deleteCart(el));
            }}
          >
            삭제
          </button>
        </div>
      ))}
      {cartArr.length > 0 && (
        <button
          onClick={() => {
            dispatch(deleteAll());
          }}
        >
          모두 삭제
        </button>
      )}
      <button onClick={sendMessage}>전체 메세지 보내기</button>
    </div>
  );
}

export default Cart;
