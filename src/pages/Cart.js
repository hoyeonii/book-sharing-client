import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteCart, deleteAll } from "../helpers/actions";

function Cart() {
  const cartArr = useSelector((state) => state);
  const dispatch = useDispatch();
  console.log(cartArr);
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
    </div>
  );
}

export default Cart;
