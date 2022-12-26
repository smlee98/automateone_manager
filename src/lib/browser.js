function browserCheck() {
    // const defaultUrl = "/automation_store";
    const agent = navigator.userAgent.toLowerCase();

    if (
        (navigator.appName === "Netscape" && agent.search("trident") !== -1) ||
        agent.indexOf("msie") !== -1
    ) {
        window.location.href = "/browser.html";
    }
}

browserCheck();
