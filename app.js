document.addEventListener("DOMContentLoaded", () => {

const frontVideo = document.querySelector("#frontVideo");
const backVideo = document.querySelector("#backVideo");
frontVideo.muted = true;
backVideo.muted = true;

const frontTarget = document.querySelector(
'[mindar-image-target="targetIndex:0"]'
);

const backTarget = document.querySelector(
'[mindar-image-target="targetIndex:1"]'
);


frontTarget.addEventListener("targetFound",()=>{
frontVideo.play();
});


frontTarget.addEventListener("targetLost",()=>{
frontVideo.pause();
});


backTarget.addEventListener("targetFound",()=>{
backVideo.play();
});


backTarget.addEventListener("targetLost",()=>{
backVideo.pause();
});


});
