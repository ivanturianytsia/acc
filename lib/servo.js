var pwm = require("pwm");

// Calling export with a chip number and a pin number will export that 
// header and return a pwm header instance 
var pin = pwm.export(0, 40, function() {
    console.log("Ready!");
    pin.setPeriod(1000, function() {
        console.log("Period set!");
        setInterval(function() {
            var i = 1000;
            pin.setDutyCycle(i, function() {
                i -= 200;
            });
        }, 1000);
    });
});