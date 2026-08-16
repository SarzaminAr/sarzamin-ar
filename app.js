document.addEventListener("DOMContentLoaded", () => {

    const scene = document.querySelector("a-scene");


    // =========================
    // VIDEOS
    // =========================

    const frontVideo =
        document.querySelector("#frontVideo");

    const backVideo =
        document.querySelector("#backVideo");


    // =========================
    // TARGETS
    // =========================

    const frontTarget =
        document.querySelector(
            '[mindar-image-target="targetIndex:0"]'
        );

    const backTarget =
        document.querySelector(
            '[mindar-image-target="targetIndex:1"]'
        );


    // =========================
    // AR VIDEO MESHES
    // =========================

    const frontARVideo =
        document.querySelector("#frontARVideo");

    const backARVideo =
        document.querySelector("#backARVideo");


    // =========================
    // STATUS
    // =========================

    const status =
        document.createElement("div");


    status.style.position = "fixed";
    status.style.top = "10px";
    status.style.left = "10px";

    status.style.zIndex = "999999";

    status.style.background =
        "rgba(0,0,0,0.8)";

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
    // FRONT FOUND
    // =========================

    frontTarget.addEventListener(
        "targetFound",
        async () => {

            status.innerText =
                "FRONT FOUND";


            // پشت را متوقف کن
            backVideo.pause();


            frontVideo.muted = false;

            frontVideo.currentTime = 0;


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
    );



    // =========================
    // FRONT LOST
    // =========================

    frontTarget.addEventListener(
        "targetLost",
        () => {

            frontVideo.pause();

            status.innerText =
                "FRONT LOST";

        }
    );



    // =========================
    // BACK FOUND
    // =========================

    backTarget.addEventListener(
        "targetFound",
        async () => {

            status.innerText =
                "BACK FOUND";


            // جلو را متوقف کن
            frontVideo.pause();


            backVideo.muted = false;

            backVideo.currentTime = 0;


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
    );



    // =========================
    // BACK LOST
    // =========================

    backTarget.addEventListener(
        "targetLost",
        () => {

            backVideo.pause();

            status.innerText =
                "BACK LOST";

        }
    );



    // =========================
    // VIDEO TEXTURE UPDATE
    // =========================

    scene.addEventListener(
        "renderstart",
        () => {


            scene.addEventListener(
                "tick",
                () => {


                    // FRONT

                    const frontMesh =
                        frontARVideo.getObject3D("mesh");


                    if (
                        frontMesh &&
                        frontMesh.material &&
                        frontMesh.material.map
                    ) {

                        frontMesh.material.map.needsUpdate =
                            true;

                    }



                    // BACK

                    const backMesh =
                        backARVideo.getObject3D("mesh");


                    if (
                        backMesh &&
                        backMesh.material &&
                        backMesh.material.map
                    ) {

                        backMesh.material.map.needsUpdate =
                            true;

                    }

                }
            );

        }
    );



    // =========================
    // SHOW VIDEO TIME
    // =========================

    setInterval(() => {


        if (!frontVideo.paused) {

            status.innerText =
                "FRONT PLAYING " +
                frontVideo.currentTime.toFixed(1);

        }


        else if (!backVideo.paused) {

            status.innerText =
                "BACK PLAYING " +
                backVideo.currentTime.toFixed(1);

        }


    }, 500);

});
