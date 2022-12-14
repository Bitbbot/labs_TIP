function Pizza(name, prices, picture) {
  this.name = name;
  this.smallPrice = prices[0];
  this.standardPrice = prices[1];
  this.bigPrice = prices[2];
  this.pictureUrl = picture;
}
const pizzas = [
  new Pizza("Salami", [10, 20, 30], "./img/1.jpg"),
  new Pizza("Tasty", [15, 30, 45], "./img/2.jpg"),
  new Pizza("Mexican", [20, 40, 60], "./img/3.jpg"),
  new Pizza("Civil", [25, 50, 100], "../img/4.jpg"),
  new Pizza("Peper", [30, 60, 120], "../img/5.jpg"),
];

pizzaslist = document.getElementById("pizzas");
function renderPizzas() {
  pizzas.forEach((el, index) => {
    createItem(el, index);
  });
}
function createItem(el, index) {
  pizzaslist.innerHTML += `
  <div class="pizza">
        <span>${el.name}</span>
        <img src="./img/${index + 1}.jpg" />
        размер:
        <select onchange="onChangeSize('${el.name}', this.value)">
          <option>small</option>
          <option>standard</option>
          <option>big</option>
        </select>
        цена за штуку:
        <span id="price${el.name}">${el.smallPrice}</span>
        <input id="number${
          el.name
        }" type="number" min="0" max="100" value="0" />
      </div>
  `;
}
function onChangeSize(name, val) {
  price = document.getElementById(`price${name}`);
  price.innerHTML = pizzas.find((el) => el.name === name)[`${val}Price`];
  console.log(val);
}
function order() {
  let number = 0;
  let sum = 0;
  pizzas.forEach((el) => {
    const num = document.getElementById(`number${el.name}`).value;
    number += Number(num);
    if (num) {
      const price = document.getElementById(`price${el.name}`).innerHTML;
      sum += price * num;
    }
  });
  let delivery;
  if (document.getElementById("isdelivery").checked == true) {
    delivery = number > 2 ? "бесплатная" : `+${sum * 0.05}`;
  } else delivery = "не нужна";
  document.getElementById("free-drink").innerHTML = `Бесплатный напиток: ${
    number > 1 ? "есть" : "нет"
  }`;
  document.getElementById("delivery").innerHTML = `Доставка: ${delivery}`;
  document.getElementById("price").innerHTML = `Сумма заказа: ${sum}`;
  console.log(number);
}
renderPizzas();
