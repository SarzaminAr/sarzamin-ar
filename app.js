document.addEventListener("DOMContentLoaded", () => {

    const frontVideo = document.querySelector("#frontVideo");
    const backVideo = document.querySelector("#backVideo");

    const frontTarget = document.querySelector(
        '[mindar-image-target="targetIndex:0"]'
    );

    const backTarget = document.querySelector(
        '[mindar-image-target="targetIndex:1"]'
    );


    // جلو تراکت
    frontTarget.addEventListener("targetFound", () => {

        console.log("Front found");

        frontVideo.currentTime = 0;
        frontVideo.play();

    });


    frontTarget.addEventListener("targetLost", () => {

        frontVideo.pause();

    });



    // پشت تراکت
    backTarget.addEventListener("targetFound", () => {

        console.log("Back found");

        backVideo.currentTime = 0;
        backVideo.play();

    });


    backTarget.addEventListener("targetLost", () => {

        backVideo.pause();

    });


});
