import * as chartJs from "chart.js";

let chart;

export const formatDateLabel = (timestamp,type) => {
  const date = new Date(timestamp);
  const month = date.getMonth();
  const day = date.getDate();
  const hours = date.getHours();

  const formatPart = (value) => {
    return value < 10 ? `0${value}` : `${value}`;
  };
  if(type==='hours'){
    return `${hours}/${formatPart(day)}`
  }
  return `${formatPart(day)}/${formatPart(month + 1)}`;
};

export const renderChart = (readings,type) => {
  chartJs.Chart.defaults.font.size = "10px";

  chartJs.Chart.register.apply(
    null,
    Object.values(chartJs).filter((chartClass) => chartClass.id)
  );

  const labels = readings.map(({ time }) => formatDateLabel(time,type));
  const values = readings.map(({ value }) => value);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "kWh usage",
        data: values,
        fill: true,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
        borderWidth: 0.2,
        backgroundColor: "#5A8EDA",
        borderRadius: 10,
      },
    ],
  };

  if (chart) {
    chart.destroy();
  }

  chart = new chartJs.Chart("usageChart", {
    type: "bar",
    data: data,
    options: {
      scales: {
        y: {
          grid: {
            display: false,
          },
        },
        x: {
          grid: {
            display: false,
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
      maintainAspectRatio: false,
    },
  });
};
