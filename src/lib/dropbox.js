// 파일 현재 필드 숫자 totalCount랑 비교값
let fileCount = 0;
// 해당 숫자를 수정하여 전체 업로드 갯수를 정한다.
const totalCount = 20;
// 파일 고유넘버
let fileNum = 0;
// 첨부파일 배열
const contentFiles = [];
// 파일 사이즈
let fileSize = 0;
// 파일 총 사이즈
let totalSize = 0;
// 최대 첨부용량
const maxFileSize = 100 * 1024 * 1024; // () * 1024 * 1024 = ()MB

const fileCheck = (e) => {
    const files = e.target.files;
    // 파일 배열 담기
    const filesArr = Array.prototype.slice.call(files);

    // 각각의 파일 배열담기 및 기타
    filesArr.forEach(function (f) {
        contentFiles.push(f);

        if (f.size < 1024) {
            fileSize = f.size + "Byte";
        } else if (f.size < 1048576) {
            fileSize = (f.size / 1024).toFixed(2) + "KB";
        } else {
            fileSize = (f.size / 1024 / 1024).toFixed(2) + "MB";
        }

        fileCount++;
        totalSize += f.size;

        if (fileCount > totalCount) {
            fileCount--;
            window.alert("파일 최대 갯수를 넘었습니다.");
        } else {
            if (f.size > 104857600 || totalSize >= maxFileSize) {
                totalSize -= f.size;
                fileCount--;
                window.alert("파일 최대 크기를 넘었습니다.");
            } else {
                // NEW APPEND
                const context = document.createElement("li");
                context.id = `file${fileNum}`;
                context.classList.add("list-group-item", "h-auto");
                context.innerHTML = `<div class='d-flex justify-content-between align-items-center w-100'>
                            <div class='d-flex align-items-center'>
                                <span class='d-block text-truncate fw-bold'>${f.name}</span>
                                <span class='d-block opacity-50 ms-auto'>(${fileSize})</span>
                            </div>
                            <i class='file-remove-btn bi bi-x text-danger fs-5' onclick='fileDelete("file${fileNum}")'></i>
                        </div>`;
                document.querySelector("#dropbox").append(context);

                document.querySelector("#nowsize").innerHTML = `${(
                    totalSize /
                    1024 /
                    1024
                ).toFixed(2)}MB`;

                const attachCount =
                    document.querySelector("#dropbox").children.length;
                document.querySelector(
                    "#nowcount"
                ).innerHTML = `${attachCount}개`;
            }
            fileNum++;
        }
    });

    // 초기화.
    document.querySelector("#input-attach").value = "";
};

// 파일 부분 삭제 함수
const fileDelete = (fileNum) => {
    const no = fileNum.replace(/[^0-9]/g, "");
    contentFiles[no].is_delete = true;

    const target = document.querySelector(`#${fileNum}`);
    target.remove();

    totalSize -= contentFiles[no].size;
    document.querySelector("#nowsize").innerHTML = `${(
        totalSize /
        1024 /
        1024
    ).toFixed(2)}MB`;

    const attachCount = document.querySelector("#dropbox").children.length;
    document.querySelector("#nowcount").innerHTML = `${attachCount}개`;
    document.querySelector("#maxcount").innerHTML = `${totalCount}개`;

    fileCount--;
};

const dropboxFuncs = {
    fileCheck,
    fileDelete,
};

const init = () => {
    document.querySelector("#button-attach").addEventListener("click", (e) => {
        e.preventDefault();
        document.querySelector("#input-attach").click();
    });

    document
        .querySelector("#input-attach")
        .addEventListener("change", fileCheck);

    document.querySelector("#maxcount").innerHTML = `${totalCount}개`;
    document.querySelector("#maxsize").innerHTML = `${
        maxFileSize / 1024 / 1024
    }MB`;

    Object.assign(window, dropboxFuncs);
};

init();
