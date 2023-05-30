import React from "react";
import addPhoto from "../img/addAvatar.png";

const Register = () => {
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">채팅 프로그램</span>
        <span className="title">Register</span>
        <form>
          <label htmlFor="id"></label>
          <input type="text" id="id" placeholder="아이디를 입력해주세요." />
          <label htmlFor="email"></label>
          <input type="email" id="email" placeholder="이메일을 입력해주세요." />
          <label htmlFor="password"></label>
          <input
            type="password"
            id="password"
            placeholder="비밀번호를 입력해주세요."
          />
          <input style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <img src={addPhoto} alt="프로필 사진" />
            <span> 프로필 추가하기</span>
          </label>
          <button> Sign Up</button>
        </form>
        <p>바로 로그인을 진행하시겠습니까?</p>
      </div>
    </div>
  );
};

export default Register;
