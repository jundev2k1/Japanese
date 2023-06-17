import { $ } from "../common/common.js";
import * as constants from '../common/constants.js';

// Handle go back
export function errorProgress(){
    $(".page-content .error-box button").addEventListener("click", ()=>{
        let prePage = sessionStorage.getItem(constants.SESSION_KEY_PREV);
        location.replace(prePage);
    });
};