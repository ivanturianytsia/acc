var raspi = require('raspi');
var PWM = require('raspi-pwm').PWM;

raspi.init(function() {
    var pwm = new PWM("P1-12");
    pwm.write(0);
    setInterval(function() {
        pwm.write(72); // Center a servo
    }, 1000)
});