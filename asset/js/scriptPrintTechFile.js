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
      <td id="uploadCell">
          <form id="uploadForm">
            <input type="file" id="fileInput" name="file"/>
            <button class="btn-upload">Upload</button>
          </form>
      </td>
      <td>${order.user}</td>
      <td>${order.fileAmount}</td>
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

// upload file
document.getElementById("uploadForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files[0];

  if (!file) {
    alert("Please choose a file.");
    return;
  }

  const formData = new FormData();
  formData.append("file", file); // "file" must be server's expected field

  fetch("https://your-api-endpoint.com/upload", {
    method: "POST",
    body: formData,

  })
    .then((response) => {
      if (!response.ok) throw new Error("Upload failed");
      return response.json();
    })
    .then((data) => {
      console.log("Upload success:", data);
      alert("File uploaded successfully");
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Upload failed");
    });
});
