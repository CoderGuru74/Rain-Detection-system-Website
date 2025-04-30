// script.js

let rainData = [];
let labels = [];
const maxPoints = 20;

const rainChart = new Chart(document.getElementById("rainChart"), {
  type: "line",
  data: {
    labels: labels,
    datasets: [{
      label: "Rain Level (0 = Dry, 1 = Rain)",
      backgroundColor: "#007bff66",
      borderColor: "#007bff",
      data: rainData,
      fill: true,
    }]
  },
  options: {
    scales: {
      y: {
        suggestedMin: 0,
        suggestedMax: 1
      }
    }
  }
});

function updateGraph(value) {
  const time = new Date().toLocaleTimeString();
  labels.push(time);
  rainData.push(value);
  if (labels.length > maxPoints) {
    labels.shift();
    rainData.shift();
  }
  rainChart.update();
}

function updateStatus(rainDetected) {
  document.getElementById("rainStatus").textContent = rainDetected ? "Rain Detected" : "No Rain";
  document.getElementById("lightStatus").textContent = rainDetected ? "On" : "Off";
  document.getElementById("servoStatus").textContent = rainDetected ? "90°" : "0°";
}

async function fetchData() {
  try {
    const response = await fetch("/data");
    const result = await response.json(); // expected { rain: 0 or 1 }
    const rain = result.rain;
    updateStatus(rain === 1);
    updateGraph(rain);
  } catch (err) {
    console.error("Error fetching data:", err);
  }
}

// Update every 2 seconds
setInterval(fetchData, 2000);
fetchData();
