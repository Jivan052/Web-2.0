// script.js
// Demo changes

let resultInput = document.getElementById("result");

function clearDisplay() {
  resultInput.value = "";
}

function backspace() {
  resultInput.value = resultInput.value.slice(0, -1);
}

function appendNumber(number) {
  resultInput.value += number;
}

function appendOperator(operator) {
  if (resultInput.value === "") return;
  let lastChar = resultInput.value.slice(-1);
  if (["+", "-", "*", "/", "%"].includes(lastChar)) {
    resultInput.value = resultInput.value.slice(0, -1);
  }
  resultInput.value += operator;
}

function appendDot() {
  if (!resultInput.value.includes(".")) {
    resultInput.value += ".";
  }
}

function calculate() {
  try {
    resultInput.value = eval(resultInput.value.replace(/÷/g, "/").replace(/×/g, "*"));
  } catch {
    resultInput.value = "Error";
  }
}
