'use strict';

const salaryAmount = document.querySelector('.salary-amount'),
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

const onlyNumber = function (n) {
    n.addEventListener('keydown', (event) => {
        // Запрещаем все, кроме цифр на основной клавиатуре, а так же Num-клавиатуре
        if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105) && event.keyCode != 8) {
            event.preventDefault();
        }
    });
};
const onlyWord = function (n) {
    n.addEventListener('input', () => {
        n.value = n.value.replace(/[^а-я\s\W\b]/, '');
    });
};

class AppData {
    constructor() {
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
    }
    start() {
        this.budget = +salaryAmount.value;

        this.getExpenses();
        this.getExpensesMonth();
        this.getAddExpenses();

        this.getIncome();
        this.getIncomeMonth();
        this.getAddIncome();

        this.getBudget();

        this.showResult();
    }
    showResult() {
        const _this = this;
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = this.getTargetMonth();
        incomePeriodValue.value = this.calcPeriod();
        periodSelect.addEventListener('input', () => {
            incomePeriodValue.value = _this.calcPeriod();
        });
    }
    addExpensesBlock() {
        const cloneExpensesItem = expensesItems[0].cloneNode(true);
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
    }
    addIncomeBlock() {
        const cloneIncomeItem = incomeItems[0].cloneNode(true);
        cloneIncomeItem.querySelector('.income-title').value = '';
        cloneIncomeItem.querySelector('.income-amount').value = '';

        onlyWord(cloneIncomeItem.querySelector('.income-title'));
        onlyNumber(cloneIncomeItem.querySelector('.income-amount'));

        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, buttonIncomeAdd);
        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length === 3) {
            buttonIncomeAdd.style.display = 'none';
        }
    }
    getExpenses() {
        const _this = this;
        expensesItems.forEach((item) => {
            const itemExpenses = item.querySelector('.expenses-title').value;
            const cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== '') {
                _this.expenses[itemExpenses] = cashExpenses;
            }
        });
    }
    getIncome() {
        const _this = this;
        incomeItems.forEach((item) => {
            const itemIncome = item.querySelector('.income-title').value;
            const cashIncome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome !== '') {
                _this.income[itemIncome] = cashIncome;
            }
        });
    }
    getAddExpenses() {
        const addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach((item) => {
            item = item.trim();
            if (item !== '') {
                this.addExpenses.push(item);
            }
        }, this);
    }
    getAddIncome() {
        additionalIncomeItem.forEach((item) => {
            const itemValue = item.value.trim();
            if (itemValue !== '') {
                this.addIncome.push(itemValue);
            }
        }, this);
    }
    getExpensesMonth() {
        for (let key in this.expenses) {
            this.expensesMonth += +this.expenses[key];
        }
    }
    getIncomeMonth() {
        for (let key in this.income) {
            this.incomeMonth += +this.income[key];
        }
    }
    getInfoDeposit() {
        if (this.deposit) {
            do {
                this.percentDeposit = prompt("Какой годовой процент", 10);
            } while (!isNumber(this.percentDeposit));
            do {
                this.moneyDeposit = prompt("Какая сумма заложена", 10000);
            } while (!isNumber(this.moneyDeposit));
        }
    }
    getTargetMonth() {
        return Math.ceil(targetAmount.value / this.budgetMonth);
    }
    getBudget() {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    }
    calcPeriod() {
        return this.budgetMonth * periodSelect.value;
    }
    reset() {
        document.querySelectorAll('input[type="text"]').forEach((item) => {
            item.value = '';
        });
        periodSelect.value = 1;
        periodAmount.textContent = periodSelect.value;
        document.querySelectorAll('.data input[type="text"]').forEach((item) => {
            item.removeAttribute('readonly');
        });
        incomeItems.forEach((item) => {
            incomeItems = document.querySelectorAll('.income-items');
            buttonIncomeAdd.style.display = 'block';
            if (incomeItems.length > 1)
                item.remove();
        });
        expensesItems.forEach((item) => {
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
    }
    eventsListeners() {
        buttonStart.disabled = true;
        salaryAmount.addEventListener('input', () => { //выключение кнопки
            buttonStart.disabled = salaryAmount.value === '';
        });
        periodSelect.addEventListener('input', () => { //динамическое изменение подписи у ползунка
            periodAmount.textContent = periodSelect.value;
        });

        const data = document.querySelector('.data');
        const items = data.querySelectorAll('input[type="text"]');

        const check = (elem) => {
            if (elem.placeholder === 'Наименование' || elem.placeholder === 'название') {
                elem.value = elem.value.replace(/[^а-я\s\W\b]/, '');
            } else if (elem.placeholder === 'Сумма') {
                elem.value = elem.value.replace(/[^0-9\b]/, '');
            }
        };
        items.forEach((item) => {
            item.addEventListener('input', (e) => {
                check(e.target);
            });
        });

        buttonStart.addEventListener('click', this.start.bind(this)); //начало программы по кнопке рассчитать
        buttonStart.addEventListener('click', () => { //выключение input`ов
            buttonStart.style.display = 'none';
            buttonCancel.style.display = 'block';
            document.querySelectorAll('.data input[type="text"]').forEach((item) => {
                item.setAttribute('readonly', true);
            });
        });
        buttonCancel.addEventListener('click', this.reset.bind(this)); //кнопка сброса
        buttonExpensesAdd.addEventListener('click', this.addExpensesBlock); //кнопка "плюс"
        buttonIncomeAdd.addEventListener('click', this.addIncomeBlock);

    }
};

const appData = new AppData();

appData.eventsListeners();