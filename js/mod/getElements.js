//getElements.js

"use strict";

export function getElements() {
  return {
    form: document.getElementById("first-form"),
    checkbox: document.querySelector('input[type="checkbox"]'),
    discount: document.querySelector(".discount-form"),
    closeBut: document.querySelector(".add-product"),
    openProduct: document.querySelector(".buttona"),
    moduleCms: document.querySelector(".module-cms"),
    backgroundCms: document.querySelector(".second-section"),
    buttonCancel: document.querySelector(".button-cancel"),
    overlay: document.querySelector(".overlay"),
    iconsImg: document.querySelectorAll(".icons-img"),
    iconsEdit: document.querySelectorAll(".icons-edit"),
    iconsDel: document.querySelectorAll(".icons-del"),
    inpuT: document.querySelector("input"),
    addProduct: document.querySelector(".add-product"),
    firstSectionPriceText: document.querySelector(".first-section__price-text"),
    firstSectionPriceText1: document.querySelector(".first-section__price-text1"),
    tableSection: document.querySelector(".table-section_tr-th")
  };
}