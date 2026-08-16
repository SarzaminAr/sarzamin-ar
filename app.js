document.addEventListener("DOMContentLoaded", () => {

    const scene = document.querySelector("a-scene");

    const target = document.querySelector(
        '[mindar-image-target="targetIndex: 0"]'
    );

    const status = document.createElement("div");

    status.style.position = "fixed";
    status.style.top = "10px";
    status.style.left = "10px";
    status.style.zIndex = "999999";

    status.style.background = "black";
    status.style.color = "white";

    status.style.padding = "12px";

    status.style.fontSize = "18px";
    status.style.direction = "ltr";

    document.body.appendChild(status);


    if (!target) {

        status.innerText = "TARGET ELEMENT NOT FOUND";

        return;
    }


    status.innerText = "TARGET ELEMENT OK";


    scene.addEventListener("arReady", () => {

        status.innerText = "AR READY - LOOK AT TARGET";

    });


    target.addEventListener("targetFound", () => {

        status.innerText = "TARGET FOUND";

        console.log("TARGET FOUND");

    });


    target.addEventListener("targetLost", () => {

        status.innerText = "TARGET LOST";

        console.log("TARGET LOST");

    });

});
