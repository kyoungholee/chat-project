import React from "react";
import addPhoto from "../img/addAvatar.png";

const Login = () => {
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">채팅 프로그램</span>
        <span className="title">Login</span>
        <form>
          <label htmlFor="email"></label>
          <input type="email" id="email" placeholder="이메일을 입력해주세요." />
          <label htmlFor="password"></label>
          <input
            type="password"
            id="password"
            placeholder="비밀번호를 입력해주세요."
          />
          <button> Sign in</button>
        </form>
        <p>회원가입을 하시겠습니까?</p>
      </div>
    </div>
  );
};

export default Login;
