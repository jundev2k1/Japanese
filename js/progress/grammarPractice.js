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
            update: 2
        };
        const review = $("#grammar #review p");
        const errorMassage = $("#grammar #review .error-message");
        const listItem = $("#grammar ul");
        const scoreElem = $("#grammar .score");
        const cloneItem = '<li id="cloneItem" class="dragtemp">Clone</li>';

        return {
            load(type) {
                debugger
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
                newContent = oldContent;
                this.randomContent();
            },
            randomContent() {
                oldContent.sort((a, b) => 0.5 - Math.random());
            },
            createData(type) {
                let template = '<li id="start"></li>';
                switch(type){
                    case typeLoad.new:
                    case typeLoad.reset:
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
                template += '<li id="end"></li>';
                return template;
            },
            reviewData() {
                review.innerHTML = oldContent.join(" ");
            },
            loadScore(){
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
                if (originalContent === newContent.join(" ")) {
                    debugger
                    alert("dung roi");
                    score++;
                    this.load(typeLoad.new);
                }
            },
            add(position) {
                newContent.splice(position, 0);
            },
            remove(position) {
                newContent.splice(position, 1);
            },
            handleEvent() {
                const checkClone = function(){
                    let cloneElem = document.querySelector(
                        "#grammar #cloneItem"
                    );
                    draging = cloneElem == null ? false : true;
                }

                $$("#grammar ul li").forEach((item) => {
                    // Dragstart event
                    item.addEventListener("dragstart", (e) => {
                        if (item.id !== "start" || item.id !== "end") {
                            dragItem = item;
                            item.classList.add("draging");
                        }
                    });
                    // Dragover event
                    item.addEventListener("dragover", (e) => {
                        checkClone();
                        if (draging === false && dragItem.id != item.id) {
                            if (item.id == "start" || item.id == "end") {
                                item.classList.add("dragtemp");
                            } else {
                                item.insertAdjacentHTML("afterend", cloneItem);
                            }
                        }
                    });
                    // Dragover event for outside
                    $$("#grammar .space").forEach((item) => {
                        item.addEventListener("dragover", () => {
                            let cloneElem = document.querySelector(
                                "#grammar #cloneItem"
                            );
                            if (cloneElem !== null) {
                                cloneElem.remove();
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
                    item.addEventListener("dragend", () => {
                        debugger
                        let cloneElem = document.querySelector(
                            "#grammar #cloneItem"
                        );
                        if (cloneElem !== null) {
                            const items = $$("#grammar ul li");
                            items.forEach((item, index) => {
                                if (item.id == "cloneItem") {
                                    newContent.splice(
                                        index,
                                        0,
                                        dragItem.innerHTML
                                    );
                                    newContent.splice(dragItem.id, 1);
                                }
                            });
                            this.load(typeLoad.update);
                        }
                    });
                });
            },
            reset() {
                this.resetScore();
                this.resetMessage();
                this.load(typeLoad.reset);
            },
            change() {
                this.load(typeLoad.new);
            },
            submit() {
                this.validate();
            },
            init() {
                $("#grammar .confirm").addEventListener('click', ()=> this.submit());
                $("#grammar .reset").addEventListener('click', ()=> this.reset());
                $("#grammar .change").addEventListener('click', ()=> this.change());
                this.resetScore();
                this.load(typeLoad.new);
                this.resetMessage();
            },
        };
    })();

    handleGrammar.init();
}
