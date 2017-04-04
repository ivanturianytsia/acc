'use strict'

var connected = "";
var moving = true;

function disconnect() {
	moving = false;
	connected = "";
}

module.exports = function(server) {
	var io = require('socket.io')(server);
	var motor = require('./step.js');

	motor.setup(function(motor) {
		moving = false;


		// ping
		var ping = false;
		io.on("pong", function() {
			ping = false;
		})
		setInterval(function() {
			if (ping) {
				ping = false;
				disconnect()
			} else {
				if (connected.length) {
					if (io.sockets.connected[connected]) {
						ping = true;
						io.sockets.connected[connected].emit('ping');
					}
				}
			}
		}, 5000);



		io.on('connection', function(socket) {
			if (connected.length) {
				socket.emit("avalible", false);
			} else {
				connected = socket.id;
				console.log(connected + ' connected');
				socket.emit("avalible", true);
				socket.on("gamma", function(data) {
					if (!moving) {
						moving = true;
						motor.move(data.gamma, function() {
							moving = false;
						})
					}
				})

				socket.on("disconnect", function(data) {
					disconnect()
				})
			}
		});
	})

}
