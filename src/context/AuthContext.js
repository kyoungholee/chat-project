import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext();

//props를 이용해 children으로 데이터를 받아옴
export const AuthContextProvider = ({ children }) => {
  console.log("AuthContext의 chilren", children);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      //로그인한 회원에 정보를 currentUser에 담아줌
      setCurrentUser(user);
      console.log(user);
    });

    return () => {
      unsub();
    };
  }, []);

  //AuthContext.Provider 자체를 return해서 그 안에 currentUser 값을 {children}으로 넣어줌
  return (
    //value에는 전달하고자 하는 데이터를 넣어줌
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
