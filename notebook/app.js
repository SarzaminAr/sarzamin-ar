const video = document.querySelector("#video");
const target = document.querySelector("[mindar-image-target]");

target.addEventListener("targetFound", () => {

console.log("Target Found");

video.play();

});


target.addEventListener("targetLost", () => {

console.log("Target Lost");

video.pause();

});
