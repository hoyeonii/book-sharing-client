import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import axios from "axios";
import "../css/Message.css";

function Message({ reload, setReload }) {
  let navigate = useNavigate();
  const { authState } = useContext(AuthContext);
  const [chatroom, setChatroom] = useState([]);
  const [userList, setUserList] = useState([]);
  const [chats, setChats] = useState([]);
  let newDate = new Date();
  let today = [
    String(newDate.getFullYear()),
    String(newDate.getMonth() + 1).padStart(2, 0),
    String(newDate.getDate()).padStart(2, 0),
  ].join("-");

  useEffect(() => {
    axios.get(`https://anbda.herokuapp.com/message/${authState.id}`).then((res) => {
      let raw = res.data.map((el) =>
        el.send == authState.id ? el.receive : el.send
      );
      setChatroom([...new Set(raw)]);
      setChats(res.data.sort((a, b) => b.id - a.id));
      // console.log(res.data.sort((a, b) => b.id - a.id));
    });

    axios.get(`https://anbda.herokuapp.com/auth/login`).then((res) => {
      setUserList(res.data);
      // console.log(res.data.sort((a, b) => b.id - a.id));
    });
    console.log(reload);
  }, [reload]);

  // const onclick = () => {
  //   scrollDown();
  // };
  return (
    <div className="Message">
      <h3>Message</h3>

      <div className="M-rooms">
        {chatroom &&
          chatroom.map((el) => (
            <div
              onClick={() => {
                navigate(`/message/${el}`);
                setReload(!reload);
              }}
              className="M-room"
            >
              <strong>
                {userList.find((user) => user.id == el) &&
                  userList.find((user) => user.id == el).name}
              </strong>
              {/* <button
                onClick={() => {
                  console.log(userList.find((user) => user.id == el).username);
                }}
              >
                userList?
              </button> */}
              {chats[0] && (
                <div className="M-rooms-lastchat">
                  {
                    chats.find((chat) => chat.send == el || chat.receive == el)
                      .text
                  }
                </div>
              )}
              {chats[0] && (
                <div className="M-rooms-lastdate">
                  {today !==
                  chats
                    .find((chat) => chat.send == el || chat.receive == el)
                    .createdAt.split("T")[0]
                    ? chats
                        .find((chat) => chat.send == el || chat.receive == el)
                        .createdAt.split("T")[0]
                    : chats
                        .find((chat) => chat.send == el || chat.receive == el)
                        .createdAt.split("T")[1]
                        .slice(0, 5)}
                </div>
              )}
              {/* <button
                onClick={() => {
                  console.log(
                    chats.find((chat) => chat.send == el || chat.receive == el)
                      .text
                  );
                }}
              >
                click me
              </button> */}
            </div>
          ))}
      </div>
    </div>
  );
}

export default Message;
