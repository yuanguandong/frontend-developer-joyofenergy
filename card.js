import { radio, printRadio } from "./config.js";

//总耗电量
export const getTotalConsumption = (data) => {
  const total = data.reduce((t, cur) => t + cur.value, 0);
  return Math.ceil(total);
};

export const getTotalCost = (consumption) => {
  return Math.ceil(radio * consumption);
};
//碳排放
export const getFootprint = (consumption) => {
  return (consumption * printRadio).toFixed(4);
};

//渲染卡片
export const renderCard = (data) => {
  const consumption = getTotalConsumption(data);
  const footPrint = getFootprint(consumption);
  const cost = getTotalCost(consumption);
  const dataSource = [
    {
      title: "Cost",
      value: cost,
      unit: "$",
    },
    {
      title: "Consumption",
      value: consumption,
      unit: "kW/h",
    },
    {
      title: "FootPrint",
      value: footPrint,
      unit: "tonnes",
    },
  ];

  const app = document.getElementById("app");
  app.innerHTML = null;
  dataSource.forEach((item) => {
    const numCard = document.createElement("div");
    numCard.className = "num-card";

    const titleEle = document.createElement("div");
    titleEle.className = "title";
    titleEle.innerHTML = item.title;

    const countEle = document.createElement("div");
    countEle.className = "count";
    countEle.innerHTML = item.value;

    const unitEle = document.createElement("div");
    unitEle.className = "unit";
    unitEle.innerHTML = item.unit;

    numCard.appendChild(titleEle);
    numCard.appendChild(countEle);
    numCard.appendChild(unitEle);

    app.appendChild(numCard);
  });
};
