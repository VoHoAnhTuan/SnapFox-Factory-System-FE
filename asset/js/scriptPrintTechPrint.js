const printTechTableBody = document.getElementById("printTechTableBody");

async function fetchOrders() {
  try {
    // Replace this with your real API endpoint
    const response = await fetch(
      "https://mocki.io/v1/30e2646f-be6d-4520-a574-32b4b90b89f7"
    );
    const orders = await response.json();

    renderOrderRows(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    printTechTableBody.innerHTML = `<tr><td colspan="9">Failed to load data</td></tr>`;
  }
}

function renderOrderRows(data) {
  printTechTableBody.innerHTML = ""; // Clear old data

  data.forEach((order) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td><input type="checkbox" class="row-checkbox" /></td>
      <td>${order.createdTime}</td>
      <td>${order.fileName}</td>
      <td id="downloadCell">
        <button class="btn">Download</button>
      </td>
      <td>${order.user}</td>
      <td>
      <button id="lockBtn" class="btn">Lock</button>
      <button id="unlockBtn" class="btn">Unlock</button>
      </td>
    `;

    printTechTableBody.appendChild(row);
  });
}

// Initial fetch
fetchOrders();

// SELECT ALL table
document.addEventListener("DOMContentLoaded", () => {
  const selectAll = document.getElementById("selectAll");

  selectAll.addEventListener("change", () => {
    const checkboxes = document.querySelectorAll(".row-checkbox");
    checkboxes.forEach((cb) => (cb.checked = selectAll.checked));
  });
  // If all single row selected, reflect in the first select
  document.addEventListener("change", (e) => {
    if (e.target.classList.contains("row-checkbox")) {
      const allCheckboxes = document.querySelectorAll(".row-checkbox");
      const allChecked = [...allCheckboxes].every((cb) => cb.checked);
      selectAll.checked = allChecked;
    }
  });
});
