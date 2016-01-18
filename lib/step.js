var gpio = require('rpi-gpio');

var time = 20;

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}
var pin1 = 7,
    pin2 = 11,
    pin3 = 16,
    pin4 = 18;
var step = function(w1, w2, w3, w4, next) {
    gpio.write(pin1, w1, function() {
        gpio.write(pin2, w2, function() {
            gpio.write(pin3, w3, function() {
                gpio.write(pin4, w4, function() {
                    next();
                });
            });
        });
    });
}
var move = function(cw, end) {
    if (cw) {
        step(1, 0, 1, 0, function() {
            step(0, 1, 1, 0, function() {
                step(0, 1, 0, 1, function() {
                    step(1, 0, 0, 1, function() {
                        end();
                    });
                });
            });
        });
    } else {
        step(1, 0, 0, 1, function() {
            step(0, 1, 0, 1, function() {
                step(0, 1, 1, 0, function() {
                    step(1, 0, 1, 0, function() {
                        end();
                    });
                });
            });
        });
    }
}

module.exports = {
    setup: function(callback) {
        var self = this;
        gpio.setup(pin1, gpio.DIR_OUT, function() {
            gpio.setup(pin2, gpio.DIR_OUT, function() {
                gpio.setup(pin3, gpio.DIR_OUT, function() {
                    gpio.setup(pin4, gpio.DIR_OUT, function() {
                        console.log("Setup done");
                        self.move = move;
                        if (callback) {
                            callback(self);
                        }
                    });
                });
            });
        });
    }
}