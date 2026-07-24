let factorial = 1;
let k = 1;
let number = 5;

do {
    factorial = factorial * k;
    k++;
} while (k <= number);

console.log(factorial)