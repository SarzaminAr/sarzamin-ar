document.addEventListener("DOMContentLoaded", () => {

    const scene = document.querySelector("a-scene");

    const video = document.querySelector("#frontVideo");

    const arVideo = document.querySelector("#frontARVideo");


    // =========================
    // STATUS
    // =========================

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


    // =========================
    // AR READY
    // =========================

    scene.addEventListener("arReady", () => {

        status.innerText = "AR READY";

        console.log("AR READY");

    });


    // =========================
    // TARGET FOUND
    // =========================

    scene.addEventListener("targetFound", async () => {

        status.innerText = "TARGET FOUND";

        console.log("TARGET FOUND");

        video.muted = false;

        video.currentTime = 0;


        try {

            await video.play();

            status.innerText =
                "PLAYING " +
                video.currentTime.toFixed(1);

        } catch (error) {

            console.log("VIDEO ERROR:", error);

            status.innerText = "VIDEO ERROR";

        }

    });


    // =========================
    // TARGET LOST
    // =========================

    scene.addEventListener("targetLost", () => {

        video.pause();

        status.innerText = "TARGET LOST";

    });


    // =========================
    // VIDEO TEXTURE UPDATE
    // =========================

    scene.addEventListener("renderstart", () => {

        scene.addEventListener("tick", () => {

            const mesh =
                arVideo.getObject3D("mesh");


            if (
                mesh &&
                mesh.material &&
                mesh.material.map
            ) {

                mesh.material.map.needsUpdate = true;

            }

        });

    });


    // =========================
    // VIDEO TIME
    // =========================

    setInterval(() => {

        if (!video.paused) {

            status.innerText =
                "PLAYING " +
                video.currentTime.toFixed(1);

        }

    }, 500);

});
