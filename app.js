document.addEventListener("DOMContentLoaded", () => {

    const frontVideo = document.querySelector("#frontVideo");
    const backVideo = document.querySelector("#backVideo");

    const targets = document.querySelectorAll("[mindar-image-target]");

    // Target 0 (Front)

    targets[0].addEventListener("targetFound", () => {

        frontVideo.currentTime = 0;
        frontVideo.play();

    });

    targets[0].addEventListener("targetLost", () => {

        frontVideo.pause();

    });

    // Target 1 (Back)

    targets[1].addEventListener("targetFound", () => {

        backVideo.currentTime = 0;
        backVideo.play();

    });

    targets[1].addEventListener("targetLost", () => {

        backVideo.pause();

    });

});