import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";

const commaify = (value) => {
    const result = ("" + value).replace(/^(-?\d+)(\d{3})/, "$1,$2");
    return value == result ? result : commaify(result);
};

const getDatesStartToLast = (startDate, lastDate) => {
    const regex = RegExp(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/);
    if (!(regex.test(startDate) && regex.test(lastDate)))
        return "Not Date Format";
    let result = [];
    const curDate = new Date(startDate);
    while (curDate <= new Date(lastDate)) {
        const date = curDate.toISOString().split("T")[0];
        const month = date.split("-")[1];
        const day = date.split("-")[2];
        result.push(`${month}-${day}`);
        curDate.setDate(curDate.getDate() + 1);
    }
    return result;
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
const statWeekLabels = getDatesStartToLast("2022-11-08", "2022-11-21");
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

statRobotEl && setRobotStatChart();
statProcEl && setProcStatChart();
statWeekEl && setWeekChart();

window.addEventListener("resize", function () {
    const chartElems = window.charts;
    chartElems.forEach((el) => el.update());
});
