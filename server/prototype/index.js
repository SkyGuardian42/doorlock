// PROTOTYPE
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

let doorID;
let doorOpen = false;
// EVENTS to Doorlock
// openDoor		{}
// closeDoor	{}
// 


server.listen(80);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', socket => {

	// Socket connection auto established by doorlock on boot
	socket.on('doorlock', data => {
		// get doorlock id
		doorID = socket.id;
		doorOpen = data.open;
		// send accepted to doorlock and log it
		socket.emit('accepted', {});
		console.log((doorOpen ? 'open' : 'closed') + ' doorlock connected: ' + doorID);
	});

	// client connects
	socket.on('login', data => {
		socket.emit('accepted', {
			id: socket.id,
			open: doorOpen
		});
	})

	// Open signal received from webpage
	socket.on('open', data => {
		console.log('open');

		// send open to doorlock
		socket.broadcast.to(doorID).emit('openDoor');
	});

	socket.on('close', data => {
		console.log('close');
		socket.broadcast.to(doorID).emit('closeDoor');
	});
});