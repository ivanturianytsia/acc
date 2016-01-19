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
var pinConfig = {
    pin1: 7,
    pin2: 11,
    pin3: 16,
    pin4: 18
}
var move = function(speed, end) {
    var step = function(code, next) {
        gpio.write(pinConfig.pin1, code[0], function() {
            gpio.write(pinConfig.pin2, code[1], function() {
                gpio.write(pinConfig.pin3, code[2], function() {
                    gpio.write(pinConfig.pin4, code[3], function() {
                        next();
                    });
                });
            });
        });
    }
    var delay = Math.abs(50 - Math.abs(speed / 90 * 50));
    if (speed > 0) {
        step([1, 0, 1, 0], function() {
            sleep(delay);
            step([0, 1, 1, 0], function() {
                sleep(delay);
                step([0, 1, 0, 1], function() {
                    sleep(delay);
                    step([1, 0, 0, 1], function() {
                        sleep(delay);
                        end();
                    });
                });
            });
        });
    } else {
        step([1, 0, 0, 1], function() {
            step([0, 1, 0, 1], function() {
                step([0, 1, 1, 0], function() {
                    step([1, 0, 1, 0], function() {
                        sleep(delay);
                        end();
                    });
                });
            });
        });
    }
}

module.exports = {
    setup: function(callback) {
        gpio.setup(pinConfig.pin1, gpio.DIR_OUT, function() {
            gpio.setup(pinConfig.pin2, gpio.DIR_OUT, function() {
                gpio.setup(pinConfig.pin3, gpio.DIR_OUT, function() {
                    gpio.setup(pinConfig.pin4, gpio.DIR_OUT, function() {
                        console.log("Setup done");
                        var motor = {
                            move: move
                        };
                        if (callback) {
                            callback(motor);
                        }
                    });
                });
            });
        });
    }
}