'use strict';

let money = +prompt("Ваш месячный доход?"),
    income = "Фриланс",
    addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую"),
    deposit = confirm("Есть ли у вас депозит в банке?"),
    mission = 200000,
    period = 6,
    expenses1 = prompt("Введите обязательную статью расходов?"),
    amount1 = +prompt("Во сколько это обойдется?"),
    expenses2 = prompt("Введите обязательную статью расходов?"),
    amount2 = +prompt("Во сколько это обойдется?");


function getAccumulatedMonth(money, amount) {
    return money - amount;
};

function getExpensesMonth(amount1, amount2) {
    return amount1 + amount2;
};

function getTargetMonth(mission, accumulatedMonth) {
    return Math.ceil(mission / accumulatedMonth);
};

function showTypeOf(data) {
    console.log(data, typeof (data));
};

function getStatusIncome(budgetDay) {
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

let accumulatedMonth = getAccumulatedMonth(money, getExpensesMonth(amount1, amount2)),
    budgetDay = accumulatedMonth / 30;

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);
console.log("Обязательные расходы за месяц " + getExpensesMonth(amount1, amount2));
console.log(addExpenses.toLowerCase().split(', ')); //разбиение строки в массив по указанному разделителю.
console.log("Цель будет достигнута за: " + getTargetMonth(mission, accumulatedMonth) + " месяцев");
console.log("Бюджет на день: " + Math.floor(budgetDay) + " рублей");
console.log(getStatusIncome(budgetDay));