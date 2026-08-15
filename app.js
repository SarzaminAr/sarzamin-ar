document.addEventListener("DOMContentLoaded", () => {

    const scene = document.querySelector("a-scene");

    scene.addEventListener("arReady", () => {
        document.body.insertAdjacentHTML(
            "afterbegin",
            '<div style="position:fixed;top:20px;left:10px;right:10px;background:green;color:white;padding:15px;text-align:center;z-index:99999;font-size:20px;">دوربین آماده است</div>'
        );
    });

    scene.addEventListener("targetFound", (event) => {
        document.body.insertAdjacentHTML(
            "afterbegin",
            '<div style="position:fixed;top:80px;left:10px;right:10px;background:blue;color:white;padding:15px;text-align:center;z-index:99999;font-size:20px;">🎯 تارگت پیدا شد</div>'
        );

        console.log("TARGET FOUND:", event);
    });

    scene.addEventListener("targetLost", () => {
        console.log("TARGET LOST");
    });

});
