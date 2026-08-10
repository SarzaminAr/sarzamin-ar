document.addEventListener("DOMContentLoaded", () => {

    const frontVideo = document.querySelector("#frontVideo");

    const frontTarget =
        document.querySelector(
            '[mindar-image-target="targetIndex:0"]'
        );


    frontTarget.addEventListener("targetFound", () => {

        frontVideo.currentTime = 0;

        frontVideo.play();

    });


    frontTarget.addEventListener("targetLost", () => {

        frontVideo.pause();

    });

});
