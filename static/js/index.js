const sendBtn = document.getElementById('sendBtn');
const input = document.getElementById('chatInput');
const chatWindow = document.getElementById('chatScroll');
const socket = io();

// 접속 되었을 때 실행
socket.on('connect', function(){
    let name = prompt('반갑습니다!', '');
    // 이름이 빈칸인 경우
    if(!name){
        name = '익명';
    }
    // 서버에 새로운 유저가 왔다고 알림
    socket.emit('newUser', name);
});

socket.on('update', function(data){
    console.log(`${data.name} : ${data.message}`);
    const chatDiv = document.createElement("div");
    chatDiv.classList.add("chat");
    chatDiv.innerText = `${data.name} : ${data.message}`;
    chatWindow.appendChild(chatDiv);
});

function send(event){
    event.preventDefault();
    // 입력되어있는 데이터 가져오기
    const message = input.value;
    const chatDiv = document.createElement("div");
    chatDiv.classList.add("chat");
    chatDiv.classList.add("self");
    chatDiv.innerText = message;
    chatWindow.appendChild(chatDiv);

    // 서버로 send이벤트 데이터와 함께 전달
    socket.emit('message', {type: 'message', message: message});

    // 가져왔으니 데이터 빈칸으로 변경
    input.value = "";
    
}

if(sendBtn){
    sendBtn.addEventListener('click', send);
    sendBtn.addEventListener('submit', send);
}

if(input){
    input.addEventListener('submit', send);
}