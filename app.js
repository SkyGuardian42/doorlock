// PROTOTYPE
const io			= require('socket.io-client'),
			// gpio = require('rpi-gpio'),
			socket	= io('https://doorlock.glitch.me/');

// load environment variables
require('dotenv').config();

if(process.env.NODE_ENV === 'production')
	gpio.setup(7, gpio.DIR_OUT, write);

let status = {
	opened: false
};			

let doorOpen = false;

socket.on('connect', () => {
	log('connected to server');

	socket.emit('register-lock', {
		apiKey: process.env.WS_TOKEN
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
