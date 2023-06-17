import { PageList, Lesson, Contact } from "../../data/index.js";
import { StringBuilder } from "./common.js";

/**
 * Get Menu List Element
 * @param {String} pageActive Current Page
 * @returns Menu List
 */
export const MainMenu = function (pageActive) {
    let template = new StringBuilder();
    PageList.forEach((item) => {
        template
            .Append(
                `<li class="menu-item ${
                    pageActive === item.path ? "active" : ""
                }">`
            )
            .Append(`<a href="${item.path}">`)
            .Append(`<i class="${item.icon}"></i>`)
            .Append(item.name)
            .Append(`</a>`)
            .Append(`</li>`);
    });

    return template.Result();
};

/**
 * Get Lesson List Element
 * @returns Lession List
 */
export const LessonList = function () {
    let template = new StringBuilder();
    Lesson.forEach((item, index) => {
        template
            .Append(`<li class="col-lg-3 col-md-4 col-sm-6">`)
            .Append(`<button id="${index}" class="btn btn-primary w-100">`)
            .Append(`<h3>${item.name}</h3>`)
            .Append(`<p>${item.title}</p>`)
            .Append(`</button>`)
            .Append(`</li>`);
    });

    return template.Result();
};

/**
 * Get Contact Element
 * @returns Contact Icon List
 */
export const ContactMe = function () {
    let template = new StringBuilder();
    Contact.forEach((item) => {
        template
            .Append(`<li>`)
            .Append(`<a href="${item.href}" name="${item.name}"`)
            .Append(
                `data-bs-toggle="tooltip"
                data-bs-title="${item.title}">`
            )
            .Append(item.icon)
            .Append("</a></li>");
    });
    return template.Result();
};
