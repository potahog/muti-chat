// express 모듈 불러오기
const express = require('express');
// socket.io 모듈 불러오기
const socket = require('socket.io');
// node.js 기본 내장 모듈 불러오기
const http = require('http');
// express 객체 생성
const app = express();
// express http 서버 생성
const server = http.createServer(app);
// 생서된 서버를 socket.io에 바인딩
const io = socket(server);
// Node.js 기본 내장 모듈 불러오기
const fs = require('fs');

app.use('/css', express.static('./static/css'));
app.use('/js', express.static('./static/js'));

// Get 방식으로 / 경로에 접속하면 실행 됨
app.get('/', function(request, response){
    fs.readFile('./static/index.html', function(err, data){
        if(err){
            response.send(`에러 : ${err}`);
        } else {
            response.writeHead(200, {'Content-Type':'text/html'});
            response.write(data);
            response.end();
        }
    })
})

io.sockets.on('connection', function(socket){

    socket.on('newUser', function(name){
        // 소켓에 이름 저장해두기
        socket.name = name;

        // 모든 소캣에게 전송
        io.sockets.emit('update', {type: 'connect', name: 'SERVER', message: `${name} 님이 접속하였습니다.`});
    });

    socket.on('message', function(data){
        // 받은 데이터에 누가 보냈는지 이름을 추가
        data.name = socket.name;

        // 보낸 사람을 제외한 나머지 유저에게 메시지 전송
        socket.broadcast.emit('update', data);
    });

    socket.on('disconnect', function(){
        // 나가는 사람을 제외한 나머지 유저에게 메시지 전송
        socket.broadcast.emit('update', {type: 'disconnect', name: 'SERVER', message: `${socket.name} 님이 나가셨습니다.`});
    });
})
// 서버를 8080포트로 listen
server.listen(8080, function(){
    console.log('서버 실행 중...');
})