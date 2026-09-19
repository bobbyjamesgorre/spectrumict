// ======================================================
// SPECTRUMORMOC
// 3D AERIAL FIGURE-8 FIBER OPTIC CABLE
// ======================================================

const exploreButton = document.getElementById("exploreButton");
const cableSection = document.getElementById("cableSection");
const infoPanel = document.getElementById("infoPanel");
const closeInfo = document.getElementById("closeInfo");
const infoNumber = document.getElementById("infoNumber");
const infoTitle = document.getElementById("infoTitle");
const infoDescription = document.getElementById("infoDescription");


// ======================================================
// PART INFORMATION
// ======================================================

const cableParts = {

    messenger: {
        number: "01",
        title: "STEEL MESSENGER",
        description:
            "The steel messenger is the supporting wire of an aerial figure-8 fiber-optic cable. It carries the mechanical load during installation."
    },

    jacket: {
        number: "02",
        title: "OUTER JACKET",
        description:
            "The outer jacket protects the fiber unit from sunlight, moisture, abrasion and environmental conditions."
    },

    web: {
        number: "03",
        title: "WEB",
        description:
            "The web permanently connects the steel messenger to the optical fiber cable, creating the figure-8 structure."
    },

    aramid: {
        number: "04",
        title: "ARAMID YARN",
        description:
            "Aramid yarn provides additional tensile strength and mechanical protection around the loose tube."
    },

    tube: {
        number: "05",
        title: "LOOSE TUBE",
        description:
            "The loose tube is the larger protective tube that contains the individual buffer tubes. It provides protection while allowing the internal elements to move slightly."
    },

    buffer: {
        number: "06",
        title: "BUFFER TUBES",
        description:
            "The buffer tubes are the individual colored protective tubes inside the loose tube. Each buffer tube contains optical fiber strands."
    },

    fiber: {
        number: "07",
        title: "FIBERS",
        description:
            "The optical fibers are the very thin glass strands inside the buffer tubes. They carry information as pulses of light."
    }

};


// ======================================================
// INFO PANEL
// ======================================================

function showInfo(part) {

    const data = cableParts[part];

    if (!data) return;

    infoNumber.textContent = data.number;
    infoTitle.textContent = data.title;
    infoDescription.textContent = data.description;

    infoPanel.classList.add("active");
}


if (closeInfo) {

    closeInfo.addEventListener("click", () => {
        infoPanel.classList.remove("active");
    });

}


// ======================================================
// EXPLORE
// ======================================================

if (exploreButton) {

    exploreButton.addEventListener("click", () => {

        cableSection.scrollIntoView({
            behavior: "smooth"
        });

    });

}


// ======================================================
// THREE.JS
// ======================================================

if (typeof THREE === "undefined") {

    console.error("Three.js failed to load.");

} else {

    createCable();

}


// ======================================================
// CREATE CABLE
// ======================================================

function createCable() {

    const container =
        document.getElementById("cable3D");

    if (!container) return;


    // ==================================================
    // SCENE
    // ==================================================

    const scene =
        new THREE.Scene();

    scene.background =
        new THREE.Color(0x070a0e);


    // ==================================================
    // CAMERA
    // ==================================================

    const camera =
        new THREE.PerspectiveCamera(
            38,
            container.clientWidth /
                container.clientHeight,
            0.1,
            100
        );

    camera.position.set(
        0,
        1,
        14
    );

    camera.lookAt(
        0.4,
        0.45,
        0
    );


    // ==================================================
    // RENDERER
    // ==================================================

    const renderer =
        new THREE.WebGLRenderer({
            antialias: true
        });

    renderer.setPixelRatio(
        Math.min(
            window.devicePixelRatio,
            2
        )
    );

    renderer.setSize(
        container.clientWidth,
        container.clientHeight
    );

    renderer.outputColorSpace =
        THREE.SRGBColorSpace;

    container.appendChild(
        renderer.domElement
    );


    // ==================================================
    // LIGHTING
    // ==================================================

    scene.add(
        new THREE.AmbientLight(
            0xffffff,
            1.6
        )
    );


    const keyLight =
        new THREE.DirectionalLight(
            0xffffff,
            3.5
        );

    keyLight.position.set(
        4,
        7,
        10
    );

    scene.add(keyLight);


    const fillLight =
        new THREE.DirectionalLight(
            0x58caff,
            2
        );

    fillLight.position.set(
        -5,
        2,
        7
    );

    scene.add(fillLight);


    const glowLight =
        new THREE.PointLight(
            0x168fff,
            8,
            25
        );

    glowLight.position.set(
        2,
        0,
        5
    );

    scene.add(glowLight);


    // ==================================================
    // MASTER CABLE
    // ==================================================

    const cable =
        new THREE.Group();

    scene.add(cable);


    // ==================================================
    // MATERIALS
    // ==================================================

    const steelMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x9aa3a8,
            metalness: 0.92,
            roughness: 0.23
        });


    const jacketMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x111519,
            metalness: 0.03,
            roughness: 0.43
        });


    const webMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x171d21,
            roughness: 0.48
        });


    const aramidMaterial =
        new THREE.MeshStandardMaterial({
            color: 0xd9ae2f,
            roughness: 0.72
        });


    const looseTubeMaterial =
        new THREE.MeshPhysicalMaterial({
            color: 0xe8ecee,
            roughness: 0.25,
            metalness: 0.02,
            transparent: true,
            opacity: 0.28,
            transmission: 0.15,
            depthWrite: false
        });


    // ==================================================
    // PART GROUP
    // ==================================================

    function partGroup(name) {

        const group =
            new THREE.Group();

        group.userData.part =
            name;

        cable.add(group);

        return group;

    }


    // ==================================================
    // CYLINDER ALONG X
    // ==================================================

    function cylinder(
        radius,
        length,
        material,
        segments = 64
    ) {

        const geometry =
            new THREE.CylinderGeometry(
                radius,
                radius,
                length,
                segments
            );

        const mesh =
            new THREE.Mesh(
                geometry,
                material
            );

        mesh.rotation.z =
            Math.PI / 2;

        return mesh;

    }


    // ==================================================
    // 01 — STEEL MESSENGER
    // ==================================================

    const messengerGroup =
        partGroup("messenger");


    const messenger =
        cylinder(
            0.40,
            4.5,
            steelMaterial
        );

    messenger.position.x =
        -2.25;

    messengerGroup.add(
        messenger
    );


    // ==================================================
    // ACTUAL STEEL MESSENGER STRANDS
    // ==================================================

    const messengerSteelMaterial =
        new THREE.MeshStandardMaterial({
            color: 0xd7dadd,
            metalness: 0.96,
            roughness: 0.18
        });


    const messengerSteelHighlight =
        new THREE.MeshStandardMaterial({
            color: 0xf1f2f3,
            metalness: 0.98,
            roughness: 0.12
        });


    function createMessengerSteelStrand(
        angle,
        material
    ) {

        const points = [];

        const segments = 100;
        const wireRadius = 0.072;
        const layRadius = 0.205;
        const turns = 4.0;


        for (
            let i = 0;
            i <= segments;
            i++
        ) {

            const t =
                i / segments;

            const x =
                t * 4.5;

            const a =
                angle +
                t *
                Math.PI *
                2 *
                turns;


            points.push(
                new THREE.Vector3(
                    x,
                    Math.cos(a) *
                        layRadius,
                    Math.sin(a) *
                        layRadius
                )
            );

        }


        const curve =
            new THREE.CatmullRomCurve3(
                points
            );


        const geometry =
            new THREE.TubeGeometry(
                curve,
                segments,
                wireRadius,
                12,
                false
            );


        const strand =
            new THREE.Mesh(
                geometry,
                material
            );


        strand.raycast =
            () => {};


        messengerGroup.add(
            strand
        );

    }


    for (
        let i = 0;
        i < 6;
        i++
    ) {

        createMessengerSteelStrand(
            (Math.PI * 2 / 6) * i,
            i % 2 === 0
                ? messengerSteelMaterial
                : messengerSteelHighlight
        );

    }


    const centerMessengerSteel =
        cylinder(
            0.072,
            4.5,
            messengerSteelHighlight
        );

    centerMessengerSteel.position.x =
        2.25;

    centerMessengerSteel.raycast =
        () => {};

    messengerGroup.add(
        centerMessengerSteel
    );


    messengerGroup.position.y =
        1.55;


    // ==================================================
    // CONSTRUCTION RINGS
    // ==================================================

    for (
        let i = 0;
        i < 13;
        i++
    ) {

        const ring =
            new THREE.Mesh(
                new THREE.TorusGeometry(
                    0.405,
                    0.018,
                    8,
                    32
                ),
                steelMaterial
            );

        ring.rotation.y =
            Math.PI / 2;

        ring.position.x =
            -4.15 +
            i * 0.69;

        messengerGroup.add(
            ring
        );

    }


    // ==================================================
    // 02 — OUTER JACKET
    // ==================================================

    const jacketGroup =
        partGroup("jacket");


    const jacket =
        cylinder(
            0.82,
            5.4,
            jacketMaterial
        );

    jacket.position.x =
        -1.8;

    jacketGroup.add(
        jacket
    );


    const jacketEdge =
        new THREE.Mesh(
            new THREE.TorusGeometry(
                0.82,
                0.035,
                16,
                64
            ),
            jacketMaterial
        );

    jacketEdge.rotation.y =
        Math.PI / 2;

    jacketEdge.position.x =
        0.9;

    jacketGroup.add(
        jacketEdge
    );


    // ==================================================
    // 03 — WEB
    // ==================================================

    const webGroup =
        partGroup("web");


    const web =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                9,
                0.34,
                0.60
            ),
            webMaterial
        );

    webGroup.add(
        web
    );


    webGroup.position.y =
        0.82;


    const webEnd =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                0.25,
                0.42,
                0.68
            ),
            webMaterial
        );

    webEnd.position.x =
        0.9;

    webGroup.add(
        webEnd
    );


    // ==================================================
    // 04 — ARAMID YARN
    // ==================================================

    const aramidGroup =
        partGroup("aramid");


    const tubeStart =
        0.85;

    const tubeEnd =
        4.15;

    const tubeLength =
        tubeEnd -
        tubeStart;


    const yarnRadius =
        0.57;

    const yarnCount =
        12;

    const yarnTurns =
        3.8;


    for (
        let strandIndex = 0;
        strandIndex < yarnCount;
        strandIndex++
    ) {

        const points = [];

        const phase =
            (
                strandIndex /
                yarnCount
            ) *
            Math.PI *
            2;


        const samples =
            100;


        for (
            let i = 0;
            i <= samples;
            i++
        ) {

            const t =
                i / samples;

            const x =
                tubeStart +
                t *
                tubeLength;

            const angle =
                phase +
                t *
                yarnTurns *
                Math.PI *
                2;


            points.push(
                new THREE.Vector3(
                    x,
                    Math.cos(angle) *
                        yarnRadius,
                    Math.sin(angle) *
                        yarnRadius
                )
            );

        }


        const curve =
            new THREE.CatmullRomCurve3(
                points
            );


        const geometry =
            new THREE.TubeGeometry(
                curve,
                100,
                0.022,
                8,
                false
            );


        aramidGroup.add(
            new THREE.Mesh(
                geometry,
                aramidMaterial
            )
        );

    }


    // ==================================================
    // 05 — LOOSE TUBE
    // ==================================================

    const tubeGroup =
        partGroup("tube");


    const looseTube =
        cylinder(
            0.43,
            tubeLength,
            looseTubeMaterial,
            96
        );


    looseTube.position.x =
        (
            tubeStart +
            tubeEnd
        ) / 2;


    tubeGroup.add(
        looseTube
    );


    const tubeOpening =
        new THREE.Mesh(
            new THREE.TorusGeometry(
                0.43,
                0.035,
                16,
                64
            ),
            new THREE.MeshStandardMaterial({
                color: 0xf0f2f3,
                roughness: 0.30
            })
        );


    tubeOpening.rotation.y =
        Math.PI / 2;

    tubeOpening.position.x =
        tubeEnd;

    tubeGroup.add(
        tubeOpening
    );


    // ==================================================
    // 06 — BUFFER TUBES
    // ==================================================

    const bufferGroup =
        partGroup("buffer");


    const bufferColors = [

        0xff7b22,
        0x239fff,
        0x32dc70,
        0xffd42d,
        0xb55cff,
        0xff416c,
        0x18d9c9,
        0xf1f1f1

    ];


    const bufferPositions = [

        [-0.18, 0.18],
        [ 0.18, 0.18],
        [-0.18,-0.18],
        [ 0.18,-0.18],
        [-0.11, 0],
        [ 0.11, 0],
        [ 0, 0.11],
        [ 0,-0.11]

    ];


    bufferColors.forEach(
        (color, index) => {

            const y =
                bufferPositions[index][0];

            const z =
                bufferPositions[index][1];


            const material =
                new THREE.MeshStandardMaterial({

                    color: color,

                    roughness: 0.35,

                    metalness: 0.02,

                    transparent: true,

                    opacity: 0.82

                });


            const buffer =
                cylinder(
                    0.095,
                    tubeLength,
                    material,
                    32
                );


            buffer.position.x =
                tubeStart +
                tubeLength / 2;

            buffer.position.y =
                y;

            buffer.position.z =
                z;


            bufferGroup.add(
                buffer
            );


            const end =
                new THREE.Mesh(
                    new THREE.TorusGeometry(
                        0.095,
                        0.012,
                        10,
                        24
                    ),
                    material
                );


            end.rotation.y =
                Math.PI / 2;

            end.position.x =
                tubeEnd;

            end.position.y =
                y;

            end.position.z =
                z;


            bufferGroup.add(
                end
            );

        }
    );


    // ==================================================
    // 07 — FIBERS
    // ==================================================

    const fiberGroup =
        partGroup("fiber");


    const fiberLength =
        1.65;


    bufferColors.forEach(
        (color, index) => {

            const y =
                bufferPositions[index][0];

            const z =
                bufferPositions[index][1];


            const fiber =
                cylinder(
                    0.026,
                    fiberLength,
                    new THREE.MeshBasicMaterial({
                        color: color
                    }),
                    20
                );


            fiber.position.x =
                tubeEnd +
                fiberLength / 2;

            fiber.position.y =
                y;

            fiber.position.z =
                z;

            fiber.userData.part =
                "fiber";


            fiberGroup.add(
                fiber
            );


            const light =
                cylinder(
                    0.045,
                    0.32,
                    new THREE.MeshBasicMaterial({

                        color: 0xff1e1e,

                        transparent: true,

                        opacity: 0.95,

                        blending:
                            THREE.AdditiveBlending,

                        depthWrite: false

                    }),
                    16
                );


            light.position.y =
                y;

            light.position.z =
                z;

            light.userData.part =
                "fiber";

            light.userData.lightFiber =
                true;

            light.userData.offset =
                index * 0.12;


            fiberGroup.add(
                light
            );

        }
    );


    // ==================================================
    // FIBER END CAPS
    // ==================================================

    bufferColors.forEach(
        (color, index) => {

            const end =
                new THREE.Mesh(
                    new THREE.SphereGeometry(
                        0.028,
                        16,
                        16
                    ),
                    new THREE.MeshBasicMaterial({
                        color: color
                    })
                );


            end.position.x =
                tubeEnd +
                fiberLength;

            end.position.y =
                bufferPositions[index][0];

            end.position.z =
                bufferPositions[index][1];

            end.userData.part =
                "fiber";


            fiberGroup.add(
                end
            );

        }
    );


    // ==================================================
    // MODEL POSITION
    // ==================================================

    cable.position.set(
        -0.45,
        -0.15,
        0
    );


    cable.rotation.z =
        THREE.MathUtils.degToRad(-4);

    cable.rotation.y =
        THREE.MathUtils.degToRad(-7);


    // ==================================================
    // RAYCASTING
    // ==================================================

    const raycaster =
        new THREE.Raycaster();

    const mouse =
        new THREE.Vector2();


    function updateMouse(event) {

        const rect =
            renderer.domElement
                .getBoundingClientRect();


        mouse.x =
            (
                (
                    event.clientX -
                    rect.left
                ) /
                rect.width
            ) * 2 - 1;


        mouse.y =
            -(
                (
                    event.clientY -
                    rect.top
                ) /
                rect.height
            ) * 2 + 1;

    }


    function findPart(object) {

        while (
            object &&
            object !== scene
        ) {

            if (
                object.userData &&
                object.userData.part
            ) {

                return object.userData.part;

            }

            object =
                object.parent;

        }

        return null;

    }


    function getPart(event) {

        updateMouse(event);


        raycaster.setFromCamera(
            mouse,
            camera
        );


        const hits =
            raycaster.intersectObject(
                cable,
                true
            );


        if (!hits.length)
            return null;


        for (
            let i = 0;
            i < hits.length;
            i++
        ) {

            if (
                findPart(
                    hits[i].object
                ) === "fiber"
            ) {

                return "fiber";

            }

        }


        for (
            let i = 0;
            i < hits.length;
            i++
        ) {

            if (
                findPart(
                    hits[i].object
                ) === "buffer"
            ) {

                return "buffer";

            }

        }


        for (
            let i = 0;
            i < hits.length;
            i++
        ) {

            const part =
                findPart(
                    hits[i].object
                );


            if (part)
                return part;

        }


        return null;

    }


    // ==================================================
    // HIGHLIGHT
    // ==================================================

    function highlight(
        part,
        active
    ) {

        cable.traverse(
            (object) => {

                if (
                    object.userData &&
                    object.userData.part ===
                        part
                ) {

                    if (
                        object.material &&
                        object.material.emissive
                    ) {

                        object.material.emissive.set(
                            0x35cfff
                        );

                        object.material.emissiveIntensity =
                            active
                                ? 1.8
                                : 0;

                    }

                    else if (
                        object.material &&
                        object.material.color &&
                        !object.userData.lightFiber
                    ) {

                        if (
                            !object.userData.originalColor
                        ) {

                            object.userData.originalColor =
                                object.material.color.clone();

                        }


                        if (active) {

                            object.material.color.set(
                                0x35cfff
                            );

                        }

                        else {

                            object.material.color.copy(
                                object.userData.originalColor
                            );

                        }

                    }

                }

            }
        );

    }


    // ==================================================
    // SELECTED PART
    // ==================================================

    let selectedPart =
        null;

    let hovered =
        null;


    // ==================================================
    // 3D CLICK
    // ==================================================

    renderer.domElement.addEventListener(
        "click",
        (event) => {

            const part =
                getPart(event);


            if (!part)
                return;


            if (
                selectedPart &&
                selectedPart !== part
            ) {

                highlight(
                    selectedPart,
                    false
                );

            }


            selectedPart =
                part;


            highlight(
                selectedPart,
                true
            );


            showInfo(part);

        }
    );


    // ==================================================
    // 3D HOVER
    // ==================================================

    renderer.domElement.addEventListener(
        "pointermove",
        (event) => {

            const part =
                getPart(event);


            if (
                part !== hovered
            ) {

                if (
                    hovered &&
                    hovered !== selectedPart
                ) {

                    highlight(
                        hovered,
                        false
                    );

                }


                if (
                    part &&
                    part !== selectedPart
                ) {

                    highlight(
                        part,
                        true
                    );

                }


                renderer.domElement.style.cursor =
                    part
                        ? "pointer"
                        : "grab";


                hovered =
                    part;

            }

        }
    );


    // ==================================================
    // ANATOMY → 3D CONNECTION
    // ==================================================

    window.spectrumSelectPart =
        function(part) {

            if (!part)
                return;


            if (
                selectedPart &&
                selectedPart !== part
            ) {

                highlight(
                    selectedPart,
                    false
                );

            }


            selectedPart =
                part;


            highlight(
                part,
                true
            );


            showInfo(part);

        };


    // ==================================================
    // DRAG ROTATION
    // ==================================================

    let dragging =
        false;

    let previousX =
        0;

    let previousY =
        0;


    renderer.domElement.addEventListener(
        "pointerdown",
        (event) => {

            dragging =
                true;

            previousX =
                event.clientX;

            previousY =
                event.clientY;

            renderer.domElement.setPointerCapture(
                event.pointerId
            );

        }
    );


    renderer.domElement.addEventListener(
        "pointermove",
        (event) => {

            if (!dragging)
                return;


            const dx =
                event.clientX -
                previousX;

            const dy =
                event.clientY -
                previousY;


            cable.rotation.y +=
                dx * 0.006;

            cable.rotation.x +=
                dy * 0.003;


            previousX =
                event.clientX;

            previousY =
                event.clientY;

        }
    );


    renderer.domElement.addEventListener(
        "pointerup",
        (event) => {

            dragging =
                false;


            try {

                renderer.domElement
                    .releasePointerCapture(
                        event.pointerId
                    );

            }

            catch (e) {}

        }
    );


    // ==================================================
    // ZOOM
    // ==================================================

    renderer.domElement.addEventListener(
        "wheel",
        (event) => {

            event.preventDefault();


            camera.position.z +=
                event.deltaY * 0.008;


            camera.position.z =
                THREE.MathUtils.clamp(
                    camera.position.z,
                    7,
                    18
                );

        },
        {
            passive: false
        }
    );


    // ==================================================
    // ==================================================
    // EXPLODED VIEW
    // ==================================================
    // ONLY NEW FEATURE
    // ==================================================

    let exploded =
        false;


    const originalPositions = {

        messenger:
            messengerGroup.position.clone(),

        jacket:
            jacketGroup.position.clone(),

        web:
            webGroup.position.clone(),

        aramid:
            aramidGroup.position.clone(),

        tube:
            tubeGroup.position.clone(),

        buffer:
            bufferGroup.position.clone(),

        fiber:
            fiberGroup.position.clone()

    };


    const explodePositions = {

        messenger:
            new THREE.Vector3(
                0,
                3.5,
                0
            ),

        jacket:
            new THREE.Vector3(
                0,
                1.8,
                0
            ),

        web:
            new THREE.Vector3(
                0,
                0.8,
                0
            ),

        aramid:
            new THREE.Vector3(
                0,
                -0.8,
                0
            ),

        tube:
            new THREE.Vector3(
                0,
                -2.0,
                0
            ),

        buffer:
            new THREE.Vector3(
                0,
                -3.1,
                0
            ),

        fiber:
            new THREE.Vector3(
                0,
                -4.1,
                0
            )

    };


    const explodeButton =
        document.createElement(
            "button"
        );


    explodeButton.id =
        "explodeViewButton";


    explodeButton.textContent =
        "EXPLODE VIEW";


    explodeButton.style.cssText = `

        position:absolute;
        left:50%;
        bottom:24px;
        transform:translateX(-50%);

        z-index:20;

        padding:12px 22px;

        border:1px solid
            rgba(
                88,
                202,
                255,
                0.45
            );

        border-radius:8px;

        background:
            rgba(
                7,
                10,
                14,
                0.82
            );

        color:#ffffff;

        font-family:inherit;

        font-size:11px;

        letter-spacing:2px;

        cursor:pointer;

        backdrop-filter:blur(8px);

        transition:
            background .25s ease,
            border-color .25s ease,
            box-shadow .25s ease;

    `;


    explodeButton.addEventListener(
        "mouseenter",
        () => {

            explodeButton.style.background =
                "rgba(88,202,255,0.12)";

            explodeButton.style.borderColor =
                "rgba(88,202,255,0.8)";

            explodeButton.style.boxShadow =
                "0 0 20px rgba(88,202,255,0.12)";

        }
    );


    explodeButton.addEventListener(
        "mouseleave",
        () => {

            explodeButton.style.background =
                "rgba(7,10,14,0.82)";

            explodeButton.style.borderColor =
                "rgba(88,202,255,0.45)";

            explodeButton.style.boxShadow =
                "none";

        }
    );


    container.style.position =
        "relative";


    container.appendChild(
        explodeButton
    );


    // ==================================================
    // EXPLODE / ASSEMBLE
    // ==================================================

    explodeButton.addEventListener(
        "click",
        () => {

            exploded =
                !exploded;


            const targets =
                exploded
                    ? explodePositions
                    : originalPositions;


            const duration =
                700;

            const start =
                performance.now();


            const startPositions = {

                messenger:
                    messengerGroup.position.clone(),

                jacket:
                    jacketGroup.position.clone(),

                web:
                    webGroup.position.clone(),

                aramid:
                    aramidGroup.position.clone(),

                tube:
                    tubeGroup.position.clone(),

                buffer:
                    bufferGroup.position.clone(),

                fiber:
                    fiberGroup.position.clone()

            };


            function animateExplosion(
                now
            ) {

                const progress =
                    Math.min(
                        (
                            now -
                            start
                        ) /
                        duration,
                        1
                    );


                const eased =
                    1 -
                    Math.pow(
                        1 -
                        progress,
                        3
                    );


                const groups = {

                    messenger:
                        messengerGroup,

                    jacket:
                        jacketGroup,

                    web:
                        webGroup,

                    aramid:
                        aramidGroup,

                    tube:
                        tubeGroup,

                    buffer:
                        bufferGroup,

                    fiber:
                        fiberGroup

                };


                Object.keys(
                    groups
                ).forEach(
                    (key) => {

                        groups[key]
                            .position
                            .lerpVectors(
                                startPositions[key],
                                targets[key],
                                eased
                            );

                    }
                );


                if (
                    progress <
                    1
                ) {

                    requestAnimationFrame(
                        animateExplosion
                    );

                }

            }


            requestAnimationFrame(
                animateExplosion
            );


            explodeButton.textContent =
                exploded
                    ? "ASSEMBLE VIEW"
                    : "EXPLODE VIEW";

        }
    );


    // ==================================================
    // RESIZE
    // ==================================================

    window.addEventListener(
        "resize",
        () => {

            const width =
                container.clientWidth;

            const height =
                container.clientHeight;


            camera.aspect =
                width /
                height;

            camera.updateProjectionMatrix();


            renderer.setSize(
                width,
                height
            );

        }
    );


    // ==================================================
    // ANIMATION
    // ==================================================

    let time =
        0;


    function animate() {

        requestAnimationFrame(
            animate
        );


        time +=
            0.018;


        // RED LIGHT

        fiberGroup.traverse(
            (object) => {

                if (
                    object.userData &&
                    object.userData.lightFiber
                ) {

                    const progress =
                        (
                            time * 0.65 +
                            object.userData.offset
                        ) % 1;


                    object.position.x =
                        tubeEnd +
                        progress *
                        fiberLength;


                    const pulse =
                        0.75 +
                        Math.sin(
                            time * 8 +
                            object.userData.offset
                        ) *
                        0.25;


                    object.scale.set(
                        pulse,
                        pulse,
                        pulse
                    );

                }

            }
        );


        // FIBER END GLOW

        fiberGroup.traverse(
            (object) => {

                if (
                    object.geometry &&
                    object.geometry.type ===
                        "SphereGeometry"
                ) {

                    object.scale.setScalar(
                        1 +
                        Math.sin(
                            time * 5
                        ) *
                        0.18
                    );

                }

            }
        );


        renderer.render(
            scene,
            camera
        );

    }


    animate();

}


// ======================================================
// CABLE ANATOMY
// ======================================================

(function createCableAnatomy() {

    if (
        document.getElementById(
            "spectrumAnatomy"
        )
    ) {
        return;
    }


    const anatomy =
        document.createElement(
            "section"
        );

    anatomy.id =
        "spectrumAnatomy";


    anatomy.innerHTML = `

        <div class="anatomy-wrap">

            <div class="anatomy-heading">

                <div class="anatomy-eyebrow">
                    CABLE ANATOMY
                </div>

                <h2>
                    FROM OUTSIDE
                    <span>TO INSIDE</span>
                </h2>

                <p>
                    Explore the seven main components
                    of the aerial figure-8 fiber-optic cable.
                </p>

            </div>


            <div class="anatomy-grid">

                <div
                    class="anatomy-item"
                    data-part="messenger"
                >
                    <div class="anatomy-number">
                        01
                    </div>

                    <div class="anatomy-title">
                        STEEL MESSENGER
                    </div>

                    <div class="anatomy-description">
                        Supporting wire that carries
                        the mechanical load.
                    </div>
                </div>


                <div
                    class="anatomy-item"
                    data-part="jacket"
                >
                    <div class="anatomy-number">
                        02
                    </div>

                    <div class="anatomy-title">
                        OUTER JACKET
                    </div>

                    <div class="anatomy-description">
                        Protects the cable from
                        environmental conditions.
                    </div>
                </div>


                <div
                    class="anatomy-item"
                    data-part="web"
                >
                    <div class="anatomy-number">
                        03
                    </div>

                    <div class="anatomy-title">
                        WEB
                    </div>

                    <div class="anatomy-description">
                        Connects the messenger
                        to the optical cable.
                    </div>
                </div>


                <div
                    class="anatomy-item"
                    data-part="aramid"
                >
                    <div class="anatomy-number">
                        04
                    </div>

                    <div class="anatomy-title">
                        ARAMID YARN
                    </div>

                    <div class="anatomy-description">
                        Provides additional
                        tensile strength.
                    </div>
                </div>


                <div
                    class="anatomy-item"
                    data-part="tube"
                >
                    <div class="anatomy-number">
                        05
                    </div>

                    <div class="anatomy-title">
                        LOOSE TUBE
                    </div>

                    <div class="anatomy-description">
                        Large protective tube
                        surrounding the buffer tubes.
                    </div>
                </div>


                <div
                    class="anatomy-item"
                    data-part="buffer"
                >
                    <div class="anatomy-number">
                        06
                    </div>

                    <div class="anatomy-title">
                        BUFFER TUBES
                    </div>

                    <div class="anatomy-description">
                        Individual colored tubes
                        containing the fibers.
                    </div>
                </div>


                <div
                    class="anatomy-item"
                    data-part="fiber"
                >
                    <div class="anatomy-number">
                        07
                    </div>

                    <div class="anatomy-title">
                        FIBERS
                    </div>

                    <div class="anatomy-description">
                        Very thin glass strands
                        carrying information as light.
                    </div>
                </div>

            </div>

        </div>

    `;


    if (
        cableSection &&
        cableSection.parentNode
    ) {

        cableSection.parentNode.insertBefore(
            anatomy,
            cableSection.nextSibling
        );

    }


    const anatomyStyle =
        document.createElement(
            "style"
        );


    anatomyStyle.textContent = `

        #spectrumAnatomy {
            padding:120px 20px;
            background:
                linear-gradient(
                    180deg,
                    #070a0e 0%,
                    #090d12 100%
                );
        }

        .anatomy-wrap {
            max-width:1100px;
            margin:auto;
        }

        .anatomy-heading {
            text-align:center;
            margin-bottom:60px;
        }

        .anatomy-eyebrow {
            font-size:11px;
            letter-spacing:5px;
            color:#58caff;
            margin-bottom:18px;
        }

        .anatomy-heading h2 {
            margin:0;
            font-size:
                clamp(36px,7vw,76px);
            line-height:.95;
            letter-spacing:-2px;
            color:#ffffff;
        }

        .anatomy-heading h2 span {
            color:#58caff;
        }

        .anatomy-heading p {
            max-width:580px;
            margin:25px auto 0;
            color:#8e9aa3;
            line-height:1.7;
            font-size:15px;
        }

        .anatomy-grid {
            display:grid;
            grid-template-columns:
                repeat(
                    auto-fit,
                    minmax(220px,1fr)
                );
            gap:14px;
        }

        .anatomy-item {
            position:relative;
            padding:26px;
            min-height:175px;
            border:1px solid
                rgba(255,255,255,.08);
            border-radius:14px;
            background:
                rgba(255,255,255,.015);
            cursor:pointer;
            transition:
                border-color .25s ease,
                background .25s ease,
                transform .25s ease,
                box-shadow .25s ease;
        }

        .anatomy-item:hover {
            border-color:
                rgba(88,202,255,.55);
            background:
                rgba(88,202,255,.035);
            transform:
                translateY(-3px);
        }

        .anatomy-item.anatomy-active {
            border-color:
                rgba(88,202,255,.8);
            background:
                rgba(88,202,255,.07);
            box-shadow:
                0 0 28px
                rgba(88,202,255,.08);
        }

        .anatomy-number {
            font-size:11px;
            letter-spacing:3px;
            color:#58caff;
            margin-bottom:20px;
        }

        .anatomy-active
        .anatomy-number {
            color:#ffffff;
        }

        .anatomy-title {
            font-size:15px;
            letter-spacing:1.5px;
            color:#ffffff;
            margin-bottom:12px;
        }

        .anatomy-description {
            color:#7f8b94;
            font-size:13px;
            line-height:1.6;
        }

        @media (max-width:600px) {

            #spectrumAnatomy {
                padding:80px 16px;
            }

            .anatomy-grid {
                grid-template-columns:1fr;
            }

        }

    `;


    document.head.appendChild(
        anatomyStyle
    );


    // ==================================================
    // ANATOMY CLICK
    // ==================================================

    document
        .querySelectorAll(
            ".anatomy-item"
        )
        .forEach(
            (item) => {

                item.addEventListener(
                    "click",
                    function() {

                        const part =
                            this.getAttribute(
                                "data-part"
                            );


                        document
                            .querySelectorAll(
                                ".anatomy-item"
                            )
                            .forEach(
                                (card) => {

                                    card.classList.remove(
                                        "anatomy-active"
                                    );

                                }
                            );


                        this.classList.add(
                            "anatomy-active"
                        );


                        if (
                            typeof window
                                .spectrumSelectPart ===
                            "function"
                        ) {

                            window
                                .spectrumSelectPart(
                                    part
                                );

                        }


                        if (
                            cableSection
                        ) {

                            setTimeout(
                                () => {

                                    cableSection.scrollIntoView({
                                        behavior:
                                            "smooth",
                                        block:
                                            "center"
                                    });

                                },
                                150
                            );

                        }

                    }
                );

            }
        );

})();


// ======================================================
// KNOWLEDGE CHECK
// ======================================================

(function createQuiz() {

    if (
        document.getElementById(
            "spectrumQuiz"
        )
    ) {
        return;
    }


    const quiz =
        document.createElement(
            "section"
        );

    quiz.id =
        "spectrumQuiz";


    quiz.innerHTML = `

        <div class="quiz-wrap">

            <div class="quiz-heading">

                <div class="quiz-eyebrow">
                    KNOWLEDGE CHECK
                </div>

                <h2>
                    HOW WELL DO YOU
                    <span>KNOW FIBER?</span>
                </h2>

                <p>
                    Five random questions.
                    One perfect score.
                </p>

            </div>


            <div class="quiz-card">

                <div class="quiz-progress">
                    QUESTION
                    <span id="quizQuestionNumber">
                        1
                    </span>
                    / 5
                </div>

                <h3 id="quizQuestion">
                </h3>

                <div
                    id="quizOptions"
                    class="quiz-options"
                >
                </div>

                <button
                    id="quizNext"
                    class="quiz-next"
                >
                    NEXT
                </button>

            </div>


            <div
                id="quizResult"
                class="quiz-result"
            >

                <div
                    id="quizScore"
                    class="quiz-score"
                >
                </div>

                <button
                    id="quizRetry"
                    class="quiz-next"
                >
                    TRY AGAIN
                </button>

            </div>

        </div>

    `;


    const anatomySection =
        document.getElementById(
            "spectrumAnatomy"
        );


    if (
        anatomySection &&
        anatomySection.parentNode
    ) {

        anatomySection.parentNode.insertBefore(
            quiz,
            anatomySection.nextSibling
        );

    }


    const quizStyle =
        document.createElement(
            "style"
        );


    quizStyle.textContent = `

        #spectrumQuiz {
            padding:120px 20px;
            background:#070a0e;
        }

        .quiz-wrap {
            max-width:760px;
            margin:auto;
        }

        .quiz-heading {
            text-align:center;
            margin-bottom:50px;
        }

        .quiz-eyebrow {
            font-size:11px;
            letter-spacing:5px;
            color:#58caff;
            margin-bottom:18px;
        }

        .quiz-heading h2 {
            margin:0;
            font-size:
                clamp(34px,7vw,68px);
            line-height:.95;
            color:#ffffff;
            letter-spacing:-2px;
        }

        .quiz-heading h2 span {
            color:#58caff;
        }

        .quiz-heading p {
            color:#8e9aa3;
            margin-top:22px;
        }

        .quiz-card,
        .quiz-result {
            border:1px solid
                rgba(255,255,255,.08);
            border-radius:18px;
            padding:35px;
            background:
                rgba(255,255,255,.02);
        }

        .quiz-progress {
            font-size:11px;
            letter-spacing:3px;
            color:#58caff;
            margin-bottom:25px;
        }

        #quizQuestion {
            color:#ffffff;
            font-size:
                clamp(22px,4vw,32px);
            line-height:1.3;
            margin:
                0 0 28px;
        }

        .quiz-options {
            display:grid;
            gap:10px;
        }

        .quiz-option {
            width:100%;
            padding:17px 18px;
            border:1px solid
                rgba(255,255,255,.08);
            border-radius:10px;
            background:
                rgba(255,255,255,.025);
            color:#ffffff;
            text-align:left;
            cursor:pointer;
            transition:.2s ease;
        }

        .quiz-option:hover {
            border-color:
                rgba(88,202,255,.6);
        }

        .quiz-option.selected {
            border-color:#58caff;
            background:
                rgba(88,202,255,.08);
        }

        .quiz-next {
            margin-top:25px;
            border:1px solid
                rgba(88,202,255,.5);
            background:
                rgba(88,202,255,.08);
            color:#ffffff;
            padding:13px 24px;
            border-radius:8px;
            cursor:pointer;
            letter-spacing:2px;
            font-size:11px;
        }

        .quiz-next:hover {
            background:
                rgba(88,202,255,.16);
        }

        .quiz-result {
            display:none;
            text-align:center;
        }

        .quiz-score {
            color:#ffffff;
            font-size:60px;
            line-height:1;
        }

        @media (max-width:600px) {

            #spectrumQuiz {
                padding:80px 16px;
            }

            .quiz-card,
            .quiz-result {
                padding:24px;
            }

        }

    `;


    document.head.appendChild(
        quizStyle
    );


    // ==================================================
    // QUESTION POOL
    // ==================================================

    const questionPool = [

        {
            q:
                "What is the main purpose of the steel messenger?",
            options: [
                "Carry mechanical load",
                "Carry light signals",
                "Protect glass fibers",
                "Hold the colors"
            ],
            answer:0
        },

        {
            q:
                "What protects the cable from sunlight and moisture?",
            options: [
                "Web",
                "Outer jacket",
                "Fiber",
                "Buffer tube"
            ],
            answer:1
        },

        {
            q:
                "What connects the steel messenger to the cable body?",
            options: [
                "Aramid yarn",
                "Loose tube",
                "Web",
                "Fiber"
            ],
            answer:2
        },

        {
            q:
                "What provides additional tensile strength?",
            options: [
                "Aramid yarn",
                "Outer jacket",
                "Fiber",
                "Loose tube"
            ],
            answer:0
        },

        {
            q:
                "What contains the individual buffer tubes?",
            options: [
                "Web",
                "Loose tube",
                "Steel messenger",
                "Outer jacket"
            ],
            answer:1
        },

        {
            q:
                "What is inside the loose tube?",
            options: [
                "Steel strands",
                "Buffer tubes",
                "Web",
                "Aramid yarn"
            ],
            answer:1
        },

        {
            q:
                "What is inside the buffer tubes?",
            options: [
                "Optical fibers",
                "Steel messenger",
                "Outer jacket",
                "Web"
            ],
            answer:0
        },

        {
            q:
                "What carries information as pulses of light?",
            options: [
                "Aramid yarn",
                "Web",
                "Optical fibers",
                "Outer jacket"
            ],
            answer:2
        },

        {
            q:
                "Which component is the larger protective tube?",
            options: [
                "Buffer tube",
                "Loose tube",
                "Web",
                "Messenger"
            ],
            answer:1
        },

        {
            q:
                "Which part creates the figure-8 structure?",
            options: [
                "Web",
                "Fiber",
                "Buffer tube",
                "Aramid yarn"
            ],
            answer:0
        },

        {
            q:
                "How are the buffer tubes visually distinguished?",
            options: [
                "By different colors",
                "By steel strands",
                "By labels only",
                "By different cables"
            ],
            answer:0
        },

        {
            q:
                "What is the smallest element shown inside the buffer tubes?",
            options: [
                "Loose tube",
                "Fiber strand",
                "Web",
                "Messenger"
            ],
            answer:1
        },

        {
            q:
                "What type of cable is being explored?",
            options: [
                "Aerial figure-8",
                "Coaxial",
                "Electrical",
                "Ribbon only"
            ],
            answer:0
        },

        {
            q:
                "What material forms the optical fibers?",
            options: [
                "Glass",
                "Steel",
                "Rubber",
                "Copper"
            ],
            answer:0
        },

        {
            q:
                "What is the correct order from outside toward the fibers?",
            options: [
                "Jacket → Aramid → Loose Tube → Buffer Tubes → Fibers",
                "Fibers → Jacket → Web → Messenger",
                "Web → Fibers → Jacket → Aramid",
                "Buffer Tubes → Jacket → Web → Fibers"
            ],
            answer:0
        }

    ];


    function shuffle(array) {

        return array
            .map(
                value => ({
                    value,
                    sort:Math.random()
                })
            )
            .sort(
                (a,b) =>
                    a.sort -
                    b.sort
            )
            .map(
                item =>
                    item.value
            );

    }


    let quizQuestions = [];
    let currentQuestion = 0;
    let score = 0;
    let selectedAnswer = null;


    const questionNumber =
        document.getElementById(
            "quizQuestionNumber"
        );

    const questionText =
        document.getElementById(
            "quizQuestion"
        );

    const optionsContainer =
        document.getElementById(
            "quizOptions"
        );

    const nextButton =
        document.getElementById(
            "quizNext"
        );

    const result =
        document.getElementById(
            "quizResult"
        );

    const scoreDisplay =
        document.getElementById(
            "quizScore"
        );

    const quizCard =
        document.querySelector(
            "#spectrumQuiz .quiz-card"
        );

    const retryButton =
        document.getElementById(
            "quizRetry"
        );


    function startQuiz() {

        quizQuestions =
            shuffle(
                questionPool
            ).slice(
                0,
                5
            );

        currentQuestion = 0;
        score = 0;
        selectedAnswer = null;

        quizCard.style.display =
            "block";

        result.style.display =
            "none";

        renderQuestion();

    }


    function renderQuestion() {

        const question =
            quizQuestions[
                currentQuestion
            ];


        questionNumber.textContent =
            currentQuestion + 1;


        questionText.textContent =
            question.q;


        optionsContainer.innerHTML =
            "";


        selectedAnswer =
            null;


        question.options.forEach(
            (option,index) => {

                const button =
                    document.createElement(
                        "button"
                    );


                button.className =
                    "quiz-option";


                button.textContent =
                    option;


                button.addEventListener(
                    "click",
                    () => {

                        document
                            .querySelectorAll(
                                ".quiz-option"
                            )
                            .forEach(
                                btn =>
                                    btn.classList.remove(
                                        "selected"
                                    )
                            );


                        button.classList.add(
                            "selected"
                        );


                        selectedAnswer =
                            index;

                    }
                );


                optionsContainer.appendChild(
                    button
                );

            }
        );


        nextButton.textContent =
            currentQuestion ===
            quizQuestions.length - 1
                ? "FINISH"
                : "NEXT";

    }


    nextButton.addEventListener(
        "click",
        () => {

            if (
                selectedAnswer ===
                null
            ) {
                return;
            }


            if (
                selectedAnswer ===
                quizQuestions[
                    currentQuestion
                ].answer
            ) {

                score++;

            }


            if (
                currentQuestion <
                quizQuestions.length - 1
            ) {

                currentQuestion++;

                renderQuestion();

            }

            else {

                showResult();

            }

        }
    );


    function showResult() {

        quizCard.style.display =
            "none";

        result.style.display =
            "block";


        if (
            score ===
            quizQuestions.length
        ) {

            scoreDisplay.innerHTML = `

                <div style="
                    font-size:12px;
                    letter-spacing:4px;
                    color:#58caff;
                    margin-bottom:18px;
                ">
                    🏆 PERFECT SCORE
                </div>

                <div style="
                    font-size:clamp(
                        48px,
                        10vw,
                        86px
                    );
                    line-height:1;
                    margin-bottom:28px;
                ">
                    ${score} /
                    ${quizQuestions.length}
                </div>

                <div style="
                    border:1px solid
                        rgba(
                            88,
                            202,
                            255,
                            .28
                        );
                    background:
                        rgba(
                            88,
                            202,
                            255,
                            .06
                        );
                    border-radius:14px;
                    padding:28px 22px;
                    margin-top:10px;
                ">

                    <div style="
                        font-size:12px;
                        letter-spacing:3px;
                        color:#58caff;
                        margin-bottom:12px;
                    ">
                        🎁 FREE SNACK
                    </div>

                    <div style="
                        font-size:18px;
                        line-height:1.5;
                        color:#ffffff;
                    ">
                        You earned a free snack!
                    </div>

                    <div style="
                        margin-top:10px;
                        font-size:14px;
                        line-height:1.6;
                        color:#8e9aa3;
                    ">
                        Present this perfect-score
                        screen to your teacher.
                    </div>

                    <div style="
                        margin-top:20px;
                        font-size:15px;
                        color:#ffffff;
                        letter-spacing:.5px;
                    ">
                        From
                        <strong>
                            Teacher Alexa S.
                        </strong>
                        &
                        <strong>
                            Sir Nico P.
                        </strong>
                    </div>

                </div>

            `;

        }

        else {

            scoreDisplay.innerHTML = `

                <div style="
                    font-size:12px;
                    letter-spacing:4px;
                    color:#58caff;
                    margin-bottom:18px;
                ">
                    QUIZ COMPLETE
                </div>

                <div>
                    ${score} /
                    ${quizQuestions.length}
                </div>

            `;

        }

    }


    retryButton.addEventListener(
        "click",
        startQuiz
    );


    startQuiz();

})();