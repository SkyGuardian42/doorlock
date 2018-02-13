// PROTOTYPE
const io			= require('socket.io-client'),
			socket	= io('https://doorlock.glitch.me/')
const gpio = require('rpi-gpio')
if(process.env.NODE_ENV === 'production') {

	gpio.setup(7, gpio.DIR_OUT, write)
}

let status = {
	opened: false,
	apiKey: 'VKvDe4+rZ7!bUH5.'
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

socket.on('open', (name) => {
	log('door opened by ' + name);

	if(process.env.NODE_ENV === 'production') 
		gpio.write(7, 1, write);
	
	setTimeout(() => {
		log('door closed');
		if(process.env.NODE_ENV === 'production') 
			gpio.write(7, 0, write);
	}, 2000)

	
})

function log(text) {
	let time = '[' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds() + '] ';

	console.log(time + text);
}

function write(err) {
  if(err)
    throw err;
}
