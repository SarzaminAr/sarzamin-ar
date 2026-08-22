document.addEventListener("DOMContentLoaded",()=>{


const scene = document.querySelector("a-scene");

const video = document.querySelector("#frontVideo");



scene.addEventListener("arReady",()=>{

console.log("AR READY");

});



scene.addEventListener("targetFound",async()=>{


console.log("TARGET FOUND");


video.currentTime = 0;


try{

await video.play();

}

catch(err){

console.log(err);

}


});



scene.addEventListener("targetLost",()=>{


console.log("TARGET LOST");


video.pause();


});


});
