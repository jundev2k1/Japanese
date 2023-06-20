//========== Library ==========

/**
 * Bootstrap Tooltip
 */
function useTooltipBS() {
    // Show
    const tooltipTriggerList = document.querySelectorAll(
        '[data-bs-toggle="tooltip"]'
    );
    const tooltipList = [...tooltipTriggerList].map(
        (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
    );
}
function clearTooltipBS() {
    const tooltipShowing = document.querySelectorAll(
        ".tooltip.bs-tooltip-auto"
    );
    if (tooltipShowing.length > 0) {
        tooltipShowing.forEach((item) => {
            item.remove();
        });
    }
}
function updateTooltip(element, content) {
    clearTooltipBS();

    const tooltip = bootstrap.Tooltip.getOrCreateInstance("#settingButton");
    tooltip.setContent({'.tooltip-inner': content});
    tooltip.hide();
}

//======= Init Library ========
function InitLibrary() {
    UserTooltipBS();
}
