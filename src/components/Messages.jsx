import React, { useContext, useEffect, useState } from "react";
import Message from "./Message";
import { ChatContext } from "../context/ChatContest";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  console.log(messages);

  return (
    <div className="messages">
      {messages.map((data) => (
        //Message 컴포넌트에 message라는 props를 전달함
        <Message message={data} key={data.id} />
      ))}
    </div>
  );
}
