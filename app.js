document.addEventListener("DOMContentLoaded", () => {

    const frontVideo = document.querySelector("#frontVideo");
    const backVideo = document.querySelector("#backVideo");

    const scene = document.querySelector("a-scene");

    const frontARVideo = document.querySelector("#frontARVideo");
    const backARVideo = document.querySelector("#backARVideo");


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

    status.innerText = "WAITING";

    document.body.appendChild(status);



    scene.addEventListener("arReady", () => {

        status.innerText = "AR READY";

    });



    scene.addEventListener("targetFound", async (event) => {

        const targetIndex = event.detail.targetIndex;

        console.log("TARGET FOUND:", targetIndex);


        // =========================
        // FRONT
        // =========================

        if (targetIndex === 0) {

            status.innerText = "FRONT FOUND";

            backVideo.pause();

            frontVideo.muted = false;
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

        }


        // =========================
        // BACK
        // =========================

        if (targetIndex === 1) {

            status.innerText = "BACK FOUND";

            frontVideo.pause();

            backVideo.muted = false;
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

        }

    });



    scene.addEventListener("targetLost", (event) => {

        const targetIndex = event.detail.targetIndex;

        console.log("TARGET LOST:", targetIndex);


        if (targetIndex === 0) {

            frontVideo.pause();

            status.innerText = "FRONT LOST";

        }


        if (targetIndex === 1) {

            backVideo.pause();

            status.innerText = "BACK LOST";

        }

    });



    // =====================================
    // مجبور کردن Video Texture به آپدیت
    // =====================================

    scene.addEventListener("renderstart", () => {

        scene.addEventListener("tick", () => {


            // FRONT

            const frontMesh =
                frontARVideo.getObject3D("mesh");


            if (
                frontMesh &&
                frontMesh.material &&
                frontMesh.material.map
            ) {

                frontMesh.material.map.needsUpdate = true;

            }



            // BACK

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
