var help {
    say: function(title, body) {
        window.requestAnimationFrame(function() {
            document.getElementById("loading").style.display = "inline";
            document.getElementById("message-title").innerHTML = title;
            document.getElementById("message-body").innerHTML = body;
        });
    }
}

var socket = io.connect();
help.say("Loading...", "Please wait.");
socket.on('connect', function() {
    // help.say("Sorry.", "But your device do not support this feature.");
    socket.on('disconnect', function() {});
    socket.on('avalible', function(data) {
        if (data) {
            window.requestAnimationFrame(function() {
                document.getElementById("loading").style.display = "none";
            });
        } else {
            help.say("Sorry.", "But another device is connected right now. Try later.");
        }
    });
})

function handleOrientation(event) {
    var alpha = Math.floor(event.alpha);
    var beta = Math.floor(event.beta);
    var gamma = Math.floor(event.gamma);
    window.requestAnimationFrame(function() {
        if (Math.abs(gamma) > 5) {
            console.log("emitting");
            socket.emit("move", {
                clockwise: (gamma > 0),
                speed: gamma
            })
        }
        document.getElementById("alpha").style.width = (alpha / 2) + "px";
        document.getElementById("beta").style.width = (beta / 2) + "px";
        document.getElementById("gamma").style.width = (gamma / 2) + "px";
        document.getElementById("alpha").innerHTML = alpha;
        document.getElementById("beta").innerHTML = beta;
        document.getElementById("gamma").innerHTML = gamma;
    });
    // Do stuff with the new orientation data
}
window.addEventListener("deviceorientation", handleOrientation, true);