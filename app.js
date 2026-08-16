document.addEventListener("DOMContentLoaded", () => {

    const frontVideo = document.querySelector("#frontVideo");
    const backVideo = document.querySelector("#backVideo");

    const frontARVideo = document.querySelector("#frontARVideo");
    const backARVideo = document.querySelector("#backARVideo");


    const frontTarget = document.querySelector(
        '[mindar-image-target="targetIndex:0"]'
    );

    const backTarget = document.querySelector(
        '[mindar-image-target="targetIndex:1"]'
    );


    // FRONT

    frontTarget.addEventListener("targetFound", async () => {

        console.log("FRONT FOUND");

        frontVideo.muted = true;
        frontVideo.currentTime = 0;

        try {

            await frontVideo.play();

            frontARVideo.components.material.material.map.needsUpdate = true;

            console.log("FRONT PLAYING");

        } catch (error) {

            console.error("FRONT VIDEO ERROR:", error);

        }

    });


    frontTarget.addEventListener("targetLost", () => {

        frontVideo.pause();

    });


    // BACK

    backTarget.addEventListener("targetFound", async () => {

        console.log("BACK FOUND");

        backVideo.muted = true;
        backVideo.currentTime = 0;

        try {

            await backVideo.play();

            backARVideo.components.material.material.map.needsUpdate = true;

            console.log("BACK PLAYING");

        } catch (error) {

            console.error("BACK VIDEO ERROR:", error);

        }

    });


    backTarget.addEventListener("targetLost", () => {

        backVideo.pause();

    });

});
