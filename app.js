document.addEventListener("DOMContentLoaded", () => {

    const scene = document.querySelector("a-scene");

    const frontVideo = document.querySelector("#frontVideo");
    const backVideo = document.querySelector("#backVideo");

    const frontTarget = document.querySelector(
        '[mindar-image-target="targetIndex: 0"]'
    );

    const backTarget = document.querySelector(
        '[mindar-image-target="targetIndex: 1"]'
    );

    const frontARVideo = document.querySelector("#frontARVideo");
    const backARVideo = document.querySelector("#backARVideo");


    // =========================
    // STATUS
    // =========================

    const status = document.createElement("div");

    status.style.position = "fixed";
    status.style.top = "10px";
    status.style.left = "10px";
    status.style.zIndex = "999999";
    status.style.background = "rgba(0,0,0,0.8)";
    status.style.color = "white";
    status.style.padding = "10px";
    status.style.fontSize = "18px";
    status.style.direction = "ltr";

    status.innerText = "JS LOADED";

    document.body.appendChild(status);


    // =========================
    // AR READY
    // =========================

    scene.addEventListener("arReady", () => {

        status.innerText = "AR READY";

    });


    // =========================
    // FRONT FOUND
    // =========================

    frontTarget.addEventListener("targetFound", async () => {

        status.innerText = "FRONT TARGET FOUND";

        // توقف ویدئوی پشت
        backVideo.pause();
        backVideo.currentTime = 0;

        // شروع ویدئوی جلو
        frontVideo.currentTime = 0;

        try {

            await frontVideo.play();

            status.innerText =
                "FRONT PLAYING " +
                frontVideo.currentTime.toFixed(1);

        } catch (error) {

            status.innerText = "FRONT VIDEO ERROR";

            console.log(error);

        }

    });


    // =========================
    // FRONT LOST
    // =========================

    frontTarget.addEventListener("targetLost", () => {

        frontVideo.pause();

        status.innerText = "FRONT TARGET LOST";

    });


    // =========================
    // BACK FOUND
    // =========================

    backTarget.addEventListener("targetFound", async () => {

        status.innerText = "BACK TARGET FOUND";

        // توقف ویدئوی جلو
        frontVideo.pause();
        frontVideo.currentTime = 0;

        // شروع ویدئوی پشت
        backVideo.currentTime = 0;

        try {

            await backVideo.play();

            status.innerText =
                "BACK PLAYING " +
                backVideo.currentTime.toFixed(1);

        } catch (error) {

            status.innerText = "BACK VIDEO ERROR";

            console.log(error);

        }

    });


    // =========================
    // BACK LOST
    // =========================

    backTarget.addEventListener("targetLost", () => {

        backVideo.pause();

        status.innerText = "BACK TARGET LOST";

    });


    // =========================
    // VIDEO TEXTURE UPDATE
    // =========================

    scene.addEventListener("renderstart", () => {

        scene.addEventListener("tick", () => {

            // FRONT texture

            const frontMesh =
                frontARVideo.getObject3D("mesh");

            if (
                frontMesh &&
                frontMesh.material &&
                frontMesh.material.map
            ) {

                frontMesh.material.map.needsUpdate = true;

            }


            // BACK texture

            const backMesh =
                backARVideo.getObject3D("mesh");

            if (
                backMesh &&
                backMesh.material &&
                backMesh.material.map
            ) {

                backMesh.material.map.needsUpdate = true;

            }

        });

    });

});
