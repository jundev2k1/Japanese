import { Character, Settings } from "../../data/index.js";
import { $, $$ } from "../common/common.js";

export function letterPracticeProgress() {
    //========= Declare ===========

    let typeList = 0;
    let display = 0;
    let type = 0;
    let level = 1;
    let mode = 0;

    //========= Function ===========
    // Letter Practice Page Function (letterPractice.html)
    const japanCode = (function() {
        const jpTextCode = [];
        const romajiCode = [];
        let currentType = type;
        let currentLevel = level;
        let currentMode = mode;
        let score = 0;

        return {
            random() {
                let lengthData = Character.length;
                let textRandom = [];

                switch (mode) {
                    case 0:
                        lengthData = 46;
                        break;

                    case 1:
                        lengthData = 71;
                        break;
                }

                for (let i = 0; i < level; i++) {
                    textRandom.push(Math.floor(Math.random() * lengthData) + 1);
                }

                return textRandom;
            },
            add() {
                let textRandom = this.random();
                textRandom.forEach((item) => {
                    switch (type) {
                        case 0:
                            jpTextCode.push(Character[item - 1].hiragana);
                            break;

                        case 1:
                            jpTextCode.push(Character[item - 1].katakana);
                            break;
                    }
                    romajiCode.push(Character[item - 1].romaji);
                });
            },
            clear() {
                jpTextCode.splice(0, jpTextCode.length);
                romajiCode.splice(0, romajiCode.length);

                if (
                    currentType != type ||
                    currentLevel != level ||
                    currentMode != mode
                ) {
                    score = 0;
                    currentType = type;
                    currentLevel = level;
                    currentMode = mode;
                }
            },
            hint() {
                let txtHint = "Gợi ý: " + romajiCode.join("");
                $(".box .japanese-code label").innerHTML = txtHint;
            },
            clearHint() {
                $(".box .japanese-code label").innerHTML = "";
            },
            render() {
                let jpTxt = jpTextCode.join("");
                $(".box .japanese-code h1").innerHTML = jpTxt;
                $(".box .score").innerHTML = score;
                $(".box #input-field").value = "";
            },
            reload() {
                this.clear();
                this.add();
                this.render();
            },
            init() {
                this.reload();
                $(".box #input-field").addEventListener("keypress", (e) => {
                    if (e.keyCode == 13) {
                        let romaTxt = romajiCode.join("");
                        if (e.target.value == romaTxt) {
                            score++;
                            this.clear();
                            this.clearHint();
                            this.add();
                            this.render();
                        } else alert("sai rồi !!!");
                    }
                });
                $(".box .japanese-code button").addEventListener(
                    "click",
                    () => {
                        this.hint();
                    }
                );
            },
        };
    })();

    const codeBoard = (function () {
        const codeList = $(".language-board .content .code-list");
        let data = "";

        return {
            progress() {
                Character.forEach((item) => {
                    data += `<li id="${item.index}">`;

                    switch (typeList) {
                        case 0:
                            data += `<h3>${item.hiragana}</h3>`;
                            break;

                        case 1:
                            data += `<h3>${item.katakana}</h3>`;
                            break;
                    }
                    data += `<p>${item.romaji}</p></li>`;
                });
            },
            render() {
                data = "";
                this.progress();
                $(".language-board .content .code-list").innerHTML = data;
            },
        };
    })();

    const handleSetting = (function () {
        const homePage = $(".page-content .box .main-page");
        const settingPage = $(".page-content .box .setting-page");
        const btnSetting = $("#settingButton");
        const iconSetting = $("#settingButton i");
        const btnTypeSettings = $$(
            ".setting-page .setting-type .button-group button"
        );
        const btnLevelSettings = $$(
            ".setting-page .setting-level .button-group button"
        );
        const btnModeSettings = $$(
            ".setting-page .setting-mode .button-group button"
        );
        const btnSaveSettings = $(".setting-page .setting-save button");

        const settingTemp = new Settings(
            String(type),
            String(level),
            String(mode)
        );

        return {
            changeStatusButton() {
                switch (display) {
                    case 0:
                        btnSetting.dataset.bsTitle = "Setting";
                        iconSetting.className = "fa-solid fa-gear";
                        updateTooltip("#settingButton", 'Setting');
                        break;

                    case 1:
                        btnSetting.dataset.bsTitle = "Back";
                        iconSetting.className = "fa-solid fa-home";
                        updateTooltip("#settingButton", 'Back');
                        this.render();
                        break;
                }
                this.renderDisplay();
            },
            clearActive(button) {
                switch (button) {
                    case "type":
                        btnTypeSettings.forEach((item) => {
                            item.classList.remove("active");
                        });
                        break;

                    case "level":
                        btnLevelSettings.forEach((item) => {
                            item.classList.remove("active");
                        });
                        break;
                    case "mode":
                        btnModeSettings.forEach((item) => {
                            item.classList.remove("active");
                        });
                        break;
                }
            },
            setData(button, data) {
                switch (button) {
                    case "type":
                        settingTemp.type = data;
                        break;

                    case "level":
                        settingTemp.level = data;
                        break;

                    case "mode":
                        settingTemp.mode = data;
                        break;
                }
            },
            render() {
                btnTypeSettings.forEach((item) => {
                    item.classList.remove("active");
                    if (item.dataset.type == String(type)) {
                        item.classList.add("active");
                    }
                });
                btnLevelSettings.forEach((item) => {
                    item.classList.remove("active");
                    if (item.dataset.level == String(level)) {
                        item.classList.add("active");
                    }
                });
                btnModeSettings.forEach((item) => {
                    item.classList.remove("active");
                    if (item.dataset.mode == String(mode)) {
                        item.classList.add("active");
                    }
                });
            },
            renderDisplay() {
                switch (display) {
                    case 0:
                        homePage.style.display = "block";
                        settingPage.style.display = "none";
                        japanCode.reload();
                        break;

                    case 1:
                        homePage.style.display = "none";
                        settingPage.style.display = "block";
                        settingPage.querySelector(
                            ".setting-save .message"
                        ).innerHTML = "";
                        break;
                }
            },
            btnSettingClick() {
                display = display == 0 ? 1 : 0;
                this.changeStatusButton();
            },
            btnSaveClick() {
                let message = `<div class="alert alert-success" role="alert">Save Success!</div>`;
                if (
                    !settingTemp.type ||
                    !settingTemp.level ||
                    !settingTemp.mode
                )
                    message = `<div class="alert alert-danger" role="alert">Error System!</div>`;

                type = Number(settingTemp.type);
                level = Number(settingTemp.level);
                mode = Number(settingTemp.mode);
                settingPage.querySelector(".setting-save .message").innerHTML =
                    message;
            },
            init() {
                btnSetting.addEventListener("click", () => {
                    this.btnSettingClick();
                });
                btnSaveSettings.addEventListener("click", () => {
                    this.btnSaveClick();
                });
                btnTypeSettings.forEach((item) => {
                    item.addEventListener("click", () => {
                        this.clearActive("type");
                        item.classList.add("active");
                        this.setData("type", item.dataset.type);
                    });
                });
                btnLevelSettings.forEach((item) => {
                    item.addEventListener("click", () => {
                        this.clearActive("level");
                        item.classList.add("active");
                        this.setData("level", item.dataset.level);
                    });
                });
                btnModeSettings.forEach((item) => {
                    item.addEventListener("click", () => {
                        this.clearActive("mode");
                        item.classList.add("active");
                        this.setData("mode", item.dataset.mode);
                    });
                });
                this.renderDisplay();
            },
        };
    })();

    function changeType() {
        const btn = $$(".language-board .title button");

        btn.forEach((item) => {
            item.addEventListener("click", () => {
                btn.forEach((childItem) => {
                    childItem.classList.remove("active");
                });
                item.classList.add("active");
                typeList = Number(item.dataset.type);
                codeBoard.render();
            });
        });
    }

    // Initialize
    japanCode.init();
    codeBoard.render();
    handleSetting.init();
    changeType();
}
