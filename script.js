"use strict";

const buttons = document.querySelectorAll("button");
const buttons2 = document.querySelectorAll("buttons");
const number = document.querySelector(".number");
const equal = document.querySelector(".equal");
const deletbtn = document.querySelector(".delete-btn");
const nightMode = document.querySelector("#switch");
const body = document.querySelector("body");
const main = document.querySelector("main");
const history = document.querySelector(".history");
const history1 = document.querySelector(".history1");
const exit = document.querySelector(".exit");

number.textContent = "";

let number1;
let number2;
let signcalc;
let result;
let arr = [];

const darkMode = function () {
  body.classList.toggle("dark-body");
  main.classList.toggle("dark-main");
  buttons.forEach((button) => button.classList.toggle("dark-button"));
  history1.classList.toggle("dark-history");

};

const pressEqual = function (calc) {
  const j = calc.indexOf(signcalc) + 1;
  number2 = calc.slice(j);

  if (signcalc === "+") {
    result = Number(number1) + Number(number2);
    number.textContent = result;
    
  }
  if (signcalc === "-") {
    result = Number(number1) - Number(number2);
    number.textContent = result;
  }
  if (signcalc === "×") {
    result = Number(number1) * Number(number2);
    number.textContent = result;
  }
  if (signcalc === "÷") {
    result = Number(number1) / Number(number2);
    number.textContent = result;
  }
  if (signcalc === "%") {
    result = Number(number1) % Number(number2);
    number.textContent = result;
  }
};

buttons.forEach((button) =>
  button.addEventListener("click", function () {
    if (!button.classList.contains("equal"))
      number.textContent += button.textContent;

    const calc = number.textContent;

    if (button.classList.contains("sign")) {
      number1 = calc.slice(0, -1);
      signcalc = button.innerHTML;
    }

    if (button.classList.contains("equal")) {
      pressEqual(calc);

      const newcalc = calc + " = " + result;
      arr.push(newcalc);

      localStorage.setItem("calculation", JSON.stringify(arr));
    }

    if (signcalc === "C") {
      number.textContent = signcalc = "";
    }
  })
);
let test = true;
history.addEventListener("click", function () {
  history1.classList.add("history_html");
  exit.classList.remove("display");

  if (test === true) {
    const data = JSON.parse(localStorage.getItem("calculation"));
    if (!data) return;

    arr = data;
    arr.forEach((l) => {
      console.log(arr);
      const html = `<div class="calculation">${l}</div>`;
      history1.insertAdjacentHTML("beforeend", html);
    });
  }

  test = false;
});

exit.addEventListener("click", function () {
  history1.classList.remove("history_html");
  exit.classList.add("display");
  test = true;

  document.querySelectorAll(".calculation").forEach((el) => {
    el.classList.add("display");
  });
});

deletbtn.addEventListener("click", function () {
  const numberall = number.textContent.slice(0, -2);
  number.textContent = numberall;
});

nightMode.addEventListener("click", function (e) {
  if (e.target.checked) {
    darkMode();
  }
  if (!e.target.checked) {
    darkMode();
  }
});
