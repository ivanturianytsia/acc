var raspi = require('raspi');
var PWM = require('raspi-pwm').PWM;

raspi.init(function() {
    var pwm = new PWM("GPIO21");
    pwm.write(72); // Center a servo
});