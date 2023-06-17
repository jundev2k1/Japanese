import * as constants from '../common/constants.js';
import { $, ReadMD } from "../common/common.js";
import * as template from "../common/createTemplate.js";


export const aboutMeProgress = function () {
    let url = constants.DOCUMENT_FILE_ABOUT_ME;
    let content = ReadMD.load(url).convert();;
    $(
        ".page-content .about-me-box .md-content"
    ).innerHTML = content;

    let contactIconList = template.ContactMe();
    $(".page-content .about-me-box ul").innerHTML = contactIconList;
    useTooltipBS();
};
