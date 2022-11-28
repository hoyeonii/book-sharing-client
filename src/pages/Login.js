import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import "../css/Login.css";
import { ToastContainer, toast } from "react-toastify";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState } = useContext(AuthContext);
  let navigate = useNavigate();

  function login() {
    const data = { username: username, password: password };
    const defaultData = { ...data, level: "-", field: "-" };
    axios
      .post("https://anbda.herokuapp.com/auth/login", defaultData)
      .then((res) => {
        if (res.data.error) {
          toast(res.data.error);
        } else {
          localStorage.setItem("accessToken", res.data.token); //로그인하면 F12 Application SessionStorage에 key, value 값으로 저장

          setAuthState({
            username: res.data.username,
            id: res.data.id,
            status: true,
          });
        }
      })
      .then(navigate(`/`));
  }
  return (
    <div className="login">
      <h1>Log in</h1>
      {/* <div>User name : </div> */}
      <form onSubmit={login} className="L-form">
        <input
          type="text"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          placeholder="User Name"
        ></input>
        {/* <div>Password : </div> */}
        <input
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Password"
        ></input>
        <button>Login</button>
      </form>
    </div>
  );
}

export default Login;
