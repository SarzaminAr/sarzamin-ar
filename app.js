document.addEventListener("DOMContentLoaded", () => {

    const video = document.querySelector("#frontVideo");

    const target = document.querySelector(
        '[mindar-image-target="targetIndex:0"]'
    );

    const arVideo = document.querySelector("#frontARVideo");

    // وضعیت
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


    // AR آماده شد
    const scene = document.querySelector("a-scene");

    scene.addEventListener("arReady", () => {

        status.innerText = "AR READY";

    });


    // تارگت پیدا شد
    target.addEventListener("targetFound", async () => {

        status.innerText = "TARGET FOUND";

        video.muted = true;
        video.currentTime = 0;

        try {

            await video.play();

            status.innerText =
                "PLAYING " +
                video.currentTime.toFixed(1);

        } catch (error) {

            console.log(error);

            status.innerText = "VIDEO ERROR";

        }

    });


    // تارگت گم شد
    target.addEventListener("targetLost", () => {

        video.pause();

        status.innerText = "TARGET LOST";

    });


    // نمایش زمان واقعی ویدئو
    setInterval(() => {

        if (!video.paused) {

            status.innerText =
                "PLAYING " +
                video.currentTime.toFixed(1);

        }

    }, 500);


    // آپدیت Video Texture
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
