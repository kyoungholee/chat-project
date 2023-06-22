import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const [err, setErr] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassowrd] = useState("");
  const navigate = useNavigate();

  //Sign in 클릭시 사용되는 함수
  const handleSubmit = async (e) => {
    e.preventDefault();

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
        <span className="logo">나랑 대화해 볼래?🤗</span>
        <span className="title">로그인</span>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email"></label>
          <input
            type="email"
            id="email"
            placeholder="이메일을 입력해주세요."
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password"></label>
          <input
            type="password"
            id="password"
            placeholder="비밀번호를 입력해주세요."
            name="password"
            onChange={(e) => setPassowrd(e.target.value)}
          />
          <button>Sign in</button>
          {err && <span>잘못된 정보입니다.</span>}
        </form>
        <p>
          회원가입을 하시겠습니까?<Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
