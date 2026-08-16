document.addEventListener("DOMContentLoaded", () => {

    const scene = document.querySelector("a-scene");

    const status = document.createElement("div");

    status.style.position = "fixed";
    status.style.top = "10px";
    status.style.left = "10px";
    status.style.zIndex = "999999";
    status.style.background = "rgba(0,0,0,0.8)";
    status.style.color = "white";
    status.style.padding = "10px";
    status.style.fontSize = "18px";
    status.style.direction = "ltr";

    status.innerText = "JS LOADED";

    document.body.appendChild(status);

    scene.addEventListener("arReady", () => {
        status.innerText = "AR READY";
    });

    scene.addEventListener("targetFound", () => {
        status.innerText = "TARGET FOUND";
    });

    scene.addEventListener("targetLost", () => {
        status.innerText = "TARGET LOST";
    });

});
