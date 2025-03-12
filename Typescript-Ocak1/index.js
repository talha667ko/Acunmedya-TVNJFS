let num = 4;

if (num === 0) {
  console.log("Zero");
} else if (num % 2 === 0) {
  console.log("Even");
} else if (num % 2 !== 0) {
  console.log("Odd");
}

for (num = 1; num <= 10; num++) {
  console.log(num);
}
num = 1;
while (num <= 10) {
  console.log(num);
  num++;
}
num = 1;
do {
  console.log(num);
  num++;
} while (num <= 10);

input = document.getElementById("input");
check = document.getElementById("check");
var userN;
var prime = true;

check.addEventListener("click", function () {
  userN = parseInt(input.value);

  if (userN === 1) {
    alert("Not Prime");
  } else if (userN === 2) {
    alert("Prime");
  } else {
    for (let i = 2; i < userN; i++) {
      if (userN % i === 0) {
        prime = false;
        break;
      }
    }
    if (prime) {
      alert("Prime");
    } else {
      alert("Not Prime");
    }
  }
});
