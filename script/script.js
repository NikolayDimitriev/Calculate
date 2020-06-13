'use strict';

let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};
let money,
    start = function () {
        do {
            money = prompt("Ваш месячный доход?");
        } while (!isNumber(money));
    }
start();

let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 50000,
    period: 3,
    asking: function () {
        let addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую");
        appData.addExpenses = addExpenses.toLowerCase().split(', ');
        appData.deposit = confirm("Есть ли у вас депозит в банке?");

        let key = [];
        for (let i = 0; i < 2; i++) {
            let sum = 0;
            key[i] = prompt("Введите обязательную статью расходов?");
            do {
                sum = +prompt("Во сколько это обойдется?");
            } while (!isNumber(sum))
            appData.expenses[key[i]] = sum;
        }
        appData.getExpensesMonth();
    },
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    getExpensesMonth: function () {
        for (let key in appData.expenses) {
            appData.expensesMonth += appData.expenses[key];
        }
    },
    getTargetMonth: function () {
        appData.getBudget();
        if (Math.ceil(appData.mission / appData.budgetMonth) <= 0) {
            return "Цель не будет достигнута";
        } else {
            return "Цель будет достигнута за: " + Math.ceil(appData.mission / appData.budgetMonth) + " месяцев";
        }
    },
    getBudget: function () {
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = appData.budgetMonth / 30;
    },
    getStatusIncome: function () {
        if (appData.budgetDay > 1200) {
            return ("У вас высокий уровень дохода");
        } else if (appData.budgetDay >= 600 && appData.budgetDay <= 1200) {
            return ("У вас средний уровень дохода");
        } else if (appData.budgetDay < 600 && appData.budgetDay >= 0) {
            return ("К сожалению у вас уровень дохода ниже среднего");
        } else if (appData.budgetDay < 0) {
            return ("Что то пошло не так");
        }
    }
};
appData.asking();

console.log("Обязательные расходы за месяц " + appData.expensesMonth);
console.log(appData.getTargetMonth());
console.log(appData.getStatusIncome());

for (let key in appData) {
    console.log("\nНаша программа включает в себя данные: " + key + " " + appData[key]);
}