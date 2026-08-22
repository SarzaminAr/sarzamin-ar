document.addEventListener("DOMContentLoaded", () => {

    const scene = document.querySelector("a-scene");

    const notebookVideo =
        document.querySelector("#notebookVideo");


    scene.addEventListener("arReady", () => {

        console.log("NOTEBOOK AR READY");

    });


    scene.addEventListener("targetFound", async (e) => {

        const target = e.target;

        const index =
            target.getAttribute(
                "mindar-image-target"
            ).targetIndex;


        if (index === 0) {

            console.log("NOTEBOOK TARGET FOUND");

            notebookVideo.currentTime = 0;

            notebookVideo.muted = false;

            try {

                await notebookVideo.play();

            } catch (err) {

                console.log("VIDEO ERROR:", err);

            }

        }

    });


    scene.addEventListener("targetLost", (e) => {

        const target = e.target;

        const index =
            target.getAttribute(
                "mindar-image-target"
            ).targetIndex;


        if (index === 0) {

            notebookVideo.pause();

        }

    });

});
