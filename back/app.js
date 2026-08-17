document.addEventListener("DOMContentLoaded", () => {

    const video = document.querySelector("#backVideo");
    const scene = document.querySelector("a-scene");
    const arVideo = document.querySelector("#backARVideo");

    const target = document.querySelector(
        '[mindar-image-target="targetIndex: 0"]'
    );


    // وضعیت روی صفحه

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

    status.innerText = "WAITING";

    document.body.appendChild(status);


    // AR آماده شد

    scene.addEventListener("arReady", () => {

        status.innerText = "AR READY";

    });


    // پشت تراکت شناسایی شد

    target.addEventListener("targetFound", async () => {

        status.innerText = "BACK TARGET FOUND";

        video.muted = true;
        video.currentTime = 0;

        try {

            await video.play();

            status.innerText =
                "BACK PLAYING " +
                video.currentTime.toFixed(1);

        } catch (error) {

            status.innerText = "VIDEO ERROR";

            console.log(error);

        }

    });


    // تارگت گم شد

    target.addEventListener("targetLost", () => {

        video.pause();

        status.innerText = "TARGET LOST";

    });


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
