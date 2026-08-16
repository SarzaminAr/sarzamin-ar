document.addEventListener("DOMContentLoaded", () => {

    const video = document.querySelector("#frontVideo");
    const target = document.querySelector(
        '[mindar-image-target="targetIndex:0"]'
    );

    // نمایش وضعیت روی صفحه
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


    target.addEventListener("targetFound", async () => {

        status.innerText = "TARGET FOUND";

        video.muted = false;
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


    target.addEventListener("targetLost", () => {

        video.pause();

        status.innerText = "TARGET LOST";

    });

});
