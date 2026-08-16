document.addEventListener("DOMContentLoaded", () => {

    const video = document.querySelector("#frontVideo");
    const target = document.querySelector(
        '[mindar-image-target="targetIndex:0"]'
    );

    target.addEventListener("targetFound", async () => {

        console.log("FRONT TARGET FOUND");

        video.currentTime = 0;
        video.muted = true;

        try {
            await video.play();
            console.log("FRONT VIDEO PLAYING");
        } catch (error) {
            console.error("VIDEO ERROR:", error);
        }

    });

    target.addEventListener("targetLost", () => {

        console.log("FRONT TARGET LOST");

        video.pause();

    });

});
