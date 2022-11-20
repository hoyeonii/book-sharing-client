import React from "react";

function ScrollTopBtn({ target }) {

  const scrolltoTop = (target) => {
    console.log(target);
    target.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };
  
  return (
    <button
      className="scrollTopBtn"
      onClick={() => {
        scrolltoTop(target);
      }}
    >
      <i class="fa-solid fa-angle-up"></i>
    </button>
  );
}

export default ScrollTopBtn;
