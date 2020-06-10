'use strict';
let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
    income = "Фриланс",
    addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую"),
    deposit = confirm("Есть ли у вас депозит в банке?"),
    mission = 200000,
    period = 6;

let start = function () {
    do {
        money = prompt("Ваш месячный доход?");
    } while (!isNumber(money));
}
start();

let showTypeOf = function (data) {
    console.log(data, typeof (data));
};
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

let expenses = [];
let getExpensesMonth = function () {
    let sum = [];

    for (let i = 0; i < 2; i++) {
        expenses[i] = prompt("Введите обязательную статью расходов?");
        do {
            sum[i] = prompt("Во сколько это обойдется?");
        } while (!isNumber(sum[i]))
    }
    return sum.reduce(function (previousValue, currentValue) {
        return Number(previousValue) + Number(currentValue);
    });
};

let expensesAmount = getExpensesMonth();

let getTargetMonth = function (mission, accumulatedMonth) {
    if (Math.ceil(mission / accumulatedMonth) <= 0) {
        return "Цель не будет достигнута";
    } else {
        return "Цель будет достигнута за: " + Math.ceil(mission / accumulatedMonth) + " месяцев";
    }
};

let getAccumulatedMonth = function (money, expensesAmount) {
    return money - expensesAmount;
};

let getStatusIncome = function (budgetDay) {
    if (budgetDay > 1200) {
        return ("У вас высокий уровень дохода");
    } else if (budgetDay >= 600 && budgetDay <= 1200) {
        return ("У вас средний уровень дохода");
    } else if (budgetDay < 600 && budgetDay >= 0) {
        return ("К сожалению у вас уровень дохода ниже среднего");
    } else if (budgetDay < 0) {
        return ("Что то пошло не так");
    }
};

let accumulatedMonth = getAccumulatedMonth(money, expensesAmount),
    budgetDay = accumulatedMonth / 30;

console.log("Обязательные расходы за месяц " + expensesAmount);
console.log(addExpenses.toLowerCase().split(', ')); //разбиение строки в массив по указанному разделителю.
console.log(getTargetMonth(mission, accumulatedMonth));
console.log("Бюджет на день: " + Math.floor(budgetDay) + " рублей");
console.log(getStatusIncome(budgetDay));