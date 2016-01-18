function handleOrientation(event) {
    var alpha = Math.floor(event.alpha);
    var beta = Math.floor(event.beta);
    var gamma = Math.floor(event.gamma);
    window.requestAnimationFrame(function() {
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
