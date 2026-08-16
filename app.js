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


    // =========================
    // AR READY
    // =========================

    scene.addEventListener("arReady", () => {

        status.innerText = "AR READY";

    });


    // =========================
    // FRONT
    // =========================

    scene.addEventListener("targetFound", async (event) => {

        const target = event.target;

        const index =
            target.components["mindar-image-target"].data.targetIndex;


        // ---------- FRONT ----------

        if (index === 0) {

            backVideo.pause();

            backVideo.currentTime = 0;

            frontVideo.currentTime = 0;

            status.innerText = "FRONT TARGET FOUND";


            try {

                await frontVideo.play();

                status.innerText =
                    "FRONT PLAYING " +
                    frontVideo.currentTime.toFixed(1);

            } catch (error) {

                console.log(error);

                status.innerText =
                    "FRONT VIDEO ERROR";

            }

        }


        // ---------- BACK ----------

        if (index === 1) {

            frontVideo.pause();

            frontVideo.currentTime = 0;

            backVideo.currentTime = 0;

            status.innerText = "BACK TARGET FOUND";


            try {

                await backVideo.play();

                status.innerText =
                    "BACK PLAYING " +
                    backVideo.currentTime.toFixed(1);

            } catch (error) {

                console.log(error);

                status.innerText =
                    "BACK VIDEO ERROR";

            }

        }

    });


    // =========================
    // TARGET LOST
    // =========================

    scene.addEventListener("targetLost", (event) => {

        const target = event.target;

        const index =
            target.components["mindar-image-target"].data.targetIndex;


        if (index === 0) {

            frontVideo.pause();

            status.innerText = "FRONT TARGET LOST";

        }


        if (index === 1) {

            backVideo.pause();

            status.innerText = "BACK TARGET LOST";

        }

    });


    // =========================
    // VIDEO TEXTURE UPDATE
    // =========================

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
