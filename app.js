"use strict";
// 全局库存数组
let inventory = [];
// 添加商品函数
function addItem() {
    // 获取输入框元素
    const idInput = document.getElementById("itemId");
    const nameInput = document.getElementById("itemName");
    const categoryInput = document.getElementById("category");
    const priceInput = document.getElementById("price");
    const output = document.getElementById("output");
    // 非空校验
    if (!idInput.value || !nameInput.value || !categoryInput.value || !priceInput.value) {
        output.innerText = "Error: Please fill in all fields!";
        return;
    }
    // 类型转换
    const id = parseInt(idInput.value);
    const name = nameInput.value.trim();
    const category = categoryInput.value.trim();
    const price = parseFloat(priceInput.value);
    // ID唯一性校验
    if (inventory.some(item => item.id === id)) {
        output.innerText = "Error: Item ID already exists!";
        return;
    }
    // 创建新商品
    const newItem = {
        id,
        name,
        category,
        price,
        inStock: true
    };
    // 加入库存
    inventory.push(newItem);
    output.innerText = "Item added successfully!";
    // 清空输入框
    idInput.value = "";
    nameInput.value = "";
    categoryInput.value = "";
    priceInput.value = "";
}
// 显示所有商品函数
function showAllItems() {
    const output = document.getElementById("output");
    if (inventory.length === 0) {
        output.innerText = "No items in inventory.";
        return;
    }
    // 生成表格化展示
    let html = "<h3>All Inventory Items</h3>";
    html += `
    <table border="1" cellpadding="8" cellspacing="0">
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Category</th>
        <th>Price ($)</th>
        <th>In Stock</th>
      </tr>
  `;
    inventory.forEach(item => {
        html += `
      <tr>
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td>${item.category}</td>
        <td>${item.price.toFixed(2)}</td>
        <td>${item.inStock ? "✅ Yes" : "❌ No"}</td>
      </tr>
    `;
    });
    html += "</table>";
    output.innerHTML = html;
}
// 按分类筛选商品
function filterByCategory() {
    const categoryInput = document.getElementById("filterCategory");
    const output = document.getElementById("output");
    const category = categoryInput.value.trim().toLowerCase();
    if (!category) {
        output.innerText = "Please enter a category to filter.";
        return;
    }
    const filtered = inventory.filter(item => item.category.toLowerCase().includes(category));
    if (filtered.length === 0) {
        output.innerText = `No items found in category: ${category}`;
        return;
    }
    let html = `<h3>Items in Category: ${category}</h3>`;
    html += `
    <table border="1" cellpadding="8" cellspacing="0">
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Price ($)</th>
      </tr>
  `;
    filtered.forEach(item => {
        html += `
      <tr>
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td>${item.price.toFixed(2)}</td>
      </tr>
    `;
    });
    html += "</table>";
    output.innerHTML = html;
}
// 计算库存总价值
function calculateTotalValue() {
    const output = document.getElementById("output");
    const total = inventory.reduce((sum, item) => sum + item.price, 0);
    output.innerText = `Total inventory value: $${total.toFixed(2)}`;
}
// 🔑 关键：把所有函数挂载到window，确保HTML能调用
window.addItem = addItem;
window.showAllItems = showAllItems;
window.filterByCategory = filterByCategory;
window.calculateTotalValue = calculateTotalValue;
