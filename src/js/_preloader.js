const fillLoader = (value) => {
    const loadingBar = document.querySelector("#preloader .bar");
    loadingBar.style.width = value;
};

const preloader = () => {
    document.addEventListener("DOMContentLoaded", () => {
        fillLoader("50%");
    });

    document.addEventListener("readystatechange", () => {
        document.readyState === "interactive" && fillLoader("25%");
        if (document.readyState === "complete") {
            fillLoader("100%");
            setTimeout(() => {
                document.querySelector("#preloader").classList.add("complete");
            }, 400);
            [...document.body.classList].includes("loading") &&
                document.body.classList.remove("loading");
        }
    });
};

export default preloader;
