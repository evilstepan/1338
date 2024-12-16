"use strict";

export let data = JSON.parse(localStorage.getItem("products")) || [];
export let totalSum = 0;

export function addProductToTable(data) {
  // Логика добавления товара в таблицу

  let tr = document.querySelector(".table-section_tr-th");
  let trNew = document.createElement("tr");
  tr.after(trNew);

  let quantity = parseInt(data["count"]);
  let price = parseFloat(data["price"]);
  let discount = parseFloat(data["discount"]) || 0;
  let total = quantity * price;
  let discountedTotal = total - (total * discount) / 100;

  for (let key in data) {
    if (key !== "discount" && key !== "img") {
      let tdNew = document.createElement("td");
      tdNew.innerHTML = data[key];
      trNew.append(tdNew);
    }
  }

  let imgName = data.img

  let tdTotal = document.createElement("td");
  tdTotal.innerHTML = discountedTotal.toFixed(2);
  trNew.append(tdTotal);

  let idRandom = generateRandomNumber();
  let tdId = document.createElement("td");
  tdId.innerHTML = idRandom;
  tdId.classList.add("id-td");
  trNew.prepend(tdId);
  let newSet = document.getElementById('imgSet').value
  console.log(newSet)

  let iconsImgNew = document.createElement("div");
  let imagePath = `img/product/${imgName}`;
  iconsImgNew.innerHTML = `<img src="clarity_picture-line.svg" alt="" width="20px" height="20px" class ="fp" data-pic='${imagePath}' >`;
  iconsImgNew.setAttribute("data-pic", imagePath);
  let iconsEditNew = document.createElement("div");
  iconsEditNew.innerHTML = `<img src="akar-icons_edit.svg" alt="" width="20px" height="20px" class = "sp">`;
  let iconsDelNew = document.createElement("div");
  iconsDelNew.innerHTML = `<img src="remove.svg" alt="" width="20px" height="20px" >`;

  let tdIcons = document.createElement("td");
  tdIcons.classList.add("icons-img");
  tdIcons.appendChild(iconsImgNew);
  tdIcons.appendChild(iconsEditNew);
  tdIcons.appendChild(iconsDelNew);
  trNew.appendChild(tdIcons);

  totalSum += discountedTotal;
  document.querySelector(".first-section__price-text").textContent =
    totalSum.toFixed(2);

  if (imagePath.startsWith('img/product/') && imagePath !== 'img/product/') {
    console.log('Правильный путь к изображению');
    let element = document.querySelector('.fp');
    element.classList.add('activate')
  } else {
    // Код для неправильного пути к изображению
    iconsImgNew.innerHTML = `<img src="carbon_no-image.svg" alt="" width="20px" height="20px" class ="fp" data-pic='${imagePath}' >`;
  }

  // Добавление обработчика события для удаления товара
  iconsDelNew.addEventListener("click", function () {
    let row = this.closest("tr");
    let productName = row.cells[1].textContent; // Получаем имя товара для удаления

    // Удаление товара из таблицы
    let priceCell = row.querySelector("td:nth-last-child(2)");
    let price = parseFloat(priceCell.textContent);
    totalSum -= price;
    document.querySelector(".first-section__price-text").textContent =
      totalSum.toFixed(2);
    row.remove();

    // Удаление товара из localStorage
    let updatedData = Array.from(data).filter(
      (product) => product.name !== productName
    );
    localStorage.setItem("products", JSON.stringify(updatedData));
  });

  // document.querySelectorAll


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
        // localStorage.setItem("products", JSON.stringify(data));
      }
    });
  });

  document.querySelectorAll(".activate").forEach((cell) => {
    cell.addEventListener("click", function () {
      let url = `${this.dataset.pic}`;
      console.log(document.querySelector(".fp"))
      const win = open('', '', `width=600,height=600,left=${(screen.width - 600) / 2},top=${(screen.height - 600) / 2}`);
      win.document.body.innerHTML = `
<img src="${url}" alt="photo" style="display: block; margin: auto;">
`;
    });
  });
}

export function calculateDiscount(form) {
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

export function updateSum(form) {
  const count = parseInt(form.querySelector('input[name="count"]').value) || 0;
  const price = parseFloat(form.querySelector('input[name="price"]').value) || 0;
  const total = count * price;
  document.querySelector(".first-section__price-text1").textContent = total.toFixed(2);
}

export function generateRandomNumber() {
  // Логика генерации случайного номера

  return Math.floor(Math.random() * (999999999 - 100000000 + 1)) + 100000000;
}

export function isValidData(data) {
  // Логика проверки валидности данных

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