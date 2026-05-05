const monthlySales = [
  { month: "Jan", sales: 18000 },
  { month: "Feb", sales: 24500 },
  { month: "Mar", sales: 21800 },
  { month: "Apr", sales: 30200 },
  { month: "May", sales: 27600 },
  { month: "Jun", sales: 34100 }
];

const categories = [
  { name: "Electronics", value: 42000, color: "#2f80ed" },
  { name: "Furniture", value: 28500, color: "#16a085" },
  { name: "Apparel", value: 23600, color: "#f2a93b" },
  { name: "Accessories", value: 18100, color: "#ef6f6c" }
];

const products = [
  { name: "Laptop Pro 14", category: "Electronics", sales: 28600, profit: 8200 },
  { name: "Ergo Office Chair", category: "Furniture", sales: 19400, profit: 5100 },
  { name: "Travel Backpack", category: "Accessories", sales: 14600, profit: 3900 },
  { name: "Performance Jacket", category: "Apparel", sales: 12800, profit: 3300 }
];

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0
});

function setMetricValues() {
  const totalSales = monthlySales.reduce((sum, item) => sum + item.sales, 0);
  const totalProfit = products.reduce((sum, item) => sum + item.profit, 0);

  document.getElementById("totalSales").textContent = currency.format(totalSales);
  document.getElementById("totalProfit").textContent = currency.format(totalProfit);
  document.getElementById("totalProducts").textContent = products.length;
}

function drawBarChart() {
  const canvas = document.getElementById("barChart");
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  const padding = 48;
  const chartHeight = height - padding * 2;
  const chartWidth = width - padding * 2;
  const maxSales = Math.max(...monthlySales.map((item) => item.sales));
  const barGap = 24;
  const barWidth = (chartWidth - barGap * (monthlySales.length - 1)) / monthlySales.length;

  ctx.clearRect(0, 0, width, height);
  ctx.font = "14px Arial";
  ctx.textBaseline = "middle";

  ctx.strokeStyle = "#dfe8ef";
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = padding + (chartHeight / 4) * i;
    ctx.beginPath();
    ctx.moveTo(padding, y);
    ctx.lineTo(width - padding, y);
    ctx.stroke();
  }

  monthlySales.forEach((item, index) => {
    const barHeight = (item.sales / maxSales) * chartHeight;
    const x = padding + index * (barWidth + barGap);
    const y = height - padding - barHeight;

    ctx.fillStyle = "#2f80ed";
    ctx.fillRect(x, y, barWidth, barHeight);

    ctx.fillStyle = "#687789";
    ctx.textAlign = "center";
    ctx.fillText(item.month, x + barWidth / 2, height - 24);
    ctx.fillText(`${Math.round(item.sales / 1000)}k`, x + barWidth / 2, y - 14);
  });
}

function drawPieChart() {
  const canvas = document.getElementById("pieChart");
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) * 0.34;
  const total = categories.reduce((sum, item) => sum + item.value, 0);
  let startAngle = -Math.PI / 2;

  ctx.clearRect(0, 0, width, height);

  categories.forEach((item) => {
    const sliceAngle = (item.value / total) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
    ctx.closePath();
    ctx.fillStyle = item.color;
    ctx.fill();
    startAngle += sliceAngle;
  });

  ctx.beginPath();
  ctx.arc(centerX, centerY, radius * 0.52, 0, Math.PI * 2);
  ctx.fillStyle = "#ffffff";
  ctx.fill();

  ctx.fillStyle = "#17202a";
  ctx.font = "700 24px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(currency.format(total), centerX, centerY - 8);

  ctx.fillStyle = "#687789";
  ctx.font = "14px Arial";
  ctx.fillText("category sales", centerX, centerY + 20);
}

function renderLegend() {
  const legend = document.getElementById("pieLegend");
  legend.innerHTML = categories
    .map(
      (item) => `
        <div class="legend-item">
          <span class="legend-dot" style="background:${item.color}"></span>
          <span>${item.name} - ${currency.format(item.value)}</span>
        </div>
      `
    )
    .join("");
}

function renderProductsTable() {
  const table = document.getElementById("productsTable");
  table.innerHTML = products
    .map(
      (product) => `
        <tr>
          <td>${product.name}</td>
          <td>${product.category}</td>
          <td>${currency.format(product.sales)}</td>
          <td>${currency.format(product.profit)}</td>
        </tr>
      `
    )
    .join("");
}

function initDashboard() {
  setMetricValues();
  drawBarChart();
  drawPieChart();
  renderLegend();
  renderProductsTable();
}

initDashboard();
