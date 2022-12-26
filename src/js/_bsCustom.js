import { Modal } from "bootstrap";

export const modalController = () => {
    [...document.querySelectorAll(".modal")]
        .filter((el) => el.id !== "loadingModal")
        .forEach((x) => {
            const target = `#${x.id}`;
            Modal.getOrCreateInstance(target, {
                keyboard: false,
                backdrop: "static",
            });
        });

    const loadingModal = document.querySelector("#loadingModal");
    const loadingInstance = Modal.getOrCreateInstance(loadingModal, {
        keyboard: false,
        backdrop: false,
    });

    loadingModal.addEventListener("shown.bs.modal", (e) => {
        setTimeout(() => {
            loadingInstance.hide();
        }, 2000);
    });

    [...document.querySelectorAll("[data-gr-toggle='modal']")].forEach((x) => {
        x.addEventListener("click", () => {
            const target = document.querySelector(
                x.getAttribute("data-gr-target")
            );
            target.setAttribute("style", "z-index: 1061;");
            if (typeof target !== "undefined") {
                const instance = new Modal(target, {
                    keyboard: false,
                    backdrop: "static",
                });

                instance.show();
            }

            target.addEventListener("transitionstart", (e) => {
                const backdrop = document.querySelectorAll(".modal-backdrop");
                const backdropLength = backdrop.length;

                backdrop[backdropLength - 1].setAttribute(
                    "style",
                    "z-index: 1060;"
                );
            });
        });
    });
};

export const tooltipController = () => {
    const tooltipTriggerList = document.querySelectorAll(
        '[data-bs-toggle="tooltip"]'
    );

    [...tooltipTriggerList].map(
        (tooltipTriggerEl) => new window.bootstrap.Tooltip(tooltipTriggerEl)
    );
};

export const accordionController = () => {
    const toggleEl = document.querySelector("#toggleAccordion");
    const collapseEl = document.querySelectorAll(".accordion-collapse");

    toggleEl &&
        toggleEl.addEventListener("click", () => {
            const status = toggleEl.classList.contains("active")
                ? "펼치기"
                : "접기";
            toggleEl.classList.toggle("active");
            toggleEl.querySelector("span").innerHTML = status;

            collapseEl.forEach((x) => {
                const idx = `#${x.id}`;
                const target = new window.bootstrap.Collapse(idx, {
                    toggle: false,
                });

                if (status === "접기") {
                    target.show();
                } else {
                    target.hide();
                }
            });
        });
};
