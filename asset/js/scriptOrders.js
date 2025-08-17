const dropdownButtons = document.querySelectorAll('.filter-btn');

dropdownButtons.forEach(button => {
  button.addEventListener('click', function (e) {
    e.stopPropagation(); // Prevent from closing immediately
    const options = this.nextElementSibling;

    // Close all other dropdowns
    document.querySelectorAll('.filter-options').forEach(opt => {
      if (opt !== options) {
        opt.style.display = 'none';
      }
    });

    // Toggle current dropdown
    options.style.display = (options.style.display === 'block') ? 'none' : 'block';
  });
});

// Close all dropdowns if clicking outside
window.addEventListener('click', function () {
  document.querySelectorAll('.filter-options').forEach(opt => {
    opt.style.display = 'none';
  });
});

// Change button label to selected option
const dropdownOptions = document.querySelectorAll('.filter-options div');

dropdownOptions.forEach(option => {
  option.addEventListener('click', function () {
    const dropdown = this.closest('.filter-dropdown');
    const button = dropdown.querySelector('.filter-btn');

    // Keep the filter name before the colon
    const label = button.textContent.split(':')[0];
    button.textContent = `${label}: ${this.textContent}`;

    // Close dropdown
    dropdown.querySelector('.filter-options').style.display = 'none';
  });
});

const orderTableBody = document.getElementById('orderTableBody');

async function fetchOrders() {
  try {
    // Replace this with your real API endpoint
    const response = await fetch('https://mocki.io/v1/30e2646f-be6d-4520-a574-32b4b90b89f7');
    const orders = await response.json();

    renderOrderRows(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    orderTableBody.innerHTML = `<tr><td colspan="9">Failed to load data</td></tr>`;
  }
}

function renderOrderRows(data) {
  orderTableBody.innerHTML = ''; // Clear old data

  data.forEach(order => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td><input type="checkbox" class="row-checkbox" /></td>
      <td>${order.sellerId}</td>
      <td>${order.sellerOrderId}</td>
      <td>${order.orderCode}</td>
      <td>${order.customerName}<br /><small>${order.customerAddress}</small></td>
      <td>${order.variant}</td>
      <td>${order.quantity}</td>
      <td>${order.printType}</td>
      <td>${order.shippingMethod}</td>
      <td>${order.productionLine}</td>
      <td><span class="badge film-status-${order.filmStatus.toLowerCase()}">${order.filmStatus}</td>
      <td><span class="badge badge-${order.factoryStatus.toLowerCase()}">${order.factoryStatus}</span></td>
      <td>${order.trackingNumber}</td>
      <td>${order.createdDate}</td>
      <td><button class="btn" data-order-code="${order.orderCode}">Detail</button></td>
    `;

    orderTableBody.appendChild(row);
  });
}

// Initial fetch
fetchOrders();

// SELECT ALL table
document.addEventListener("DOMContentLoaded", () => {
  const selectAll = document.getElementById("selectAll");

  selectAll.addEventListener("change", () => {
    const checkboxes = document.querySelectorAll(".row-checkbox");
    checkboxes.forEach(cb => cb.checked = selectAll.checked);
  });
  // If all single row selected, reflect in the first select
  document.addEventListener("change", (e) => {
    if (e.target.classList.contains("row-checkbox")) {
      const allCheckboxes = document.querySelectorAll(".row-checkbox");
      const allChecked = [...allCheckboxes].every(cb => cb.checked);
      selectAll.checked = allChecked;
    }
  });
});

// Image Modal
function showImageModal(orderCode) {
  // fetch(`https://mocki.io/v1/f2b9cb8f-b72e-45c7-83f5-632de2b06671/${orderCode}}`)
  fetch(`https://mocki.io/v1/17e1c771-5ff4-465c-856e-2f242cb54f25`)
    .then(res => res.json())
    .then(data => {
      if (!data || typeof data !== 'object') {
        document.getElementById("imageModalTableBody").innerHTML = `
          <tr><td colspan="10" style="text-align:center;">No image detail available</td></tr>
        `;
        document.getElementById("imageModal").style.display = "block";
        return;
      }

      const safeImg = (src, label) => {
        return src
          ? `<img src="${src}" alt="${label}" />`
          : `<div class="empty-cell"></div>`;
      };

      const safeText = (text) => {
        return text && text !== "null" ? text : "";
      };

      const sizes = data.sizes || {};

      const sizeHTML = `
        ${safeText(sizes.front) ? `Front: ${sizes.front}<br/>` : ""}
        ${safeText(sizes.back) ? `Back: ${sizes.back}<br/>` : ""}
        ${safeText(sizes.left) ? `Left: ${sizes.left}<br/>` : ""}
        ${safeText(sizes.right) ? `Right: ${sizes.right}<br/>` : ""}
        ${safeText(sizes.neck) ? `Neck: ${sizes.neck}` : ""}
      `;

      const downloadHTML = data.downloadUrl
        ? `<a href="${data.downloadUrl}" download>Download</a>`
        : `<div class="empty-cell"></div>`;

      const row = `
        <tr>
          <td>${safeImg(data.frontImg, "Front")}</td>
          <td>${safeImg(data.backImg, "Back")}</td>
          <td>${safeImg(data.frontMockup, "Front Mockup")}</td>
          <td>${safeImg(data.backMockup, "Back Mockup")}</td>
          <td>${safeImg(data.leftImg, "Left")}</td>
          <td>${safeImg(data.rightImg, "Right")}</td>
          <td>${safeImg(data.neckImg, "Neck")}</td>
          <td>${safeImg(data.mockup, "Mockup")}</td>
          <td>${sizeHTML}</td>
          <td>${downloadHTML}</td>
        </tr>
      `;

      document.getElementById("imageModalTableBody").innerHTML = row;
      document.getElementById("imageModal").style.display = "block";
    })
    .catch(err => {
      console.error("Modal fetch error:", err);
      document.getElementById("imageModalTableBody").innerHTML = `
        <tr><td colspan="10" style="text-align:center;">Failed to load image detail</td></tr>
      `;
      document.getElementById("imageModal").style.display = "block";
    });
}

function closeImageModal() {
  document.getElementById("imageModal").style.display = "none";
}

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("btn")) {
    const orderCode = e.target.dataset.orderCode;
    showImageModal(orderCode);
  }
});

//Close modal if outside
function closeModalOnOutsideClick(modalId) {
  const modal = document.getElementById(modalId);

  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
}
closeModalOnOutsideClick("imageModal");

//Close modal if click Escape
window.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    document.getElementById("imageModal").style.display = "none";
  }
});





