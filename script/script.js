let money = 30000;
let income = "Фриланс";
let addExpenses = "Интернет, такси, коммуналка";
let deposit = true;
let mission = 200000;
let period = 6;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log("Период равен " + period + " месяцев");
console.log("Цель заработать " + mission + " рублей");
console.log(addExpenses.toLowerCase().split(', ')); //разбиение строки в массив по указанному разделителю.

let budgetDay = money / 30;
console.log(budgetDay);