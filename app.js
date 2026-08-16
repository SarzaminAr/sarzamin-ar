document.addEventListener("DOMContentLoaded", () => {

    const video = document.querySelector("#frontVideo");
    const target = document.querySelector(
        '[mindar-image-target="targetIndex:0"]'
    );

    target.addEventListener("targetFound", async () => {

        console.log("TARGET FOUND");

        video.muted = true;
        video.currentTime = 0;

        try {
            await video.play();

            console.log("VIDEO PLAY CALLED");

            setInterval(() => {
                console.log("VIDEO TIME:", video.currentTime);
            }, 1000);

        } catch (error) {
            console.error("VIDEO ERROR:", error);
        }

    });

    target.addEventListener("targetLost", () => {

        console.log("TARGET LOST");

        video.pause();

    });

});
