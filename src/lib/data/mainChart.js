import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";

const commaify = (value) => {
    const result = ("" + value).replace(/^(-?\d+)(\d{3})/, "$1,$2");
    return value == result ? result : commaify(result);
};

const getDatesStartToLast = (count) => {
    const offset = 1000 * 60 * 60 * 9;
    let result = [];
    const curDate = new Date(new Date().getTime() + offset);
    for (let i = 0; i < count; i++) {
        const date = curDate.toISOString().split("T")[0];
        const month = date.split("-")[1];
        const day = date.split("-")[2];
        result.push(`${month}-${day}`);
        curDate.setDate(curDate.getDate() - 1);
    }
    return result.reverse();
};

const getTimeStartToLast = (count) => {
    const offset = 1000 * 60 * 60 * 9;
    let result = [];
    const curTime = new Date(new Date().getTime() + offset);
    for (let i = 0; i < count; i++) {
        const time = curTime.toISOString().split("T")[1];
        const hour = time.split(":")[0];
        const minute = time.split(":")[1];
        result.push(`${hour}:${minute}`);
        curTime.setMinutes(curTime.getMinutes() - 1);
    }
    return result.reverse();
};

window.charts = [];
const statRobotEl = document.getElementById("statRobotChart");
const statRobotConfig = {
    type: "bar",
    data: {
        labels: ["로봇"],
        datasets: [
            {
                label: "실행중",
                backgroundColor: "#007BBB",
                data: [6],
                barThickness: 36,
            },
            {
                label: "연결됨",
                backgroundColor: "#00BB91",
                data: [3],
                barThickness: 36,
            },
            {
                label: "연결안됨",
                backgroundColor: "#F69302",
                data: [1],
                barThickness: 36,
            },
        ],
    },
    plugins: [ChartDataLabels],
    options: {
        indexAxis: "y",
        layout: {
            padding: {
                left: 0,
            },
        },
        plugins: {
            legend: {
                position: "bottom",
                labels: {
                    boxHeight: 14,
                    boxWidth: 14,
                },
            },
            datalabels: {
                display: function (context) {
                    return context.dataset.data[context.dataIndex] !== 0;
                },
                color: "white",
                font: {
                    weight: "bold",
                    size: 14,
                },
            },
            tooltips: {
                displayColors: true,
                callbacks: {
                    mode: "x",
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    padding: 0,
                    beginAtZero: true,
                    display: false,
                    stepSize: 1,
                },
                grid: {
                    display: false,
                    drawBorder: false,
                },
                stacked: true,
            },
            y: {
                ticks: {
                    padding: 0,
                    display: false,
                },
                grid: {
                    display: false,
                    color: "#fff",
                    zeroLineColor: "#fff",
                    zeroLineWidth: 0,
                    drawBorder: false,
                },
                stacked: true,
            },
        },
        responsive: true,
        maintainAspectRatio: false,
    },
};

const statProcEl = document.getElementById("statProcChart");
const statProcConfig = {
    type: "bar",
    data: {
        labels: ["로봇"],
        datasets: [
            {
                label: "실행",
                backgroundColor: "#007BBB",
                data: [3],
                barThickness: 36,
            },
            {
                label: "정지",
                backgroundColor: "#FF5A5A",
                data: [1],
                barThickness: 36,
            },
        ],
    },
    plugins: [ChartDataLabels],
    options: {
        indexAxis: "y",
        layout: {
            padding: {
                left: 0,
            },
        },
        plugins: {
            legend: {
                position: "bottom",
                labels: {
                    boxHeight: 14,
                    boxWidth: 14,
                },
            },
            datalabels: {
                display: function (context) {
                    return context.dataset.data[context.dataIndex] !== 0;
                },
                color: "white",
                font: {
                    weight: "bold",
                    size: 14,
                },
            },
            tooltips: {
                displayColors: true,
                callbacks: {
                    mode: "x",
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    padding: 0,
                    beginAtZero: true,
                    display: false,
                    stepSize: 1,
                },
                grid: {
                    display: false,
                    drawBorder: false,
                },
                stacked: true,
            },
            y: {
                ticks: {
                    padding: 0,
                    display: false,
                },
                grid: {
                    display: false,
                    color: "#fff",
                    zeroLineColor: "#fff",
                    zeroLineWidth: 0,
                    drawBorder: false,
                },
                stacked: true,
            },
        },
        responsive: true,
        maintainAspectRatio: false,
    },
};

const statWeekEl = document.getElementById("statWeekChart");
const statWeekLabels = getDatesStartToLast(14);
const statWeekConfig = {
    type: "bar",
    data: {
        labels: statWeekLabels,
        datasets: [
            {
                label: "성공",
                backgroundColor: "#00BB91",
                data: [4, 2, 3, 2, 2, 0, 0, 0, 0, 1, 0, 0, 0, 0],
                barThickness: 36,
            },
            {
                label: "실패",
                backgroundColor: "#FFBB00",
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                barThickness: 36,
            },
            {
                label: "정지",
                backgroundColor: "#828282",
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                barThickness: 36,
            },
            {
                label: "오류",
                backgroundColor: "#FF5A5A",
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
                barThickness: 36,
            },
        ],
    },
    options: {
        layout: {
            padding: {
                left: 0,
            },
        },
        plugins: {
            legend: {
                position: "bottom",
                labels: {
                    boxHeight: 14,
                    boxWidth: 14,
                },
            },
            tooltips: {
                displayColors: true,
                callbacks: {
                    mode: "x",
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    padding: 0,
                    beginAtZero: true,
                    stepSize: 1,
                },
                stacked: true,
            },
            y: {
                ticks: {
                    padding: 0,
                },
                stacked: true,
            },
        },
        responsive: true,
        maintainAspectRatio: false,
    },
};

const statDiskEl = document.getElementById("statDiskChart");
const statDiskLabel = getTimeStartToLast(10);
const statDiskConfig = {
    type: "line",
    data: {
        labels: statDiskLabel,
        datasets: [
            {
                label: "My First Dataset",
                data: [198, 198, 198, 198, 198, 198, 198, 197, 197, 197],
                fill: false,
                borderColor: "#41527d",
                tension: 0.1,
            },
        ],
    },
    options: {
        layout: {
            padding: {
                left: 0,
            },
        },
        plugins: {
            legend: {
                display: false,
            },
            tooltips: {
                displayColors: true,
                callbacks: {
                    mode: "x",
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    padding: 0,
                    beginAtZero: true,
                },
            },
            y: {
                ticks: {
                    callback: function (value, index, ticks) {
                        return value + "GB";
                    },
                    padding: 0,
                },
            },
        },
        responsive: true,
        maintainAspectRatio: false,
    },
};

const statMemoryEl = document.getElementById("statMemoryChart");
const statMemoryLabel = getTimeStartToLast(10);
const statMemoryConfig = {
    type: "line",
    data: {
        labels: statMemoryLabel,
        datasets: [
            {
                label: "My First Dataset",
                data: [4.4, 4.4, 4.4, 4.3, 4.35, 4.4, 4.4, 4.4, 4.4, 4.4],
                fill: false,
                borderColor: "#41527d",
                tension: 0.1,
            },
        ],
    },
    options: {
        layout: {
            padding: {
                left: 0,
            },
        },
        plugins: {
            legend: {
                display: false,
            },
            tooltips: {
                displayColors: true,
                callbacks: {
                    mode: "x",
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    padding: 0,
                    beginAtZero: true,
                },
            },
            y: {
                ticks: {
                    callback: function (value, index, ticks) {
                        return value + "GB";
                    },
                    padding: 0,
                },
            },
        },
        responsive: true,
        maintainAspectRatio: false,
    },
};

const statCpuEl = document.getElementById("statCpuChart");
const statCpuLabel = getTimeStartToLast(10);
const statCpuConfig = {
    type: "line",
    data: {
        labels: statCpuLabel,
        datasets: [
            {
                label: "My First Dataset",
                data: [4, 4, 4, 12, 10, 4, 6, 4, 4, 15],
                fill: false,
                borderColor: "#41527d",
                tension: 0.1,
            },
        ],
    },
    options: {
        layout: {
            padding: {
                left: 0,
            },
        },
        plugins: {
            legend: {
                display: false,
            },
            tooltips: {
                displayColors: true,
                callbacks: {
                    mode: "x",
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    padding: 0,
                    beginAtZero: true,
                },
            },
            y: {
                ticks: {
                    callback: function (value, index, ticks) {
                        return value + "%";
                    },
                    padding: 0,
                },
            },
        },
        responsive: true,
        maintainAspectRatio: false,
    },
};

const setRobotStatChart = () => {
    const statRobotChart = new Chart(statRobotEl, statRobotConfig);
    window.charts.push(statRobotChart);
};

const setProcStatChart = () => {
    const statProcChart = new Chart(statProcEl, statProcConfig);
    window.charts.push(statProcChart);
};

const setWeekChart = () => {
    const statWeekChart = new Chart(statWeekEl, statWeekConfig);
    window.charts.push(statWeekChart);
};

const setDiskChart = () => {
    const statDiskChart = new Chart(statDiskEl, statDiskConfig);
    window.charts.push(statDiskChart);
};

const setMemoryChart = () => {
    const statMemoryChart = new Chart(statMemoryEl, statMemoryConfig);
    window.charts.push(statMemoryChart);
};

const setCpuChart = () => {
    const statCpuChart = new Chart(statCpuEl, statCpuConfig);
    window.charts.push(statCpuChart);
};

statRobotEl && setRobotStatChart();
statProcEl && setProcStatChart();
statWeekEl && setWeekChart();
statDiskEl && setDiskChart();
statMemoryEl && setMemoryChart();
statCpuEl && setCpuChart();

window.addEventListener("resize", function () {
    const chartElems = window.charts;
    chartElems.forEach((el) => el.update());
});
