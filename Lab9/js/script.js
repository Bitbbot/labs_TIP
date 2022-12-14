"use strict";

const img = document.getElementById("current-img");

addEvents();

function addEvents() {
  let items = document.querySelectorAll("li");

  for (let i = 0; i < items.length; i++) {
    items[i].addEventListener("click", () => {
      img.setAttribute("src", `../img/picture-${i + 1}.png`);
    });
  }
}
