import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  //Sign in 클릭시 사용되는 함수
  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      //파이어베이스에서 제공되는 함수로 이메일과 PW가 맞으면 로그인을 시켜줌
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setErr(true);
    }
  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">채팅 프로그램</span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email"></label>
          <input type="email" id="email" placeholder="이메일을 입력해주세요." />
          <label htmlFor="password"></label>
          <input
            type="password"
            id="password"
            placeholder="비밀번호를 입력해주세요."
          />
          <button
            onClick={() => {
              err && alert("잘못된 정보입니다.");
            }}
          >
            Sign in
          </button>
        </form>
        <p>
          회원가입을 하시겠습니까?<Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
