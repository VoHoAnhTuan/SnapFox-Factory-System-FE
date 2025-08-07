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
    const response = await fetch('https://mocki.io/v1/3c875504-cc72-44f5-bd33-f4e83d835f5c');
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
      <td>${order.shippingMethod}</td>
      <td>${order.productionLine}</td>
      <td><span class="badge film-status-${order.filmStatus.toLowerCase()}">${order.filmStatus}</td>
      <td><span class="badge badge-${order.factoryStatus.toLowerCase()}">${order.factoryStatus}</span></td>
      <td>${order.trackingNumber}</td>
      <td>${order.createdDate}</td>
      <td><button class="btn-detail">Detail</button></td>
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
