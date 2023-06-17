// const file = new XMLHttpRequest();
// file.open('get', '../data/documents/test.md', false)
// let content = file.response;
// console.log(file);
// file.send();
// console.log(file.response);
// let converter = new showdown.Converter();
// let html = converter.makeHtml(file.response)
import { $, $$, ReadMD } from "../common/common.js";
import * as constants from "../common/constants.js";
import { Lesson } from "../../data/index.js";
import { LessonList } from "../common/createTemplate.js";

export function lessonProgress() {
    //========= Declare ===========

    //========= Function ===========
    // Lesson Page Function (lesson.html)
    const HandleLesson = (function () {
        return {
            CountLessons() {
                return Lesson.length;
            },
            LoadLessonList() {
                let lessonList = LessonList();
                $(".page-content .lesson-list ul").innerHTML = lessonList;
                $(
                    ".page-content .lesson-list #totalLesson"
                ).innerHTML = `There are a total of [${this.CountLessons()}] lesson`;
            },
            SetEventClick() {
                $$(".page-content .lesson-list ul li").forEach((item) => {
                    item.addEventListener("click", () => {
                        let lessonName =
                            item.querySelector("button h3").innerHTML;
                        let url = "";

                        Lesson.forEach((lessonItem) => {
                            if (lessonItem.name == lessonName){
                                url = lessonItem.path;
                                this.SetBreadCrumb(lessonItem.title)
                            }
                        });

                        if (!url.IsNullOrEmpty()) {
                            $(
                                ".page-content .lesson-detail .lesson-detail-content"
                            ).innerHTML = ReadMD.load(url).convert();
                            this.CheckAction(
                                constants.ACTION_LESSON_LESSON_DETAIL
                            );
                        }
                    });
                });
            },
            SetEventBackList() {
                $(
                    ".page-content .lesson-detail #btnBackList"
                ).addEventListener("click", ()=>{
                    this.btnBackList();
                });
            },
            SetBreadCrumb(lessonName){
                let html =  `<li class="breadcrumb-item"><a href="${constants.PAGE_LESSON}">Lesson Page</a></li>`
                         +  `<li class="breadcrumb-item active" aria-current="page">${lessonName}</li>`;
                
                $(".page-content .md-task-bar .breadcrumb").innerHTML = html;
            },
            CleanDetail() {
                $(
                    ".page-content .lesson-detail .lesson-detail-content"
                ).innerHTML = "";
            },
            CheckAction(action) {
                switch (action) {
                    case constants.ACTION_LESSON_LESSON_LIST:
                        $(".page-content .lesson-list").style.display = "block";
                        $(".page-content .lesson-detail").style.display =
                            "none";
                        break;

                    case constants.ACTION_LESSON_LESSON_DETAIL:
                        $(".page-content .lesson-list").style.display = "none";
                        $(".page-content .lesson-detail").style.display =
                            "block";
                        break;
                }
            },
            btnBackList() {
                this.CleanDetail();
                this.init();
            },
            init() {
                this.CheckAction(constants.ACTION_LESSON_LESSON_LIST);
                this.LoadLessonList();
                this.SetEventClick();
                console.log("11");
                this.SetEventBackList();
            },
        };
    })();
    // Initialize
    HandleLesson.init();
}
