import { createContext, useContext, useReducer } from "react";
import { AuthContext } from "./AuthContext";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const INITIAL_STATE = {
    chatId: "null",
    user: {},
  };

  //                state는 현재값
  const chatReducer = (state, action) => {
    //action에 값을 추가
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatId:
            currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid,
        };

      default:
        return state;
    }
  };

  //state는 현재값을 말한다.                                reducer 값과 , 초기값
  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  //react에 useState와 비슷한 역할을 한다.
  //여기서 state chatReducer에서 변할떄마다 값이 들어감

  console.log("state", state);
  console.log("dispatch", dispatch);

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
