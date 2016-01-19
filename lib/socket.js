module.exports = function(server) {
    var io = require('socket.io')(server);
    var motor = require('./step.js');
    var connected = "";
    var moving = true;
    motor.setup(function(motor) {
        moving = false;
        io.on('connection', function(socket) {
            if (connected.length) {
                socket.emit("avalible", false);
            } else {
                connected = socket.id;
                console.log(connected + ' connected');
                socket.emit("avalible", true);
                socket.on("move", function(data) {
                    if (!moving) {
                        moving = true;
                        motor.move(data.speed, function() {
                            moving = false;
                        })
                    }
                })
                socket.on("disconnect", function(data) {
                    moving = false;
                    connected = "";
                })
            }
        });
    })

}