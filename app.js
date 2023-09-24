const express = require("express"); // require을 쓰면 자동으로 node module을 바라본다.
const app = express();
const http = require("http");
const server = http.createServer(app); // express로 구현한 app을 담아서
// express가 결국엔 http를 통해 실행될 수 있도록 함

const moment = require("moment");

const socketIO = require("socket.io");

// 소캣 아이오에서 서버를 담아간것을 변수에 담기
const io = socketIO(server);

// 이 io를 통해서 저희가 보낸 메세지를나 이런것들을 받아와서 사용
io.on("connection", (socket) => {
  console.log("연결이 이루어졌습니다");
  // socket.on(채팅아이디, 실행할 함수)
  socket.on("chatting", (data) => {
    const { name, msg } = data; // 이 data는 프론트에서 보낸 data
    console.log(data);
    io.emit("chatting", {
      // name: name, 이름이 같기 때문에 es6에서는 생략가능
      // msg: msg,
      name,
      msg,
    }); // 답장하기(서버에서 보내기)
  });
}); // 연결이 이루어지면 연결에 대한 모든 정보를 socket에 담을 거임.

// 이 서버가 실행되면 서버가 보여줄 파일들을 지정해줄 수 있음
// 보여줄 폴더를 지정
console.log("hihfffasdfasdffffi11111hih");
// 노드js의기본 모듈도 함께 불러오기
const path = require("path");
console.log(__dirname); // 현재 폴더 위치
app.use(express.static(path.join(__dirname, "src"))); // static 폴더를 하나 만듬.
// 현재 폴더 위치에서 public이란 폴더를 지정해줌 >> Desktop\chat\public
// path.join 사용 이유 : 운영체제마다 경로를 나타내주는 역슬레시가 다르므로.

// 서버 실행 위한 포트
// 프로세스 환경에 포트가 지정되있으면 그걸 쓰고 아니라면 5000 포트를 사용하라
const PORT = process.env.PORT || 5000; // require을 쓰면 자동으로 node module을 바라본다.
//

// 서버 실행 명령
// app.listen(포트, 명령)
server.listen(PORT, () => console.log(`server is running ${PORT}`));

// 위의 동작만으로 웹서버를 만든거임.
