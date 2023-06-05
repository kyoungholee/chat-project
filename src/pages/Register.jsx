import React, { useState } from "react";
import Add from "../img/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //회원가입 버튼 클릭 시 함수 실행
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      //Create user 파이어베이스에서 제공해주는 함수 사용
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      //파이어베이스에서 제공해주는 함수
      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //이미지 프로필을 업로드
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //파이에베이스 db안에 users라는 카테고리에 회원들의 정보가 들어감
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          } catch (err) {
            console.log(err);
            setErr(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setErr(true);
      setLoading(false);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">채팅 프로그램</span>
        <span className="title">회원가입</span>
        <form onSubmit={handleSubmit}>
          <input required type="text" placeholder="이름을 입력해주세요." />
          <input required type="email" placeholder="이메일을 입력해주세요." />
          <input
            required
            type="password"
            placeholder="비밀번호를 입력해주세요."
          />
          <label htmlFor="file">
            <img src={Add} alt="이미지 업로드" />
            <span>Add an avatar</span>
          </label>
          <input required style={{ display: "none" }} type="file" id="file" />

          <button disabled={loading}>Sign up</button>
          {loading && "이미지 업로드 중입니다. 잠시만 기다려 주세요...."}
          {err && <span>잘못 된 정보입니다.</span>}
        </form>
        <p>
          You do have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
