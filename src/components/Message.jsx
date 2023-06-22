import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContest";

export default function Message({ message }) {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const curDate = message.date.toDate();
  const hours = ("0" + curDate.getHours()).slice(-2);
  const minutes = ("0" + curDate.getMinutes()).slice(-2);
  const seconds = ("0" + curDate.getSeconds()).slice(-2);

  const dateString = hours + ":" + minutes + ":" + seconds;
  const ref = useRef();

  // props로 받은 message를 useRef를 이용해 다시 렌더링 되지 않고 자연스럽게 스크롤를 움직일 수 있음.
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      <div className="messageInfo">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt="프로필 사진"
        />
        <span className="current_time">{dateString}</span>
      </div>
      <div className="messageContext">
        <p className="current_message">{message.text}</p>
        {message.img && (
          <img src={message.img} alt="" width={"220px"} height={"200px"} />
        )}
      </div>
    </div>
  );
}
