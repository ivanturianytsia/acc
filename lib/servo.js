var raspi = require('raspi');
var PWM = require('raspi-pwm').PWM;

raspi.init(function() {
    var pwm = new PWM("P1-40");
    pwm.write(72); // Center a servo
});