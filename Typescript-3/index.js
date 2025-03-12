let a = 5;
var b = 10;
const c = 15;

if (true) {
  let a = 20;
  var b = 30;
}
console.log(a);
console.log(b);
console.log(c);

var name = "Talha";
var check = true;
var age = 20;
var Talha = {};
var fruits = [];
const calculate = function (a, b) {
  return a + b;
};
let d;
let e = null;

console.log(typeof name);
console.log(typeof check);
console.log(typeof age);
console.log(typeof Talha);
console.log(typeof fruits); // This returns object also because arrays are represented as objects with numeric keys (indices)
console.log(typeof calculate);
console.log(typeof d);
console.log(typeof e); // This returns object because of the bug in javascript

const input = document.getElementById("input");
const plusButton = document.getElementById("Pbtn");
const equalButton = document.getElementById("Ebtn");
const result = document.getElementById("result");
var number1;
var number2;

plusButton.addEventListener("click", function () {
  number1 = parseInt(input.value);
  input.value = "";
});

equalButton.addEventListener("click", function () {
  number2 = parseInt(input.value);
  input.value = "";
  alert(number1 + number2);
});
