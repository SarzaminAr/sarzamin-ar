document.addEventListener("DOMContentLoaded", () => {

    const video = document.querySelector("#frontVideo");
    const target = document.querySelector(
        '[mindar-image-target="targetIndex:0"]'
    );

    video.addEventListener("loadeddata", () => {
        console.log("VIDEO LOADED");
    });

    video.addEventListener("play", () => {
        console.log("VIDEO PLAY EVENT");
    });

    target.addEventListener("targetFound", async () => {

        console.log("FRONT TARGET FOUND");

        video.muted = true;
        video.currentTime = 0;

        try {
            await video.play();

            console.log("VIDEO PLAYING");

            const arVideo = document.querySelector("#frontARVideo");

            arVideo.setAttribute(
                "material",
                "shader: flat; src: #frontVideo"
            );

        } catch (error) {
            console.error("VIDEO ERROR:", error);
        }

    });

    target.addEventListener("targetLost", () => {

        console.log("FRONT TARGET LOST");

        video.pause();

    });

});
