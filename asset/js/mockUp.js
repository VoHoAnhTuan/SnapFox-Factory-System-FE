const mockupTableFirst = document.getElementById("mockupTable-first-body");
const mockupTableSecond = document.getElementById("mockupTable-second-body");
const imgCell = (src, alt) => src ? `<img src="${src}" alt="${alt}" />` : "";

// Fetch and render First Table
async function fetchFirstTable() {
  try {
    const response = await fetch(
     "https://mocki.io/v1/8873a6ef-319e-40cc-9451-ba17c9a36e8b"
    );
    const data = await response.json();
    renderFirstTableRows(data);
  } catch (error) {
    console.error("Error fetching first table:", error);
    mockupTableFirst.innerHTML = `<tr><td colspan="9">Failed to load data</td></tr>`;
  }
}

// Fetch and render Second Table
async function fetchSecondTable() {
  try {
    const response = await fetch(
      "https://mocki.io/v1/5d2778f2-2701-45f7-8c31-760ddb2bc9c5"
    );
    const data = await response.json();
    renderSecondTableRows(data);
  } catch (error) {
    console.error("Error fetching second table:", error);
    mockupTableSecond.innerHTML = `<tr><td colspan="9">Failed to load data</td></tr>`;
  }
}

fetchFirstTable();
fetchSecondTable();


function renderFirstTableRows(data) {
  mockupTableFirst.innerHTML = ""; // Clear old data

  data.forEach((order) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${order.orderCode}</td>
      <td>${order.sellerOrderID}</td>
      <td>${order.customerName}<br /><small>${order.customerAddress}</small><br /><small>${order.customerPhone}</small></td>
      <td>${order.totalQuantity}</td>
    `;

    mockupTableFirst.appendChild(row);
  });
}

function renderSecondTableRows(data) {
  mockupTableSecond.innerHTML = ""; // Clear old data

  data.forEach((order) => {
    const row = document.createElement("tr");

    row.innerHTML = `
        <tr>
          <td>${order.quantity}</td>
          <td>${order.variant}</td>
          <td>${imgCell(order.frontImg, "Front")}</td>
          <td>${imgCell(order.backImg, "Back")}</td>
          <td>${imgCell(order.rightImg, "Right")}</td>
          <td>${imgCell(order.leftImg, "Left")}</td>
          <td>${imgCell(order.neckImg, "Neck")}</td>
          <td>${imgCell(order.mockup, "Mockup")}</td>
        </tr>
    `;

    mockupTableSecond.appendChild(row);
  });
  }

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth" // smooth animation
  });
}
