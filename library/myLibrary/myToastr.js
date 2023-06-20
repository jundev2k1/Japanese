/**
 * Toastr option setting
 */
const toastrOption = {
    typeColor: {
        success: "#157347",
        warning: "#ffc107",
        error: "#dc3545",
    },
    position: ["top", "right"],
    icon: {
        success: "fa-light fa-circle-check",
        warning: "fa-light fa-triangle-exclamation",
        error: "fa-light fa-circle-exclamation",
    },
    font: {
        family: "",
        size: "14px",
        color: "#fff",
        weight: "",
        style: "",
    },
    border: {
        border: "",
        borderRadius: "4px",
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
    const position = ["top", "middle", "bottom", "left", "center", "right"];
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
    function setOption(){

    }
    function setStyle(){
        let linkTag = document.createElement("link");
        linkTag.rel = 'stylesheet';
        linkTag.type = 'text/html';
        linkTag.href = './myToastr.css';
        document.querySelector("head").appendChild(linkTag);
    }
    function init() {
        setOption();
        let pattern = create();
        const exist = document.querySelector(".toastr");
        if(exist) exist.remove();
        
        document.querySelector("body").insertAdjacentHTML("beforeend", pattern);
        const toastrElem = document.querySelector('.toastr');
        
        setTimeout(() => {
            toastrElem.style.animation = `FadeOut .5s ease-in`;
            toastrElem.style.animationIterationCount = 1;
            
            setTimeout(() => {
                toastrElem.remove();
            }, 500);
        }, toastrOption.time - 500);
    }

    init();
};