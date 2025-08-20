// Dashboard charts
async function fetchChartData() {
  try {
    const response = await fetch('https://mocki.io/v1/fb6f0381-817c-4b44-be70-54277341211d'); // replace with real backend
    const data = await response.json();

    if (data.bar) renderBarChart(data.bar);
    if (data.doughnut) renderPieChart(data.doughnut);
    if (data.productionLine) renderLineChart1(data.productionLine);
    if (data.trackingLine) renderLineChart2(data.trackingLine);
  } catch (err) {
    console.error("Error fetching chart data:", err);
  }
}

function renderBarChart({ labels, values }) {
  new Chart(document.getElementById('barChart').getContext('2d'), {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Orders',
        data: values,
        backgroundColor: '#ec9f3b'
      }]
    },
    options: { responsive: true }
  });
}

function renderPieChart({ labels, values }) {
  new Chart(document.getElementById('pieChart').getContext('2d'), {
    type: 'doughnut',
    data: {
      labels,
      datasets: [{
        data: values,
        backgroundColor: ['#74a947', '#dadadaff']
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,   // let CSS control canvas size
      cutout: '60%',                // hole size (tweak for ring thickness)
      radius: '90%',                // outer radius within the canvas
      plugins: {
        legend: {
          position: 'right',        // labels on the right
          align: 'center',
          labels: {
            font: { size: 12 },     // legend text size
            boxWidth: 14,           // color box size
            padding: 4           // space between legend items
          }
        }
      },
    }
  });
}


function renderLineChart1({ labels, values }) {
  new Chart(document.getElementById('lineChart1').getContext('2d'), {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Production Time',
        data: values,
        borderColor: '#28a745',
        fill: false
      }]
    },
    options: { responsive: true }
  });
}

function renderLineChart2({ labels, values }) {
  new Chart(document.getElementById('lineChart2').getContext('2d'), {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Tracking Time',
        data: values,
        borderColor: '#ff6384',
        fill: false
      }]
    },
    options: { responsive: true }
  });
}

fetchChartData();
// setInterval(fetchChartData, 60000); // every 60s

// Status card
document.addEventListener("DOMContentLoaded", () => {
  const statusContainer = document.getElementById("statusCardsContainer");

  async function fetchStatusData() {
    try {
      const res = await fetch("https://mocki.io/v1/66b7a792-ac65-4854-96f6-d3612ab62663"); //replace real API
      const data = await res.json();

      renderStatusCards(data);
    } catch (err) {
      console.error("Failed to load status cards:", err);
    }
  }

  function renderStatusCards(statusCounts) {
    // Mapping of status to class and label
    const statusMap = {
      new: { label: "New Order", class: "new" },
      processing: { label: "Processing", class: "processing" },
      ready: { label: "Ready to Ship", class: "ready" },
      completed: { label: "Completed", class: "completed" },
      cancelled: { label: "Cancelled", class: "cancelled" },
      hold: { label: "Hold Off", class: "hold" }
    };

    statusContainer.className = `row row-cols-12 gx-3 gy-3 mb-3`;
    statusContainer.innerHTML = "";

    for (const key in statusMap) {
      const { label, class: statusClass } = statusMap[key];
      const count = statusCounts[key] ?? 0;

      const card = document.createElement("div");
      card.className = `status-card ${statusClass} col-sm-12 col-lg-auto`;
      card.innerHTML = `${label}<br/>${count}`;

      statusContainer.appendChild(card);
    }
  }

  // Fetch status data
  fetchStatusData();
});






