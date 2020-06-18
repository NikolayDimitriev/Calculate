'use strict';

let salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-items>.income-title'),
    incomeItems = document.querySelectorAll('.income-items'),
    expensesTitle = document.querySelector('.expenses-items>.expenses-title'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),

    buttonStart = document.getElementById('start'),
    buttonCancel = document.getElementById('cancel'),
    buttonIncomeAdd = document.getElementsByTagName('button')[0],
    buttonExpensesAdd = document.getElementsByTagName('button')[1],
    depositCheckbox = document.querySelector('#deposit-check'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),

    budgetMonthValue = document.querySelector('.budget_month-value'),
    budgetDayValue = document.querySelector('.budget_day-value'),
    expensesMonthValue = document.querySelector('.expenses_month-value'),
    additionalIncomeValue = document.querySelector('.additional_income-value'),
    additionalExpensesValue = document.querySelector('.additional_expenses-value'),
    incomePeriodValue = document.querySelector('.income_period-value'),
    targetMonthValue = document.querySelector('.target_month-value');


let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};
let isString = function (n) {
    const pattern = new RegExp('^[а-я,]', 'gi');
    return pattern.test(n);
};

let appData = {
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    income: {},
    incomeMonth: 0,
    addIncome: [],
    expenses: {},
    addExpenses: [],
    expensesMonth: 0,
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    start: function () {
        appData.budget = +salaryAmount.value;

        appData.getExpenses();
        appData.getExpensesMonth();
        appData.getAddExpenses();

        appData.getIncome();
        appData.getIncomeMonth();
        appData.getAddIncome();

        appData.getBudget();

        appData.showResult();
    },
    showResult: function () {
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = appData.budgetDay;
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = appData.getTargetMonth();
        incomePeriodValue.value = appData.calcPeriod();
        periodSelect.addEventListener('input', function () {
            incomePeriodValue.value = appData.calcPeriod();
        });

    },
    addExpensesBlock: function () {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, buttonExpensesAdd);
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3) {
            buttonExpensesAdd.style.display = 'none';
        }
    },
    addIncomeBlock: function () {
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, buttonIncomeAdd);
        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length === 3) {
            buttonIncomeAdd.style.display = 'none';
        }
    },
    getExpenses: function () {
        expensesItems.forEach(function (item) {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== '') {
                appData.expenses[itemExpenses] = cashExpenses;
            }

        });
    },
    getIncome: function () {
        incomeItems.forEach(function (item) {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome !== '') {
                appData.income[itemIncome] = cashIncome;
            }

        });
    },
    getAddExpenses: function () {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function (item) {
            item = item.trim();
            if (item !== '') {
                appData.addExpenses.push(item);
            }
        });
    },
    getAddIncome: function () {
        additionalIncomeItem.forEach(function (item) {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                appData.addIncome.push(itemValue);
            }
        });
    },
    getExpensesMonth: function () {
        for (let key in appData.expenses) {
            appData.expensesMonth += +appData.expenses[key];
        }
    },
    getIncomeMonth: function () {
        for (let key in appData.income) {
            appData.incomeMonth += +appData.income[key];
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
    getTargetMonth: function () {
        console.log(targetAmount.value);

        return Math.ceil(targetAmount.value / appData.budgetMonth);
    },
    getBudget: function () {
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },
    calcPeriod: function () {
        return appData.budgetMonth * periodSelect.value;
    }
};

buttonStart.disabled = true;
salaryAmount.addEventListener('input', () => {
    buttonStart.disabled = salaryAmount.value === '';
});

periodSelect.addEventListener('input', function () {
    periodAmount.textContent = periodSelect.value;
});
buttonStart.addEventListener('click', appData.start);
buttonExpensesAdd.addEventListener('click', appData.addExpensesBlock);
buttonIncomeAdd.addEventListener('click', appData.addIncomeBlock);