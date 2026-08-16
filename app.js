document.addEventListener("DOMContentLoaded", () => {

    const video = document.querySelector("#testVideo");

    const frontTarget = document.querySelector(
        '[mindar-image-target="targetIndex:0"]'
    );

    frontTarget.addEventListener("targetFound", async () => {

        console.log("TARGET FOUND");

        video.style.display = "block";

        video.currentTime = 0;
        video.muted = true;

        try {
            await video.play();
            console.log("VIDEO PLAYING");
        } catch (error) {
            console.error("VIDEO ERROR:", error);
        }

    });

    frontTarget.addEventListener("targetLost", () => {

        video.pause();
        video.style.display = "none";

    });

});
