import Datepicker from "vanillajs-datepicker/js/Datepicker.js";
import DateRangePicker from "vanillajs-datepicker/js/DateRangePicker.js";
import ko from "vanillajs-datepicker/js/i18n/locales/ko.js";

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
                document.querySelector("#projectTitle").innerText =
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

export const timepickerController = () => {
    const hourDropDown = document.querySelectorAll(".hour-picker");
    hourDropDown.forEach((el) => {
        const maxHour = 23;
        let minHour = 0;

        while (maxHour >= minHour) {
            const hourOption = document.createElement("option");
            hourOption.text = String(minHour).padStart(2, "0");
            hourOption.value = String(minHour).padStart(2, "0");
            el.add(hourOption);
            minHour += 1;
        }
    });

    // const minuteDropDown = document.getElementById("minutePicker");
    const minuteDropDown = document.querySelectorAll(".minute-picker");
    minuteDropDown.forEach((el) => {
        const maxMinute = 59;
        let minMinute = 0;

        while (maxMinute >= minMinute) {
            const minuteOption = document.createElement("option");
            minuteOption.text = String(minMinute).padStart(2, "0");
            minuteOption.value = String(minMinute).padStart(2, "0");
            el.add(minuteOption);
            minMinute += 1;
        }
    });
};

const inputHandler = (e) => {
    const val = e.target.value.replace(/\D/g, "");
    const { length } = val;

    let result = "";

    if (length < 6) {
        result = val;
    } else if (length < 8) {
        result += val.substring(0, 4);
        result += "-";
        result += val.substring(4);
    } else {
        result += val.substring(0, 4);
        result += "-";
        result += val.substring(4, 6);
        result += "-";
        result += val.substring(6);
    }

    e.target.value = result;
};

export const datepickerController = () => {
    ko.ko.titleFormat = "y년 mm월";
    Object.assign(Datepicker.locales, ko);
    const targetSingle = [...document.querySelectorAll(".datepicker-single")];
    const targetRange = [...document.querySelectorAll(".datepicker-range")];

    if (targetSingle) {
        targetSingle.forEach((el) => {
            const datepickerSingle = new Datepicker(el, {
                format: "yyyy-mm-dd",
                todayhighlight: true,
                autohide: true,
                buttonClass: "btn",
                language: "ko",
                nextArrow: `<i class="bi bi-chevron-right"></i>`,
                prevArrow: `<i class="bi bi-chevron-left"></i>`,
            });
            el.addEventListener("input", inputHandler);
            window.targetSingle = datepickerSingle;
        });
    }

    if (targetRange) {
        targetRange.forEach((el) => {
            const datepickerRange = new DateRangePicker(el, {
                format: "yyyy-mm-dd",
                todayhighlight: true,
                autohide: true,
                buttonClass: "btn",
                language: "ko",
                nextArrow: `<i class="bi bi-chevron-right"></i>`,
                prevArrow: `<i class="bi bi-chevron-left"></i>`,
            });
            el.addEventListener("input", inputHandler);
            window.targetRange = datepickerRange;
        });
    }
};
