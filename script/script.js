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


let onlyNumber = function (n) {
    n.addEventListener('keydown', (event) => {
        // Запрещаем все, кроме цифр на основной клавиатуре, а так же Num-клавиатуре
        if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105) && event.keyCode != 8) {
            event.preventDefault();
        }
    });
};
let onlyWord = function (n) {
    n.addEventListener('input', () => {
        n.value = n.value.replace(/[^а-я\s\W\b]/, '');
    });
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
        this.budget = +salaryAmount.value;

        this.getExpenses();
        this.getExpensesMonth();
        this.getAddExpenses();

        this.getIncome();
        this.getIncomeMonth();
        this.getAddIncome();

        this.getBudget();

        this.showResult();
    },
    showResult: function () {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = this.getTargetMonth();
        incomePeriodValue.value = this.calcPeriod();
        periodSelect.addEventListener('input', function () {
            incomePeriodValue.value = appData.calcPeriod.apply(appData);
        });

    },
    addExpensesBlock: function () {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        cloneExpensesItem.querySelector('.expenses-title').value = '';
        cloneExpensesItem.querySelector('.expenses-amount').value = '';
        //ограничения
        onlyWord(cloneExpensesItem.querySelector('.expenses-title'));
        onlyNumber(cloneExpensesItem.querySelector('.expenses-amount'));

        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, buttonExpensesAdd);
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3) {
            buttonExpensesAdd.style.display = 'none';
        }

    },
    addIncomeBlock: function () {
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        cloneIncomeItem.querySelector('.income-title').value = '';
        cloneIncomeItem.querySelector('.income-amount').value = '';
        onlyWord(cloneIncomeItem.querySelector('.income-title'));
        onlyNumber(cloneIncomeItem.querySelector('.income-amount'));

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
                this.addExpenses.push(item);
            }
        }, this);
    },
    getAddIncome: function () {
        additionalIncomeItem.forEach(function (item) {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                this.addIncome.push(itemValue);
            }
        }, this);
    },
    getExpensesMonth: function () {
        for (let key in this.expenses) {
            this.expensesMonth += +this.expenses[key];
        }
    },
    getIncomeMonth: function () {
        for (let key in this.income) {
            this.incomeMonth += +this.income[key];
        }
    },
    getInfoDeposit: function () {
        if (this.deposit) {
            do {
                this.percentDeposit = prompt("Какой годовой процент", 10);
            } while (!isNumber(this.percentDeposit));
            do {
                this.moneyDeposit = prompt("Какая сумма заложена", 10000);
            } while (!isNumber(this.moneyDeposit));
        }
    },
    getTargetMonth: function () {
        return Math.ceil(targetAmount.value / this.budgetMonth);
    },
    getBudget: function () {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    },
    calcPeriod: function () {
        return this.budgetMonth * periodSelect.value;
    },
    reset: function () {
        document.querySelectorAll('input[type="text"]').forEach(item => {
            item.value = '';
        });
        periodSelect.value = 1;
        periodAmount.textContent = periodSelect.value;
        document.querySelectorAll('.data input[type="text"]').forEach(function (item) {
            item.removeAttribute('readonly');
        });
        incomeItems.forEach(item => {
            incomeItems = document.querySelectorAll('.income-items');
            buttonIncomeAdd.style.display = 'block';
            if (incomeItems.length > 1)
                item.remove();
        });
        expensesItems.forEach(item => {
            expensesItems = document.querySelectorAll('.expenses-items');
            buttonExpensesAdd.style.display = 'block'
            if (expensesItems.length > 1)
                item.remove();
        });
    }
};



buttonStart.disabled = true;
salaryAmount.addEventListener('input', function () {
    buttonStart.disabled = salaryAmount.value === '';
});
periodSelect.addEventListener('input', function () {
    periodAmount.textContent = periodSelect.value;
});

onlyNumber(salaryAmount);
onlyNumber(targetAmount);
onlyNumber(document.querySelector('.expenses-amount'));
onlyNumber(document.querySelector('.income-amount'));
onlyWord(incomeTitle);
onlyWord(expensesTitle);
additionalIncomeItem.forEach(function (item) {
    onlyWord(item);
});


buttonStart.addEventListener('click', appData.start.bind(appData));
buttonStart.addEventListener('click', () => {
    buttonStart.style.display = 'none';
    buttonCancel.style.display = 'block';
    document.querySelectorAll('.data input[type="text"]').forEach(function (item) {
        item.setAttribute('readonly', true);
    });
});
buttonCancel.addEventListener('click', appData.reset.bind(appData));
buttonExpensesAdd.addEventListener('click', appData.addExpensesBlock);
buttonIncomeAdd.addEventListener('click', appData.addIncomeBlock);