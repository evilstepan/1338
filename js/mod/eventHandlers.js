
// eventHandlers.js
"use strict";

import { getElements } from "./getElements.js";
import { data, addProductToTable, calculateDiscount, updateSum, generateRandomNumber, isValidData } from "./dataLogic.js";

export function init(elements) {
  const {
    form,
    checkbox,
    discount,
    closeBut,
    openProduct,
    moduleCms,
    overlay,
    buttonCancel,
    addProduct,
    firstSectionPriceText,
    firstSectionPriceText1,
    tableSection
  } = getElements();

  let storedData = localStorage.getItem("products");

  if (storedData) {
    let data = JSON.parse(storedData);
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

  const fileChange = () => {
    let path = document.getElementById('imgSet').value
    let filename = path.split('\\').pop(); // Разделяем строку по обратному слешу и берем последний элемент
    return filename
  }


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
      newData.img = fileChange()

      addProductToTable(newData);

      moduleCms.style.display = "block";
      overlay.style.display = "block";

      data.push(newData);
      localStorage.setItem("products", JSON.stringify(data));
    } else {
      alert("Проверьте правильность заполнения полей.");
    }
    firstSectionPriceText1.textContent = 0;

  });

  form.querySelector('input[name="count"]').addEventListener("input", () => updateSum(form));
  form.querySelector('input[name="price"]').addEventListener("input", () => updateSum(form));
  form
    .querySelector('input[name="discount"]')
    .addEventListener("input", () => calculateDiscount(form));

  addProduct.addEventListener("click", () => {
    moduleCms.style.display = "none";
    overlay.style.display = "none";
  });

}

