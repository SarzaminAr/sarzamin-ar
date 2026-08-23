const scene = document.querySelector("a-scene");
const video = document.querySelector("#frontVideo");


// -----------------------------
// AR آماده شد
// -----------------------------

scene.addEventListener("arReady", () => {

    console.log("AR READY");

});


// -----------------------------
// دفتر شناسایی شد
// -----------------------------

scene.addEventListener("targetFound", async () => {

    console.log("TARGET FOUND");

    video.muted = false;
    video.volume = 1;

    video.currentTime = 0;

    try {

        await video.play();

        console.log("PLAYING WITH SOUND");

    } catch (error) {

        console.log("PLAY ERROR:", error);

    }

});


// -----------------------------
// دفتر از جلوی دوربین خارج شد
// -----------------------------

scene.addEventListener("targetLost", () => {

    console.log("TARGET LOST");

    video.pause();

    video.currentTime = 0;

});
