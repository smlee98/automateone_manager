export const checkItems = (selectAll) => {
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
