const sendBtn = document.getElementById('sendBtn');
const input = document.getElementById('test');
const socket = io();

// 접속 되었을 때 실행
socket.on('connect', function(){
    if(!input) 
        input = document.getElementById('test');
    input.value = '접속 됨';
})

function send(){
    // 입력되어있는 데이터 가져오기
    const message = input.value;
    console.log(message);

    // 서버로 send이벤트 데이터와 함께 전달
    socket.emit('send', {msg: message});

    // 가져왔으니 데이터 빈칸으로 변경
    input.value = "";
    
}

if(sendBtn){
    sendBtn.addEventListener('click', send);
}