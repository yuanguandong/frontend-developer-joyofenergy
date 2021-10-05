import { renderCard } from "./card.js";
import { renderChart } from "./chart.js";
import { getReadings, groupByDay, sortByTime } from "./reading";



const readings = await getReadings();
renderChart(sortByTime(groupByDay(readings)).slice(-30));
renderCard(sortByTime(groupByDay(readings)).slice(-30))

const last24HoursBtn = document.getElementById('last24Hours')
const last30DayBtn = document.getElementById('last30days')

last30DayBtn.addEventListener('click',()=>{
  renderChart(sortByTime(groupByDay(readings)).slice(-30));
  renderCard(sortByTime(groupByDay(readings)).slice(-30))
})

last24HoursBtn.addEventListener('click',()=>{
  renderChart(sortByTime(readings).slice(-24),'hours');
  renderCard(sortByTime(readings).slice(-24))
})
