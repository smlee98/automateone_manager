import { getCookie, setCookie } from "./_cookie";

export const themeController = () => {
    "use strict";
    const getPreferredThemeVariant = () => {
        return window.matchMedia("(prefers-color-scheme: light)").matches
            ? "light"
            : "dark";
    };

    const setThemeColor = (theme) => {
        const themeChoice = theme;
        const themeVariant =
            themeChoice === "auto" ? getPreferredThemeVariant() : themeChoice;
        setCookie("theme", themeChoice);

        document.documentElement.setAttribute("data-bs-theme", themeVariant);

        // Deactivate all
        document.querySelectorAll("[data-theme-value]").forEach((el) => {
            el.classList.remove("active");
        });

        const buttonToActive = document.querySelector(
            `[data-theme-value="${themeChoice}"]`
        );

        // Activate
        buttonToActive.classList.add("active");
        const bdIcon = document.querySelector("#bd-icon i");

        themeChoice === "light" && (bdIcon.className = "bi bi-sun-fill");
        themeChoice === "dark" && (bdIcon.className = "bi bi-moon-fill");
        themeChoice === "auto" && (bdIcon.className = "bi bi-circle-half");
    };

    // initialize theme
    setThemeColor(getCookie("theme") || "auto");

    // Listen For theme changes
    document.querySelectorAll("[data-theme-value]").forEach((toggle) => {
        toggle.addEventListener("click", () => {
            setThemeColor(toggle.getAttribute("data-theme-value"));
        });
    });
};
