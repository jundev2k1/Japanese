import { GetFullPagePath } from "../common/common.js";
import * as constants from "../common/constants.js";

export function systemProcess() {
    // Handle Redirect Page 404
    function handlePage404() {
        const linkNodes = document.querySelectorAll("body a");
        linkNodes.forEach((item) => {
            item.addEventListener("click", (e) => {
                e.preventDefault();
                const currentUrl = GetFullPagePath();
                const domainName = constants.PROJECT_ROOT;
                const href = item.href;
                const request = new XMLHttpRequest();

                if(href === "#")
                    return

                if(href.includes(domainName)){
                    request.open("head", href, false);
                    request.send(null);
                    if (request.status === 200) {
                        if (href !== currentUrl) location.replace(href);
                    } else if (request.status === 404) {
                        location.replace(constants.PAGE_ERROR_404);
                    } else alert("fail");
                }
                else{
                    window.open(href, "_blank");
                }
            });
        });
    }
    handlePage404();
}
