var gpio = require('rpi-gpio');

var time = parseInt(process.env.STEP_TIME);

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}
var pinConfig = {
    pin1: parseInt(process.env.STEP_PIN1),
    pin2: parseInt(process.env.STEP_PIN2),
    pin3: parseInt(process.env.STEP_PIN3),
    pin4: parseInt(process.env.STEP_PIN4)
}
var pattern = [
	[1, 0, 1, 0],
	[0, 1, 1, 0],
	[0, 1, 0, 1],
	[1, 0, 0, 1]
]
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
//    var delay = Math.abs(time - Math.abs(speed / 90 * time));
    var delay = time;
    console.log(speed);
    if (speed > 0) {
        step(pattern[0], function() {
            sleep(delay);
            step(pattern[1], function() {
                sleep(delay);
                step(pattern[2], function() {
                    sleep(delay);
                    step(pattern[3], function() {
                        sleep(delay);
                        end();
                    });
                });
            });
        });
    } else {
        step(pattern[3], function() {
	    sleep(delay);
            step(pattern[2], function() {
                sleep(delay);
		step(pattern[1], function() {
                    sleep(delay);
		    step(pattern[0], function() {
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
