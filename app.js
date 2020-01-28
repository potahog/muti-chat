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
    console.log('유저 접속 됨');
    //console.log(socket);

    socket.on('send', function(data){
        console.log('전달된 메시지: ', data.msg);
    });

    socket.on('disconnect', function(){
        console.log('접속 종료');
    });
})
// 서버를 8080포트로 listen
server.listen(8080, function(){
    console.log('서버 실행 중...');
})