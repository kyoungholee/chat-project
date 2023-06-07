import React from "react";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";

export default function Home() {
  return (
    <div className="home">
      <div className="container">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
}

//추가해야 할것들
/**
 * 1. 메세지 입력시 엔터로 send가 가능하게 해야함
 * 2. 메세지 보냈을때 실시간으로 시간을 나타내야행 시 분 까지만
 * 3. text가  프로필에 정 가운데 와야함
 * 4. 프로그램 이름 다르게 수정
 * 5. 바람하상으로 배경화면이 움직이는 꽃잎떨어지는 화면이면 좋겠음(봄의 느낌으로)
 * 6. 티키타카 될 수 있게 메신저 마무리 구현해야함
 *
 */
