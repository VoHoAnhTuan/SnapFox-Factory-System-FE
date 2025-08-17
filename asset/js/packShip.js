const mockupTableFirst = document.getElementById("mockupTable-first-body");
const mockupTableSecond = document.getElementById("mockupTable-second-body");
const imgCell = (src, alt) => (src ? `<img src="${src}" alt="${alt}" />` : "");

// Fetch and render First Table
async function fetchFirstTable() {
  try {
    const response = await fetch(
      "https://mocki.io/v1/8ad72d33-5af9-4bef-ab54-375502386d45"
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
      <td>${order.trackingNumber}</td>
      <td class="label-cell"></td>
    `;
    const labelCell = row.querySelector(".label-cell");
    renderLabelCell(labelCell, order.labelLink);
    mockupTableFirst.appendChild(row);
  });
}

function renderSecondTableRows(data) {
  mockupTableSecond.innerHTML = ""; // Clear old data

  data.forEach((order) => {
    const row = document.createElement("tr");

    row.innerHTML = `
          <td>${order.quantity}</td>
          <td>${order.variant}</td>
          <td>${imgCell(order.frontImg, "Front")}</td>
          <td>${imgCell(order.backImg, "Back")}</td>
          <td>${imgCell(order.rightImg, "Right")}</td>
          <td>${imgCell(order.leftImg, "Left")}</td>
          <td>${imgCell(order.neckImg, "Neck")}</td>
          <td>${imgCell(order.mockup, "Mockup")}</td>
    `;

    mockupTableSecond.appendChild(row);
  });
}

// Helper function to render PDF or img
function renderLabelCell(cell, url) {
  if (!url) {
    cell.textContent = "—";
    return;
  }

  if (/\.(png|jpe?g|webp|gif)$/i.test(url)) {
    const img = new Image();
    img.src = url;
    img.alt = "Shipping label";
    img.style.maxWidth = "140px";
    img.style.maxHeight = "140px";
    cell.appendChild(img);
  } else if (/\.pdf$/i.test(url)) {
    const a = document.createElement("a");
    a.href = url;
    a.target = "_blank";
    a.rel = "noopener";
    a.textContent = "View PDF label";
    cell.appendChild(a);
  } else {
    const a = document.createElement("a");
    a.href = url;
    a.target = "_blank";
    a.rel = "noopener";
    a.textContent = "Open label";
    cell.appendChild(a);
  }
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth", // smooth animation
  });
}
