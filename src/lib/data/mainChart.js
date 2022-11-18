import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";

const commaify = (value) => {
    const result = ("" + value).replace(/^(-?\d+)(\d{3})/, "$1,$2");
    return value == result ? result : commaify(result);
};

window.charts = [];
const statRobotEl = document.getElementById("statRobotChart");
const statRobotConfig = {
    type: "bar",
    data: {
        labels: ["상태별 사용자"],
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

const setRobotStatChart = () => {
    const statRobotChart = new Chart(statRobotEl, statRobotConfig);
    window.charts.push(statRobotChart);
};

statRobotEl && setRobotStatChart();

window.addEventListener("resize", function () {
    const chartElems = window.charts;
    chartElems.forEach((el) => el.update());
});
