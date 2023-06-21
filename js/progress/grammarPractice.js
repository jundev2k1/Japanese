import { $, $$ } from "../common/common.js";
import { JapaneseSentence as content } from "../../data/index.js";
export function grammarPracticeProgress() {
    //====== Declare =========
    let dragItem = "";
    let draging = false;
    let originalContent = "";
    let oldContent = [];
    let newContent = [];
    let score = 0;

    //===== Function =========
    const handleGrammar = (function () {
        const typeLoad = {
            new: 0,
            reset: 1,
            update: 2,
        };
        const review = $("#grammar #review p");
        const errorMassage = $("#grammar #review .error-message");
        const listItem = $("#grammar ul");
        const scoreElem = $("#grammar .score");
        const cloneItem = '<li class="dragtemp cloneItem">Clone</li>';

        return {
            load(type) {
                switch (type) {
                    case typeLoad.new:
                        oldContent = [];
                        this.randomSentence();
                        break;

                    case typeLoad.reset:
                    case typeLoad.update:
                        break;
                }
                // Old data is null, create new
                // Render and handle data
                listItem.innerHTML = this.createData(type);
                this.loadScore();
                this.reviewData();
                this.handleEvent();
            },
            randomSentence() {
                // Get random number
                let num = Math.floor(Math.random() * content.length);
                // Set for current data
                originalContent = content[num].element.join(" ");
                oldContent = [...content[num].element];
                this.randomContent();
            },
            randomContent() {
                oldContent.sort((a, b) => 0.5 - Math.random());
                if (oldContent.join(" ") === originalContent) {
                    this.randomContent();
                }
            },
            createData(type) {
                let template = "";
                switch (type) {
                    case typeLoad.new:
                    case typeLoad.reset:
                        newContent = [...oldContent]
                        oldContent.forEach((item, index) => {
                            template += `<li id="${index}" class="" draggable="true">${item}</li>`;
                        });
                        break;

                    case typeLoad.update:
                        newContent.forEach((item, index) => {
                            template += `<li id="${index}" class="" draggable="true">${item}</li>`;
                        });
                        break;
                }
                return template;
            },
            reviewData() {
                review.innerHTML = oldContent.join(" ");
            },
            loadScore() {
                scoreElem.innerHTML = score;
            },
            resetScore() {
                score = 0;
                this.loadScore();
            },
            resetMessage() {
                errorMassage.innerHTML = "";
            },
            validate() {
                debugger;
                if (originalContent === newContent.join(" ")) {
                    toastr("success", "Good Jobs...asdsadasdsad qwe qwe asd asd as das");
                    score++;
                    this.load(typeLoad.new);
                } else {
                    toastr("error", "Wrong!");
                }
            },
            handleEvent() {
                const checkClone = function () {
                    let cloneElem = $("#grammar .cloneItem");
                    draging = cloneElem == null ? false : true;
                };

                $$("#grammar ul li").forEach((item) => {
                    // Dragstart event
                    item.addEventListener("dragstart", (e) => {
                        dragItem = item;
                        item.classList.add("draging");
                    });
                    // Dragover event
                    item.addEventListener("dragover", (e) => {
                        checkClone();
                        if (draging === false && dragItem.id != item.id) {
                            if (dragItem.id < e.target.id) {
                                item.insertAdjacentHTML("afterend", cloneItem);
                            } else {
                                item.insertAdjacentHTML(
                                    "beforebegin",
                                    cloneItem
                                );
                            }
                            $("#grammar .cloneItem").id = e.target.id;
                        }
                    });
                    // Dragover event for outside
                    $$("#grammar .space").forEach((item) => {
                        item.addEventListener("dragover", () => {
                            let cloneElems = $$("#grammar .cloneItem");
                            if (cloneElems !== null) {
                                cloneElems.forEach((cloneElem) => {
                                    cloneElem.remove();
                                });
                            }
                        });
                    });
                    // Dragleave event
                    item.addEventListener("dragleave", () => {
                        if (item.className == "dragtemp") {
                            item.classList.remove("dragtemp");
                        }
                    });
                    // Drop event
                    item.addEventListener("dragend", (e) => {
                        const cloneElem = $("#grammar .cloneItem");
                        if(cloneElem != null)
                            if(Number(dragItem.id) < Number(cloneElem.id)){
                                console.dir(dragItem)
                                newContent.splice(Number(cloneElem.id) + 1, 0, dragItem.textContent);
                                newContent.splice(Number(dragItem.id), 1);
                            } else if(Number(dragItem.id) > Number(cloneElem.id)) {
                                newContent.splice(Number(cloneElem.id), 0, dragItem.textContent);
                                newContent.splice(Number(dragItem.id) + 1, 1);
                            }
                        this.load(typeLoad.update);
                    });
                });
            },
            reset() {
                this.resetMessage();
                this.load(typeLoad.reset);
            },
            change() {
                this.load(typeLoad.new);
                score--;
                this.resetScore();
            },
            submit() {
                this.validate();
            },
            init() {
                $("#grammar .confirm").addEventListener("click", () =>
                    this.submit()
                );
                $("#grammar .reset").addEventListener("click", () =>
                    this.reset()
                );
                $("#grammar .change").addEventListener("click", () =>
                    this.change()
                );
                this.resetScore();
                this.load(typeLoad.new);
                this.resetMessage();
            },
        };
    })();

    handleGrammar.init();
}
