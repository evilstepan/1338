"use strict";

let form = document.getElementById("first-form");
let checkbox = form.querySelector('input[type="checkbox"]');
let discount = form.querySelector(".discount-form");
let closeBut = document.querySelector(".add-product");

let openProduct = document.querySelector(".buttona");
let moduleCms = document.querySelector(".module-cms");
let backgroundCms = document.querySelector(".second-section");
let buttonCancel = document.querySelector(".button-cancel");
let overlay = document.querySelector(".overlay");

const iconsImg = document.querySelectorAll(".icons-img");
const iconsEdit = document.querySelectorAll(".icons-edit");
const iconsDel = document.querySelectorAll(".icons-del");
let inpuT = document.querySelector("input");

let data = JSON.parse(localStorage.getItem("products")) || []; // Initialize data as an array
let totalSum = 0;

let storedData = localStorage.getItem("products");

if (storedData) {
  data = JSON.parse(storedData);
  data.forEach(addProductToTable);
}

openProduct.addEventListener("click", () => {
  moduleCms.style.display = "block";
  overlay.style.display = "block";
});

buttonCancel.addEventListener("click", () => {
  form.reset();
  moduleCms.style.display = "none";
  overlay.style.display = "none";
});

checkbox.addEventListener("change", () => {
  if (checkbox.checked) {
    discount.removeAttribute("disabled");
  } else {
    discount.setAttribute("disabled", "");
    discount.value = "";
  }
});

let addProduct = document.querySelector(".add-product");

addProduct.addEventListener("click", () => {
  const formData = new FormData(form);
  let newData = Object.fromEntries(formData);

  if (isValidData(newData)) {
    form.querySelector('input[name="name"]').value = "";
    form.querySelector('input[name="category"]').value = "";
    form.querySelector("textarea.description").value = "";
    form.querySelector('input[name="units"]').value = "";
    form.querySelector('input[name="discount"]').value = "";
    form.querySelector('input[name="count"]').value = "";
    form.querySelector('input[name="price"]').value = "";

    addProductToTable(newData);

    moduleCms.style.display = "block";
    overlay.style.display = "block";

    data.push(newData);
    localStorage.setItem("products", JSON.stringify(data));
  } else {
    alert("Проверьте правильность заполнения полей.");
  }
  document.querySelector(".first-section__price-text1").textContent = 0;
});

function addProductToTable(data) {
  let tr = document.querySelector(".table-section_tr-th");
  let trNew = document.createElement("tr");
  tr.after(trNew);

  let quantity = parseInt(data["count"]);
  let price = parseFloat(data["price"]);
  let discount = parseFloat(data["discount"]) || 0;
  let total = quantity * price;
  let discountedTotal = total - (total * discount / 100);

  for (let key in data) {
    if (key !== "discount") {
      let tdNew = document.createElement("td");
      tdNew.innerHTML = data[key];
      trNew.append(tdNew);
    }
  }

  let tdTotal = document.createElement("td");
  tdTotal.innerHTML = discountedTotal.toFixed(2);
  trNew.append(tdTotal);

  let idRandom = generateRandomNumber();
  let tdId = document.createElement("td");
  tdId.innerHTML = idRandom;
  tdId.classList.add("id-td");
  trNew.prepend(tdId);

  let iconsImgNew = document.createElement("div");
  iconsImgNew.innerHTML = `<img src="carbon_no-image.svg" class = 'imgNew' alt="" width="20px" height="20px" data-pic='https://beebazar.ru/wp-content/uploads/2010/12/x_9d5bca11.jpg'> `;
  let iconsEditNew = document.createElement("div");
  iconsEditNew.innerHTML = `<img src="akar-icons_edit.svg" alt="" width="20px" height="20px">`;
  let iconsDelNew = document.createElement("div");
  iconsDelNew.innerHTML = `<img src="remove.svg" alt="" width="20px" height="20px"`;


  let tdIcons = document.createElement("td");
  tdIcons.classList.add("icons-img");
  tdIcons.appendChild(iconsImgNew);
  tdIcons.appendChild(iconsEditNew);
  tdIcons.appendChild(iconsDelNew);
  trNew.appendChild(tdIcons);

  totalSum += discountedTotal;
  document.querySelector(".first-section__price-text").textContent = totalSum.toFixed(2);

  // Добавление обработчика события для удаления товара
  iconsDelNew.addEventListener("click", function () {
    let row = this.closest("tr");
    let productName = row.cells[1].textContent; // Получаем имя товара для удаления

    // Удаление товара из таблицы
    let priceCell = row.querySelector("td:nth-last-child(2)");
    let price = parseFloat(priceCell.textContent);
    totalSum -= price;
    document.querySelector(".first-section__price-text").textContent = totalSum.toFixed(2);
    row.remove();

    // Удаление товара из localStorage
    let updatedData = Array.from(data).filter(
      (product) => product.name !== productName
    );
    localStorage.setItem("products", JSON.stringify(updatedData));
  });

  // Добавление обработчика события для редактирования ID
  document.querySelectorAll(".id-td").forEach((cell) => {
    cell.addEventListener("click", function () {
      let currentId = this.textContent;
      let newId = prompt(`Введите новый ID для товара с ID ${currentId}:`);

      if (newId !== null) {
        this.textContent = newId;
        data.forEach((product) => {
          if (product.id === currentId) {
            product.id = newId;
          }
        });
        localStorage.setItem("products", JSON.stringify(data));
      }
    });
  });
}

form.querySelector('input[name="count"]').addEventListener("input", updateSum);
form.querySelector('input[name="price"]').addEventListener("input", updateSum);

// Добавление обработчика события для поля ввода скидки
form
  .querySelector('input[name="discount"]')
  .addEventListener("input", calculateDiscount);

function calculateDiscount() {
  let discountInput = form.querySelector('input[name="discount"]');
  let discountValue = parseFloat(discountInput.value) || 0;

  if (discountValue > 99) {
    discountInput.value = "99";
    discountValue = 99;
  }

  let priceInput = form.querySelector('input[name="price"]');
  let price = parseFloat(priceInput.value) || 0;
  let count = parseInt(form.querySelector('input[name="count"]').value) || 0;

  let total = price * count;
  let discountedTotal = total - (total * discountValue / 100);

  document.querySelector(".first-section__price-text1").textContent = discountedTotal.toFixed(2);
}

function updateSum() {
  const count = parseInt(form.querySelector('input[name="count"]').value) || 0;
  const price =
    parseFloat(form.querySelector('input[name="price"]').value) || 0;
  const total = count * price;
  document.querySelector(".first-section__price-text1").textContent = total.toFixed(2);
}

function generateRandomNumber() {
  return Math.floor(Math.random() * (999999999 - 100000000 + 1)) + 100000000;
}

function isValidData(data) {
  if (isNaN(parseInt(data.count)) || isNaN(parseFloat(data.price))) {
    return false;
  }

  for (let key in data) {
    if (typeof data[key] === "string" && data[key].trim() === "") {
      return false;
    }
  }

  return true;
}

