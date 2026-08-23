const scene = document.querySelector("a-scene");
const video = document.querySelector("#frontVideo");
const soundButton = document.querySelector("#soundButton");

let audioUnlocked = false;


// --------------------------------
// باز کردن اجازه صدا با لمس کاربر
// --------------------------------

soundButton.addEventListener("click", async () => {

    try {

        video.muted = false;
        video.volume = 1;

        // یک بار پخش برای گرفتن اجازه صدا از مرورگر
        await video.play();

        video.pause();
        video.currentTime = 0;

        audioUnlocked = true;

        soundButton.style.display = "none";

        console.log("Audio unlocked");

    } catch (error) {

        console.log("Audio unlock error:", error);

    }

});


// --------------------------------
// آماده شدن AR
// --------------------------------

scene.addEventListener("arReady", () => {

    console.log("AR READY");

});


// --------------------------------
// پیدا شدن دفتر
// --------------------------------

scene.addEventListener("targetFound", async () => {

    console.log("CHOROMI TARGET FOUND");

    if (!audioUnlocked) {

        console.log("Waiting for user interaction to enable sound");

        return;

    }

    try {

        video.muted = false;
        video.volume = 1;

        video.currentTime = 0;

        await video.play();

        console.log("CHOROMI VIDEO PLAYING WITH SOUND");

    } catch (error) {

        console.log("Video play error:", error);

    }

});


// --------------------------------
// خارج شدن دفتر از دوربین
// --------------------------------

scene.addEventListener("targetLost", () => {

    console.log("CHOROMI TARGET LOST");

    video.pause();

    video.currentTime = 0;

});
