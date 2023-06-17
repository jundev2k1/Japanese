import { JapaneseSentence, Lesson, Topic } from "../../data/index.js";
import * as constants from "./constants.js";

//===== Common Method =====
export class StringBuilder {
    /**
     * String Builder
     * @param {string} str Initialization string
     */
    constructor(str = "") {
        this.str = str;
    }

    /**
     * Append
     * @param {string} str2 String Concatenation
     */
    Append(str2) {
        this.str += String(str2);
        return this;
    }
    Result() {
        return String(this.str);
    }
    Length() {
        return this.str.length;
    }
}
//===== Common Function =====

// Work with Page Path
/**
 * Get Current Page Path
 */
export const GetPagePath = function () {
    let page = window.location.pathname;
    return page === constants.PAGE_ROOT ? constants.PAGE_DASHBOARD : page;
};

/**
 * Get Full Path
 * @returns Full Path
 */
export const GetFullPagePath = function () {
    let page = window.location.pathname;
    return page === constants.PAGE_ROOT
        ? constants.PROJECT_ROOT + constants.PAGE_DASHBOARD
        : constants.PROJECT_ROOT + page;
};

export const analysisUtilities = (function () {
    return {
        CountLesson(){
            return Lesson.length;
        },
        CountTopic(){
            return Object.keys(Topic).length;
        },
        CountVocabulary(){
            return JapaneseSentence.length;
        }
    };
})();

// Work with Mark Down
/**
 * Read file MD
 * @returns Handle method
 */
export const ReadMD = (function () {
    return {
        content: "",
        load(url) {
            if (url == "") return;

            const xhr = new XMLHttpRequest();
            xhr.open("get", url, false);
            xhr.send();
            this.checkStatus(xhr);
            return this;
        },
        checkStatus(xhr) {
            if (xhr.status === 200) {
                console.log("Success");
                this.content = xhr.response;
            } else if (xhr.status === 404) {
                console.error("Not Found");
                this.content = "";
            }
        },
        convert() {
            const converter = new showdown.Converter({extensions: ['table']});
            let html = converter.makeHtml(this.content);
            html = html
                .replaceAll('[x]','<input type="checkbox" checked disabled>')
                .replaceAll('[ ]','<input type="checkbox" disabled>');
            return html;
        },
    };
})();

// Work with Session
/**
 * Set Previeus Page
 * @param {String} pagePath Current Page Path
 */
export const setPrePageSession = function (pagePath) {
    let url = constants.PROJECT_ROOT + "/" + pagePath;
    sessionStorage.setItem(constants.SESSION_KEY_PREV, pagePath);
};

//========= DOM Common ==========
export const $ = document.querySelector.bind(document);
export const $$ = document.querySelectorAll.bind(document);
