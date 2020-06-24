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

//функция разрешающая ввод только цифр
let onlyNumber = function (n) {
    n.value = n.value.replace(/[^0-9\b]/, '');
};
//функция разрешающая ввод только русских букв
let onlyWord = function (n) {
    n.value = n.value.replace(/[^а-я\s\W\b]/, '');
};

const AppData = function () {
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.expensesMonth = 0;
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
};

AppData.prototype.start = function () {
    this.budget = +salaryAmount.value;

    this.getExpenses();
    this.getExpensesMonth();
    this.getAddExpenses();

    this.getIncome();
    this.getIncomeMonth();
    this.getAddIncome();

    this.getBudget();

    this.showResult();
};
AppData.prototype.showResult = function () {
    const _this = this;
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = this.calcPeriod();
    periodSelect.addEventListener('input', function () {
        incomePeriodValue.value = _this.calcPeriod();
    });
};
AppData.prototype.addExpensesBlock = function () {
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
};
AppData.prototype.addIncomeBlock = function () {
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
};
AppData.prototype.getExpenses = function () {
    const _this = this;
    expensesItems.forEach(function (item) {
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;
        if (itemExpenses !== '' && cashExpenses !== '') {
            _this.expenses[itemExpenses] = cashExpenses;
        }

    });
};
AppData.prototype.getIncome = function () {
    const _this = this;
    incomeItems.forEach(function (item) {
        let itemIncome = item.querySelector('.income-title').value;
        let cashIncome = item.querySelector('.income-amount').value;
        if (itemIncome !== '' && cashIncome !== '') {
            _this.income[itemIncome] = cashIncome;
        }

    });
};
AppData.prototype.getAddExpenses = function () {
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function (item) {
        item = item.trim();
        if (item !== '') {
            this.addExpenses.push(item);
        }
    }, this);
};
AppData.prototype.getAddIncome = function () {
    additionalIncomeItem.forEach(function (item) {
        let itemValue = item.value.trim();
        if (itemValue !== '') {
            this.addIncome.push(itemValue);
        }
    }, this);
};
AppData.prototype.getExpensesMonth = function () {
    for (let key in this.expenses) {
        this.expensesMonth += +this.expenses[key];
    }
};
AppData.prototype.getIncomeMonth = function () {
    for (let key in this.income) {
        this.incomeMonth += +this.income[key];
    }
};
AppData.prototype.getInfoDeposit = function () {
    if (this.deposit) {
        do {
            this.percentDeposit = prompt("Какой годовой процент", 10);
        } while (!isNumber(this.percentDeposit));
        do {
            this.moneyDeposit = prompt("Какая сумма заложена", 10000);
        } while (!isNumber(this.moneyDeposit));
    }
};
AppData.prototype.getTargetMonth = function () {
    return Math.ceil(targetAmount.value / this.budgetMonth);
};
AppData.prototype.getBudget = function () {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
};
AppData.prototype.calcPeriod = function () {
    return this.budgetMonth * periodSelect.value;
};
AppData.prototype.reset = function () {
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
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.expensesMonth = 0;
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    buttonStart.style.display = 'block';
    buttonCancel.style.display = 'none';
    depositCheckbox.checked = false;
};
AppData.prototype.eventsListeners = function () {
    buttonStart.disabled = true;
    salaryAmount.addEventListener('input', function () { //выключение кнопки
        buttonStart.disabled = salaryAmount.value === '';
    });
    periodSelect.addEventListener('input', function () { //динамическое изменение подписи у ползунка
        periodAmount.textContent = periodSelect.value;
    });

    let data = document.querySelector('.data');
    let items = data.querySelectorAll('input[type="text"]');

    const checkInput = (elem) => {
        if (elem.placeholder === 'Наименование' || elem.placeholder === 'название') {
            onlyWord(elem);
        } else if (elem.placeholder === 'Сумма') {
            onlyNumber(elem);
        }
    };
    items.forEach(item => {
        item.addEventListener('input', (e) => {
            checkInput(e.target);
        });
    });


    buttonStart.addEventListener('click', this.start.bind(this)); //начало программы по кнопке рассчитать
    buttonStart.addEventListener('click', () => { //выключение input`ов
        buttonStart.style.display = 'none';
        buttonCancel.style.display = 'block';
        document.querySelectorAll('.data input[type="text"]').forEach(function (item) {
            item.setAttribute('readonly', true);
        });
    });
    buttonCancel.addEventListener('click', this.reset.bind(this)); //кнопка сброса
    buttonExpensesAdd.addEventListener('click', this.addExpensesBlock); //кнопка "плюс"
    buttonIncomeAdd.addEventListener('click', this.addIncomeBlock);
};

const appData = new AppData();

appData.eventsListeners();