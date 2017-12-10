// PROTOTYPE
const io		 = require('socket.io-client'),
			socket = io('https://doorlock.glitch.me/');

let status = {
	opened: false,
	apiKey: 'VKvDe4+rZ7!bUH5.',
	open() {

	}
};			
let doorOpen = false;

socket.on('connect', () => {
	log('connected to server');

	socket.emit('register-lock', {
		apiKey: status.apiKey
	})	
});

socket.on('registered', res => {
	log('doorlock registered');
})

socket.on('open', () => {
	log('door opening');
	setTimeout(() => {
		log('door closed')
	}, 2000)
})

function log(text) {
	let time = '[' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds() + '] ';

	console.log(time + text);
}