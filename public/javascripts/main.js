var socket = io.connect();
socket.on('connect', function() {
    socket.on('disconnect', function() {});
    socket.on('avalible', function(data) {
        if (data) {
            window.requestAnimationFrame(function() {
                document.getElementById("loading").style.display = "none";
            });
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