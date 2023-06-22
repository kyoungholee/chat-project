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
      //신규회원을 만들기 위한 함수
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

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

            //메세지 내역들을 userChats이라는 db에 저장하기 위해 빈공간을 만듬
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
          <label htmlFor="name"></label>
          <input
            required
            type="text"
            id="name"
            placeholder="이름을 입력해주세요."
            name="name"
          />

          <label htmlFor="email"></label>
          <input
            required
            type="email"
            id="email"
            placeholder="이메일을 입력해주세요."
            name="email"
          />
          <label htmlFor="password"></label>
          <input
            required
            type="password"
            id="password"
            placeholder="비밀번호를 입력해주세요."
            name="password"
          />
          <label htmlFor="file">
            <img src={Add} alt="이미지 업로드" />
            <span>프로필 추가하기</span>
          </label>
          <input required type="file" id="file" />

          <button disabled={loading}>Sign up</button>
          {loading && <span>잠시만 기달려 주세요.</span>}
          {err && <span>잘못 된 정보입니다.</span>}
        </form>
        <p>
          이미 가입을 하셨나요? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
