import axios from "axios";
import React, { useEffect, useContext, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import { useNavigate } from "react-router-dom";

import "../css/Chatroom.css";
import Message from "./Message";
function Chatroom() {
  let { id } = useParams();
  const { authState } = useContext(AuthContext);
  const [text, setText] = useState("");
  const [message, setMessage] = useState([]);
  const [reload, setReload] = useState(false);
  const [userList, setUserList] = useState([]);

  const chatbox = useRef();
  let dateStamp = "26";
  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://anbda.herokuapp.com/message/${authState.id}`)
      .then((res) => {
        setMessage(res.data);
        scrollDown();
        // console.log(res.data);
      });
    axios.get(`https://anbda.herokuapp.com/auth/login`).then((res) => {
      setUserList(res.data);
      // console.log(res.data.sort((a, b) => b.id - a.id));
    });
  }, [reload]);

  const handleSubmit = () => {
    let date = new Date();
    date = date.setHours(date.getHours() + 2);
    axios
      .post(
        "https://anbda.herokuapp.com/message",
        {
          send: authState.id,
          receive: id,
          text: text,
          read: false,
          createdAt: date,
        },
        {
          headers: { accessToken: localStorage.getItem("accessToken") },
        }
      )
      .then((response) => {
        // navigate(`/book`);
        setReload(!reload);
      });
  };

  const scrollDown = () => {
    chatbox.current.scrollIntoView({ behavior: "smooth" });
  };

  const SortbyDate = ({ createdAt }) => {
    return dateStamp === createdAt ? (
      <div></div>
    ) : (
      <div className="Chat-message-byDate">{createdAt}</div>
    );
  };

  const ShowTimeStamp = (date) => {
    let timeStamp = date.date.split("T");
    dateStamp = timeStamp[0];

    return (
      <div style={{ textAlign: "right", fontSize: "12px" }}>
        {timeStamp[1].slice(0, 5)}
      </div>
    );
  };

  const handleMessageDelete = (messageId) => {
    axios
      .delete(`https://anbda.herokuapp.com/message/${messageId}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        alert("message deleted!");
        // navigate(`/message/${id}`);
        setReload(!reload);
      });
  };

  return (
    <div className="Chatroom">
      <Message setReload={setReload} reload={reload} />
      <div className="Chat">
        <h3>
          Chatroom with{" "}
          {userList.find((user) => user.id == id) &&
            userList.find((user) => user.id == id).name}
          <button
            onClick={() => {
              navigate(
                `/profile/${
                  userList.find((user) => user.id == id) &&
                  userList.find((user) => user.id == id).id
                }`
              );
            }}
            style={{ cursor: "pointer" }}
          >
            view profile
          </button>
        </h3>

        {/* <button
        onClick={() => {
          console.log(message);
        }}
      >
        clike to see message
      </button> */}
        <div className="Chat-messages">
          {message
            .filter((el) => el.send == id || el.receive == id)
            .map((el, i) => (
              <div className="Chat-message">
                <SortbyDate createdAt={el.createdAt.split("T")[0]} />

                <div
                  key={i}
                  className={
                    el.send == authState.id
                      ? "Chat-message-me"
                      : `Chat-message-otherside`
                  }
                >
                  {el.text}

                  <ShowTimeStamp date={el.createdAt} />
                  {el.send == authState.id && (
                    <button
                      className="Chat-message-delete"
                      onClick={() => {
                        handleMessageDelete(el.id);
                      }}
                    >
                      x
                    </button>
                  )}
                </div>
              </div>
            ))}
          <div ref={chatbox} />
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
            setText("");
          }}
        >
          <input
            onChange={(e) => {
              setText(e.target.value);
            }}
            placeholder="Type your message.."
            value={text}
            type="text"
          />
          <button style={{ fontSize: "16px", padding: "5px 20px" }}>
            <i class="fa-regular fa-paper-plane" style={{ color: "white" }}></i>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chatroom;
