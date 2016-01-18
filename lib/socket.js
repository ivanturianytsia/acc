module.exports = function(server) {
    var io = require('socket.io')(server);
    var motor = require('step.js');
    var connected = false;
    var moving = true;
    motor.setup(function(motor) {
        moving = false;
        io.on('connection', function(socket) {
            console.log('connected');
            if (connected) {
                socket.emit("avalible", false);
            } else {
                connected = true;
                socket.emit("avalible", true);
                socket.on("move", function(cw) {
                    if (!moving) {
                        moving = true;
                        motor.move(cw, function() {
                            moving = false;
                        })
                    }
                })
            }
        });
    })

}