/**
 * Toastr option setting
 */
const toastrOption = {
    typeColor: {
        success: "",
        warning: "",
        error: "",
    },
    position: ["top", "right"],
    icon: {
        success: "fa-light fa-circle-check",
        warning: "fa-light fa-triangle-exclamation",
        error: "fa-light fa-circle-exclamation",
    },
    font: {
        family: "",
        iconSize: "",
        textSize: "",
        color: "#fff",
        weight: "",
        style: "",
    },
    border: {
        border: "",
        borderRadius: "",
    },
    padding: "4px 8px",
    time: 3000,
};

/**
 *
 * @param {success | warning | error} type
 * @param {any message} message
 * @returns
 */
const toastr = function (type, message) {
    // Default value
    const typeDefault = ["success", "warning", "error"];
    const position = {
        positionX: ["left", "center", "right"],
        positionY: ["top", "middle", "bottom"],
    };
    const font = [];

    if (!typeDefault.includes(type)) {
        console.error("Toastr: type does not exist, please check again...");
        return;
    }

    function create() {
        let pattern = "";
        pattern += `<div class="toastr">`;
        pattern += `<div class="message">`;
        pattern += `<div class="message-icon">`;

        switch (type) {
            case "success":
                pattern += `<i class="${toastrOption.icon.success}"></i></div>`;
                break;

            case "warning":
                pattern += `<i class="${toastrOption.icon.warning}"></i></div>`;
                break;

            case "error":
                pattern += `<i class="${toastrOption.icon.error}"></i></div>`;
                break;
        }
        pattern += `<div class="message-content">${message}</div>`;
        pattern += `</div>`;
        pattern += `</div>`;
        return pattern;
    }
    function setOption() {
        // Create style tag
        const styleTag = document.createElement("style");

        // Get option
        let styleSetting = ``;
        if (toastrOption.typeColor.success)
            styleSetting += `.toastr.success{background: ${toastrOption.typeColor.success}} \n`;
        if (toastrOption.typeColor.warning)
            styleSetting += `.toastr.warning{background: ${toastrOption.typeColor.warning}} \n`;
        if (toastrOption.typeColor.error)
            styleSetting += `.toastr.error{background: ${toastrOption.typeColor.error}} \n`;
        if (
            toastrOption.position.length == 2 &&
            position.positionY.includes(toastrOption.position[0]) &&
            position.positionX.includes(toastrOption.position[1])
        ) {
            styleSetting += `.toastr {`;
            // Position
            toastrOption.position.forEach((value) => {
                switch (value) {
                    // Left
                    case position.positionX[0]:
                        styleSetting += `left: 2%; right: auto;\n`;
                        break;

                    case position.positionX[1]:
                        styleSetting += `left: 50%; right: auto; transform: translateX(-50%);\n`;
                        break;

                    case position.positionX[2]:
                        styleSetting += `left:auto; right: 2%;\n`;
                        break;

                    case position.positionY[0]:
                        styleSetting += `top: 2%; bottom: auto;\n`;
                        break;

                    case position.positionY[1]:
                        styleSetting += `top: 50%; bottom: auto; transform: translateY(-50%);\n`;
                        break;

                    case position.positionY[2]:
                        styleSetting += `top: auto; bottom: 2%;\n`;
                        break;
                }
            });
            // Border
            if (toastrOption.border)
                styleSetting += `border: ${toastrOption.border.border};\n`;
            // Border radius
            if (toastrOption.border)
                styleSetting += `border-radius: ${toastrOption.border.borderRadius};\n`;

            styleSetting += "}\n";
        }
        // Icon size
        if (toastrOption.font.iconSize)
            styleSetting += `.toastr .message .message-icon{font-size: ${toastrOption.font.iconSize};}\n`;
        // Font style
        styleSetting += `.toastr .message .message-content{`;
        // Color
        if (toastrOption.font.color)
            styleSetting += `color: ${toastrOption.font.color};\n`;
        // Font size
        if (toastrOption.font.textSize)
            styleSetting += `font-size: ${toastrOption.font.textSize};\n`;
        // Font weight
        if (toastrOption.font.weight)
            styleSetting += `font-size: ${toastrOption.font.weight};\n`;
        // Font weight
        if (toastrOption.font.family)
            styleSetting += `font-family: ${toastrOption.font.family};\n`;
        //End font style
        styleSetting += `}\n`;

        // Padding
        if(toastrOption.padding)
            styleSetting += `.toastr .message {padding: ${toastrOption.padding};}`

        // Set style for tag
        styleTag.innerHTML = styleSetting;
        document.querySelector("body").appendChild(styleTag);
    }
    function setStyle() {
        const linkTag = document.createElement("link");
        linkTag.rel = "stylesheet";
        linkTag.type = "text/html";
        linkTag.href = "./myToastr.css";
        document.querySelector("head").appendChild(linkTag);
    }
    function init() {
        // Get default setting
        setStyle();
        setOption();

        // Process
        let pattern = create();
        const exist = document.querySelector(".toastr");
        if (exist) exist.remove();

        document.querySelector("body").insertAdjacentHTML("beforeend", pattern);
        const toastrElem = document.querySelector(".toastr");

        switch (type) {
            case typeDefault[0]:
                toastrElem.classList.add(typeDefault[0]);
                break;

            case typeDefault[1]:
                toastrElem.classList.add(typeDefault[1]);
                break;

            case typeDefault[2]:
                toastrElem.classList.add(typeDefault[2]);
                break;
        }

        setTimeout(() => {
            toastrElem.style.animation = `FadeOut .5s ease-in`;
            toastrElem.style.animationIterationCount = 1;

            setTimeout(() => {
                toastrElem.remove();
            }, 500);
        }, (isNaN(toastrOption.time) ? 3000 : toastrOption.time) - 500);
    }

    // Run
    init();
};
