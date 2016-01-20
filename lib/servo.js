var pwm = require("pwm");

// Calling export with a chip number and a pin number will export that 
// header and return a pwm header instance 
var pin = pwm.export(0, 40, function() {
    console.log("Ready!");
    pwm5.setPeriod(1000000, function() {
        console.log("Period set!");
        pwm5.setDutyCycle(500000, function() {
            console.log("Duty cycle set!");
        });
    });
});