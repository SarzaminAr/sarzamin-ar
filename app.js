document.addEventListener("DOMContentLoaded",()=>{


const scene=document.querySelector("a-scene");

const frontVideo=document.querySelector("#frontVideo");
const backVideo=document.querySelector("#backVideo");


scene.addEventListener("arReady",()=>{
console.log("AR READY");
});


scene.addEventListener("targetFound",async(e)=>{


let index=e.target.getAttribute("mindar-image-target").targetIndex;


if(index===0){

frontVideo.currentTime=0;

try{
await frontVideo.play();
}catch(err){
console.log(err);
}

}


if(index===1){

backVideo.currentTime=0;

try{
await backVideo.play();
}catch(err){
console.log(err);
}

}


});



scene.addEventListener("targetLost",(e)=>{


let index=e.target.getAttribute("mindar-image-target").targetIndex;


if(index===0)
frontVideo.pause();


if(index===1)
backVideo.pause();


});


});
