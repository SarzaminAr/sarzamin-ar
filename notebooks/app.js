document.addEventListener("DOMContentLoaded", () => {

    const scene = document.querySelector("a-scene");

    const target = document.querySelector("#notTarget");

    const video = document.querySelector("#notVideo");

    const status = document.querySelector("#status");


    scene.addEventListener("arReady", () => {

        console.log("AR READY");

        status.innerText = "دوربین آماده است";

    });


    scene.addEventListener("arError", (event) => {

        console.log("AR ERROR", event);

        status.innerText = "خطا در راه‌اندازی دوربین";

    });


    target.addEventListener("targetFound", async () => {

        console.log("TARGET FOUND");

        status.innerText = "دفتر پیدا شد";

        video.currentTime = 0;

        try {

            await video.play();

        }

        catch (error) {

            console.log("VIDEO ERROR:", error);

        }

    });


    target.addEventListener("targetLost", () => {

        console.log("TARGET LOST");

        video.pause();

        status.innerText = "دوربین آماده است";

    });


});
