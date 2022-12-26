import * as XLSX from "xlsx/xlsx.mjs";
import * as saveAs from "file-saver/dist/FileSaver";

export const excelController = () => {
    const excelDownload = document.querySelector("#excelDownload");
    excelDownload && excelDownload.addEventListener("click", exportExcel);
};

function exportExcel() {
    // step 1. workbook 생성
    const wb = XLSX.utils.book_new();

    // step 2. 시트 만들기
    const newWorksheet = excelHandler.getWorksheet();

    // step 3. workbook에 새로만든 워크시트에 이름을 주고 붙인다.
    XLSX.utils.book_append_sheet(wb, newWorksheet, excelHandler.getSheetName());

    // step 4. 엑셀 파일 만들기
    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" });

    // step 5. 엑셀 파일 내보내기
    saveAs(
        new window.Blob([s2ab(wbout)], { type: "application/octet-stream" }),
        excelHandler.getExcelFileName()
    );
}

const excelHandler = {
    getExcelFileName: function () {
        return "Result.xlsx";
    },
    getSheetName: function () {
        return "Result";
    },
    getExcelData: function () {
        return document.querySelector(".table-excel");
    },
    getWorksheet: function () {
        return XLSX.utils.table_to_sheet(this.getExcelData());
    },
};

function s2ab(s) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
    return buf;
}
