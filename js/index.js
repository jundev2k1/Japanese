import * as constants from "./common/constants.js";
import * as Template from "../js/common/createTemplate.js";
import { $, GetPagePath, setPrePageSession } from "./common/common.js";
import { PageList } from "../data/index.js";
import "./system/customize.js";
import { systemProcess } from "./system/system.js";
import {
    dashboardProgress,
    letterPracticeProgress,
    grammarPracticeProgress,
    lessonProgress,
    aboutMeProgress,
    errorProgress,
} from "./progress/index.js";

//====== Helper Function ======
const changeTitlePage = function (title = "") {
    let page = GetPagePath();
    if (String(title).IsNullOrEmpty()) {
        PageList.forEach((item) => {
            if (page === item.path) {
                let templateTitle =
                    constants.PROJECT_NAME_DISPLAY + " - " + item.name;
                document.title = item.path === page ? templateTitle : title;
            }
        });
    } else {
        document.title = title;
    }
};

//======== Page Load ========
function PageLoad() {
    const page = window.location.pathname;
    const menuList = Template.MainMenu(page);

    // Set page info
    changeTitlePage();
    $(".menu-sidebar .menu-field .menu-group").innerHTML = menuList;
    $("#page-sidebar .logo h1").innerHTML = constants.PROJECT_NAME_DISPLAY;
    if (page === constants.PAGE_ROOT) {
        $(".menu-sidebar .menu-field .menu-group .menu-item").classList.add(
            "active"
        );
    }
    // Set title page content
    PageList.forEach((item) => {
        if (item.path === page) {
            $(
                ".page-content .header-bar"
            ).innerHTML = `<i class="${item.icon}"></i> ${item.name}`;
        }
    });

    // Handle page
    switch (page) {
        case constants.PAGE_ROOT:
        case constants.PAGE_DASHBOARD:
            setPrePageSession(constants.PAGE_DASHBOARD);
            dashboardProgress();
            break;

        case constants.PAGE_LETTER_PRACTICE:
            setPrePageSession(constants.PAGE_LETTER_PRACTICE);
            letterPracticeProgress();
            break;

        case constants.PAGE_GRAMMAR_PRACTICE:
            setPrePageSession(constants.PAGE_GRAMMAR_PRACTICE);
            grammarPracticeProgress();
            break;

        case constants.PAGE_LESSON:
            setPrePageSession(constants.PAGE_LESSON);
            lessonProgress();
            break;

        case constants.PAGE_ABOUT_ME:
            setPrePageSession(constants.PAGE_ABOUT_ME);
            aboutMeProgress();
            break;

        case constants.PAGE_ERROR_404:
            errorProgress();
            break;
    }
}
PageLoad();

//======== Handle Event ========
(function handleSidebar() {
    const pageSidebar = $("#page-sidebar");
    const pageContent = $(".page-content");
    const menuGroupElem = $("#page-sidebar .menu-field");

    // Handle hover
    pageSidebar.addEventListener("mouseover", (e) => {
        pageContent.style.paddingLeft = "250px";
        pageContent.style.animation = "MenuHover 0.5s ease-in";
    });
    pageSidebar.addEventListener("mouseleave", () => {
        pageContent.style.paddingLeft = "75px";
        pageContent.style.animation = "MenuLeave 0.5s ease-in";
    });
})();

//======== System Handle =======
systemProcess();
