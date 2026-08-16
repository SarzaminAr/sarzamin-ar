document.addEventListener("DOMContentLoaded", () => {

    const frontVideo = document.querySelector("#frontVideo");
    const backVideo = document.querySelector("#backVideo");

    const frontTarget = document.querySelector(
        '[mindar-image-target="targetIndex:0"]'
    );

    const backTarget = document.querySelector(
        '[mindar-image-target="targetIndex:1"]'
    );


    frontTarget.addEventListener("targetFound", async () => {

        console.log("FRONT FOUND");

        frontVideo.muted = true;
        frontVideo.currentTime = 0;

        try {
            await frontVideo.play();
            console.log("FRONT PLAYING");
        } catch (error) {
            console.error("FRONT ERROR", error);
        }

    });


    frontTarget.addEventListener("targetLost", () => {
        frontVideo.pause();
    });


    backTarget.addEventListener("targetFound", async () => {

        console.log("BACK FOUND");

        backVideo.muted = true;
        backVideo.currentTime = 0;

        try {
            await backVideo.play();
            console.log("BACK PLAYING");
        } catch (error) {
            console.error("BACK ERROR", error);
        }

    });


    backTarget.addEventListener("targetLost", () => {
        backVideo.pause();
    });

});
