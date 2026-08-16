document.addEventListener("DOMContentLoaded", () => {

    const scene = document.querySelector("a-scene");

    const video = document.querySelector("#frontVideo");

    const target = document.querySelector(
        '[mindar-image-target="targetIndex:0"]'
    );

    const arVideo = document.querySelector("#frontARVideo");


    // =========================
    // وضعیت روی صفحه
    // =========================

    const status = document.createElement("div");

    status.style.position = "fixed";
    status.style.top = "10px";
    status.style.left = "10px";
    status.style.zIndex = "999999";

    status.style.background = "rgba(0,0,0,0.8)";
    status.style.color = "white";

    status.style.padding = "10px 14px";

    status.style.fontSize = "18px";

    status.style.fontFamily = "Arial";

    status.style.direction = "ltr";

    status.innerText = "JS LOADED";

    document.body.appendChild(status);


    // =========================
    // AR آماده شد
    // =========================

    scene.addEventListener("arReady", () => {

        status.innerText = "AR READY";

        console.log("AR READY");

    });


    // =========================
    // Target Found
    // =========================

    target.addEventListener("targetFound", async () => {

        console.log("TARGET FOUND");

        status.innerText = "TARGET FOUND";


        video.muted = true;

        video.currentTime = 0;


        try {

            await video.play();

            console.log("VIDEO PLAYING");

            status.innerText =
                "PLAYING " +
                video.currentTime.toFixed(1);


        } catch (error) {

            console.error(
                "VIDEO PLAY ERROR:",
                error
            );

            status.innerText =
                "VIDEO ERROR";

        }

    });


    // =========================
    // Target Lost
    // =========================

    target.addEventListener("targetLost", () => {

        console.log("TARGET LOST");

        video.pause();

        status.innerText =
            "TARGET LOST";

    });


    // =========================
    // نمایش زمان ویدئو
    // =========================

    setInterval(() => {

        if (!video.paused) {

            status.innerText =
                "PLAYING " +
                video.currentTime.toFixed(1);

        }

    }, 500);


    // =========================
    // Video Texture Update
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

});
