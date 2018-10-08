'use strict';

const webSocket = document.getElementsByClassName('websocket')[0].children;
const socket = new WebSocket('wss://neto-api.herokuapp.com/comet/websocket');
let webPast = 0;
socket.addEventListener('open',()=>{
	socket.addEventListener('message',(event)=>{
		let res = event.data;
		if(res !== webPast || res >= webSocket.length){
			webSocket[res].classList.add('flip-it');
			webSocket[webPast].classList.remove('flip-it')
			webPast=res;
		}
	})
});
