document.addEventListener("DOMContentLoaded", () => {

    const video = document.querySelector("#frontVideo");

    const scene = document.querySelector("a-scene");

    const arVideo = document.querySelector("#frontARVideo");

    const target = document.querySelector(
        '[mindar-image-target="targetIndex:0"]'
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

    status.style.fontSize = "16px";

    status.style.direction = "ltr";

    status.innerText = "WAITING...";

    document.body.appendChild(status);


    // AR آماده شد
    scene.addEventListener("arReady", () => {

        status.innerText = "AR READY";

    });


    // Target Found
    target.addEventListener("targetFound", async () => {

        status.innerText = "TARGET FOUND";

        video.muted = true;

        video.currentTime = 0;


        try {

            await video.play();

            status.innerText =
                "PLAYING: " +
                video.currentTime.toFixed(1);


            setInterval(() => {

                if (!video.paused) {

                    status.innerText =
                        "PLAYING: " +
                        video.currentTime.toFixed(1);

                } else {

                    status.innerText = "PAUSED";

                }

            }, 500);


        } catch (error) {

            status.innerText = "VIDEO ERROR";

            console.log(error);

        }

    });


    // Target Lost
    target.addEventListener("targetLost", () => {

        video.pause();

        status.innerText = "TARGET LOST";

    });


    // مهم‌ترین قسمت:
    // مجبور کردن Video Texture به آپدیت در هر فریم

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
