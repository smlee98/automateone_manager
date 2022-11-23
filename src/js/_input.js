export const projectToggle = () => {
    const favicon = document.querySelector("#favProject");
    const choice = document.querySelector("#projectChoice");
    const language = document.querySelector("#languageChoice");

    if (favicon) {
        favicon.addEventListener("click", (e) => {
            e.target.classList.toggle("active");
        });
    }

    if (choice) {
        const selectEl = choice.querySelectorAll(".dropdown-item");
        selectEl.forEach((el) => {
            el.addEventListener("click", (e) => {
                choice.querySelector(".dropdown-toggle").innerText =
                    e.target.innerText;
            });
        });
    }

    if (language) {
        const selectEl = language.querySelectorAll(".dropdown-item");
        selectEl.forEach((el) => {
            el.addEventListener("click", (e) => {
                document.querySelector("#language").innerText =
                    e.target.innerText;
            });
        });
    }
};

export const sidebarToggle = () => {
    const sidebar = document.querySelector(".sidebar");
    const collapseEl = document.querySelectorAll(".collapse");
    const navEl = document.querySelectorAll(".menu .nav-link");
    const toggle = document.querySelector(".toggle");
    if (toggle) {
        toggle.addEventListener("click", (e) => {
            sidebar.classList.toggle("close");
            collapseEl.forEach((el) => {
                new window.bootstrap.Collapse(el, {
                    toggle: false,
                }).hide();
            });
        });
    }

    if (navEl) {
        navEl.forEach((el) => {
            el.addEventListener("click", (e) => {
                if (sidebar.classList.contains("close")) {
                    sidebar.classList.remove("close");
                }
            });
        });
    }
};

export const checkItems = () => {
    const tableEl = document.querySelectorAll(".table-responsive");

    if (tableEl.length) {
        tableEl.forEach((table) => {
            const checkEl = table.querySelectorAll(".board-check");
            const allCheckEl = table.querySelector("#checkAll");
            if (checkEl.length) {
                checkEl.forEach((el) => {
                    el.addEventListener("click", function () {
                        const checkElCnt = table.querySelectorAll(
                            ".board-check:checked"
                        ).length;
                        if (checkElCnt !== checkEl.length) {
                            allCheckEl.checked = false;
                        } else {
                            allCheckEl.checked = true;
                        }
                    });
                });

                allCheckEl.addEventListener("click", function () {
                    const checkElCnt = table.querySelectorAll(
                        ".board-check:checked"
                    ).length;
                    if (checkElCnt === checkEl.length) {
                        checkEl.forEach((el) => (el.checked = false));
                    } else {
                        checkEl.forEach((el) => (el.checked = true));
                    }
                });
            }
        });
    } else {
        const checkEl = document.querySelectorAll(".board-check");
        const allCheckEl = document.querySelector("#checkAll");
        if (checkEl.length) {
            checkEl.forEach((el) => {
                el.addEventListener("click", function () {
                    const checkElCnt = document.querySelectorAll(
                        ".board-check:checked"
                    ).length;
                    if (checkElCnt !== checkEl.length) {
                        allCheckEl.checked = false;
                    } else {
                        allCheckEl.checked = true;
                    }
                });
            });

            allCheckEl.addEventListener("click", function () {
                const checkElCnt = document.querySelectorAll(
                    ".board-check:checked"
                ).length;
                if (checkElCnt === checkEl.length) {
                    checkEl.forEach((el) => (el.checked = false));
                } else {
                    checkEl.forEach((el) => (el.checked = true));
                }
            });
        }
    }
};
