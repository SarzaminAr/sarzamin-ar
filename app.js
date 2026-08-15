document.addEventListener("DOMContentLoaded", () => {

    const frontVideo = document.querySelector("#frontVideo");
    const backVideo = document.querySelector("#backVideo");

    const frontTarget =
        document.querySelector('[mindar-image-target="targetIndex:0"]');

    const backTarget =
        document.querySelector('[mindar-image-target="targetIndex:1"]');


    // ===== FRONT =====

    frontTarget.addEventListener("targetFound", async () => {

        console.log("FRONT TARGET FOUND");

        frontVideo.currentTime = 0;
        frontVideo.muted = true;

        try {
            await frontVideo.play();
            console.log("FRONT VIDEO PLAYING");
        } catch (error) {
            console.log("FRONT VIDEO ERROR:", error);
        }

    });


    frontTarget.addEventListener("targetLost", () => {

        console.log("FRONT TARGET LOST");

        frontVideo.pause();

    });


    // ===== BACK =====

    backTarget.addEventListener("targetFound", async () => {

        console.log("BACK TARGET FOUND");

        backVideo.currentTime = 0;
        backVideo.muted = true;

        try {
            await backVideo.play();
            console.log("BACK VIDEO PLAYING");
        } catch (error) {
            console.log("BACK VIDEO ERROR:", error);
        }

    });


    backTarget.addEventListener("targetLost", () => {

        console.log("BACK TARGET LOST");

        backVideo.pause();

    });

});
