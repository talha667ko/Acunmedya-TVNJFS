let number1 = 3;
let number2 = 5;

function add(a, b) {
  return a + b;
}

const adding = (a, b) => a + b;

var arr = [10, 62, 32, 84, 25];

function findMax(arr) {
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
}

function findTheNumber(arr, num) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === num) {
      return "Found";
    }
  }
  return "Not Found";
}

console.log(add(number1, number2));
console.log(adding(number1, number2));
console.log(findMax(arr));
console.log(findTheNumber(arr, 32));
