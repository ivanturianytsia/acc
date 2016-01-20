var pwm = require("pwm");

// Calling export with a chip number and a pin number will export that 
// header and return a pwm header instance 
var pin = pwm.export(0, 12, function() {
    console.log("Ready!");
    pin.setPeriod(1000, function() {
        var run = function() {
            var i = 1000;
            console.log("i = " + i);
            pin.setDutyCycle(i, function() {
                if (i >= 100) {
                    i -= 100;
                    setTimeout(run, 1000);
                } else {
                    console.log("finish");
                }
            });
        }
        run();
    });
});