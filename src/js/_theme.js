export const themeController = () => {
    "use strict";

    const storedTheme = window.localStorage.getItem("theme");
    const getPreferredTheme = () => {
        if (storedTheme) {
            return storedTheme;
        }

        return window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
    };

    const setTheme = (theme) => {
        if (
            theme === "auto" &&
            window.matchMedia("(prefers-color-scheme: dark)").matches
        ) {
            document.documentElement.setAttribute("data-bs-theme", "dark");
        } else {
            document.documentElement.setAttribute("data-bs-theme", theme);
        }
    };

    setTheme(getPreferredTheme());

    const showActiveTheme = (theme) => {
        const themeChoice = theme;

        // Deactivate all
        document.querySelectorAll("[data-bs-theme-value]").forEach((el) => {
            el.classList.remove("active");
        });

        const buttonToActive = document.querySelector(
            `[data-bs-theme-value="${themeChoice}"]`
        );

        // Activate
        buttonToActive.classList.add("active");
        const bdIcon = document.querySelector("#bd-icon i");

        themeChoice === "light" && (bdIcon.className = "bi bi-sun-fill");
        themeChoice === "dark" && (bdIcon.className = "bi bi-moon-fill");
        themeChoice === "auto" && (bdIcon.className = "bi bi-circle-half");
    };

    window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", () => {
            if (storedTheme !== "light" || storedTheme !== "dark") {
                setTheme(getPreferredTheme());
            }
        });

    window.addEventListener("DOMContentLoaded", () => {
        showActiveTheme(getPreferredTheme());
        document.querySelectorAll("[data-bs-theme-value]").forEach((toggle) => {
            toggle.addEventListener("click", () => {
                const theme = toggle.getAttribute("data-bs-theme-value");
                window.localStorage.setItem("theme", theme);
                setTheme(theme);
                showActiveTheme(theme);
            });
        });
    });
};
