// Chart and audio setup
const ctx = document.getElementById('rainChart').getContext('2d');
const rainAudio = document.getElementById('rainSound');

const rainChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Rain Detected',
      data: [],
      borderColor: '#60a5fa',
      tension: 0.4,
      fill: false,
      stepped: true,
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
        max: 1,
        ticks: {
          stepSize: 1,
          callback: v => v === 1 ? 'Yes' : 'No'
        }
      }
    },
    plugins: {
      legend: {
        display: true
      }
    }
  }
});

rainAudio.volume = 0.2;

function enableAudioOnUserGesture() {
  function onFirstInteraction() {
    rainAudio.volume = 0.2;
    document.removeEventListener('click', onFirstInteraction);
    document.removeEventListener('keydown', onFirstInteraction);
  }
  document.addEventListener('click', onFirstInteraction);
  document.addEventListener('keydown', onFirstInteraction);
}
enableAudioOnUserGesture();

//  Fetch data from ESP32 endpoint /rain
async function fetchESP32RainData() {
  try {
    const response = await fetch('/rain');
    const data = await response.json();

    document.getElementById("temp").innerText = `${data.temperature} °C`;
    document.getElementById("humidity").innerText = `${data.humidity} %`;
    document.getElementById("rainStatus").innerText = data.status;

    const now = new Date();
    const timeLabel = now.toLocaleTimeString();
    document.getElementById("updated").innerText = timeLabel;

    // Update chart
    if (rainChart.data.labels.length >= 10) {
      rainChart.data.labels.shift();
      rainChart.data.datasets[0].data.shift();
    }
    rainChart.data.labels.push(timeLabel);
    rainChart.data.datasets[0].data.push(data.status === "Rain Detected" ? 1 : 0);
    rainChart.update();

    // Play/pause sound
    if (data.status === "Rain Detected") {
      rainAudio.play().catch(e => {
        console.log("Audio play blocked until user interaction");
      });
    } else {
      rainAudio.pause();
    }

  } catch (error) {
    console.error("ESP32 rain fetch error:", error);
    document.getElementById("rainStatus").innerText = "ESP32 error";
    rainAudio.pause();
  }
}

// Fetch initially and every 5 seconds
window.addEventListener('load', fetchESP32RainData);
setInterval(fetchESP32RainData, 5000);

// ====== Toggle Light ======
let lightOn = false;

document.getElementById("toggleLightBtn").addEventListener("click", async () => {
  lightOn = !lightOn;

  try {
    const res = await fetch("/toggleLight", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `state=${lightOn ? "on" : "off"}`
    });

    if (res.ok) {
      alert(`💡 Light turned ${lightOn ? "ON" : "OFF"}`);
    } else {
      alert("❌ Failed to toggle light.");
    }
  } catch (err) {
    console.error("LED toggle error:", err);
    alert("❌ LED request failed.");
  }
});

// ====== Toggle Servo ======
let servoAt90 = false;

document.getElementById("toggleServoBtn").addEventListener("click", async () => {
  servoAt90 = !servoAt90;
  const angle = servoAt90 ? 90 : 0;

  try {
    const res = await fetch("/toggleServo", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `angle=${angle}`
    });

    if (res.ok) {
      alert(`🔧 Servo moved to ${angle}°`);
    } else {
      alert("❌ Failed to move servo.");
    }
  } catch (err) {
    console.error("Servo toggle error:", err);
    alert("❌ Servo request failed.");
  }
});

// ====== Export Logs Button ======
document.querySelector(".btn-green").addEventListener("click", async () => {
  try {
    const res = await fetch("/logs");
    if (res.ok) {
      const html = await res.text();
      const logs = html.replace(/<[^>]+>/g, '').replace(/&lt;/g, '<').replace(/&gt;/g, '>').trim();
      document.querySelector(".logs textarea").value = logs;
      alert("📄 Logs fetched and displayed.");
    } else {
      alert("❌ Failed to fetch logs.");
    }
  } catch (err) {
    console.error("Logs fetch error:", err);
    alert("❌ Log request failed.");
  }
});

// ====== Download Logs ======
function downloadLogs() {
  window.open("/downloadLogs", "_blank");
}

// ====== Reset Servo to Auto Mode ======
function resetServoAuto() {
  fetch("/resetServo", {
    method: "POST"
  }).then(res => {
    if (res.ok) {
      alert("✅ Servo is now in Auto Mode.");
    } else {
      alert("❌ Failed to reset servo.");
    }
  }).catch(err => {
    console.error("Reset servo error:", err);
    alert("❌ Request error.");
  });
}
