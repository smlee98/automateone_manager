import { Modal } from "bootstrap";

export const modalController = () => {
    [...document.querySelectorAll(".modal")].forEach((x) => {
        const target = `#${x.id}`;
        Modal.getOrCreateInstance(target, {
            keyboard: false,
            backdrop: "static",
        });
        x.addEventListener("show.bs.modal", (e) => {
            e.target.classList.remove("modal-min");
            const backdrop = document.querySelectorAll(".modal-backdrop");
            backdrop.forEach((elem) => {
                elem.classList.remove("d-none");
            });
        });
        x.addEventListener("hide.bs.modal", (e) => {
            x.addEventListener("transitionend", () => {
                const backdrop = document.querySelectorAll(".modal-backdrop");
                backdrop.forEach((elem) => {
                    elem.classList.remove("d-none");
                });
            });
        });
    });

    [...document.querySelectorAll("[data-gr-toggle='modal']")].forEach((x) => {
        x.addEventListener("click", () => {
            const target = document.querySelector(
                x.getAttribute("data-gr-target")
            );
            if (typeof target !== "undefined") {
                const instance = new Modal(target);
                instance.show();
            }
        });
    });

    const minmax = document.querySelectorAll(".btn-minmax");

    minmax.forEach((el) => {
        el.addEventListener("click", () => {
            const targetModal = el.closest(".modal");
            const backdrop = document.querySelectorAll(".modal-backdrop");
            backdrop.forEach((elem) => {
                elem.classList.toggle("d-none");
            });
            targetModal.classList.toggle("modal-min");
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
