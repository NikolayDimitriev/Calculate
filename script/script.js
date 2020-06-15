'use strict';

let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};
let isString = function (n) {
    const pattern = new RegExp('^[а-я,]', 'gi');
    return pattern.test(n);
};

let money,
    start = function () {
        do {
            money = prompt("Ваш месячный доход?", 50000);
        } while (!isNumber(money));
    }
start();

let appData = {
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    expensesMonth: 0,
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 50000,
    period: 3,
    asking: function () {
        if (confirm("Есть ли у вас дополнительный заработок?")) {
            let itemIncome;
            do {
                itemIncome = prompt("Какой у вас дополнительный заработок?", "Таксую");
            } while (!isString(itemIncome));

            let cashIncome;
            do {
                cashIncome = prompt("Сколько в месяц вы зарабатываете на этом?", 10000);
            } while (!isNumber(cashIncome));

            appData.income[itemIncome] = cashIncome;
        }

        let addExpenses;
        do {
            addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую", 'Бензин, интернет');
        } while (!isString(addExpenses));
        appData.addExpenses = addExpenses.toLowerCase().split(', ');
        appData.deposit = confirm("Есть ли у вас депозит в банке?");
        appData.getInfoDeposit();

        for (let i = 0; i < 2; i++) {
            let itemExpenses;
            do {
                itemExpenses = prompt("Введите обязательную статью расходов?", "Бензин");
            } while (!isString(itemExpenses));

            let cashExpenses;
            do {
                cashExpenses = +prompt("Во сколько это обойдется?", 7650);
            } while (!isNumber(cashExpenses))
            appData.expenses[itemExpenses] = cashExpenses;
        }
    },
    getInfoDeposit: function () {
        if (appData.deposit) {
            do {
                appData.percentDeposit = prompt("Какой годовой процент", 10);
            } while (!isNumber(appData.percentDeposit));
            do {
                appData.moneyDeposit = prompt("Какая сумма заложена", 10000);
            } while (!isNumber(appData.moneyDeposit));
        }
    },
    getExpensesMonth: function () {
        for (let key in appData.expenses) {
            appData.expensesMonth += +appData.expenses[key];
        }
    },
    getTargetMonth: function () {
        if (Math.ceil(appData.mission / appData.budgetMonth) <= 0) {
            return "Цель не будет достигнута";
        } else {
            return "Цель будет достигнута за: " + Math.ceil(appData.mission / appData.budgetMonth) + " месяцев";
        }
    },
    getBudget: function () {
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
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
    },
    calcSavedMoney: function () {
        return appData.budgetMonth * appData.period;
    }
};
appData.asking();
appData.getExpensesMonth();
appData.getBudget();

console.log("Обязательные расходы за месяц " + appData.expensesMonth);
console.log(appData.getTargetMonth());
console.log(appData.getStatusIncome());
console.log("Сумма которую вы накопите за 3 месяца: " + appData.calcSavedMoney());

let expenses = [];
for (let i = 0; i < appData.addExpenses.length; i++) {
    for (let word of appData.addExpenses) {
        expenses[i] = word[0].toUpperCase() + word.substring(1);
        i++;
    }
}
console.log(expenses.join(', '));





// for (let key in appData) {
//     console.log("\nНаша программа включает в себя данные: " + key + " " + appData[key]);
// }