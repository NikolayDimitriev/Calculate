const salaryAmount = document.querySelector('.salary-amount'),
	additionalExpensesItem = document.querySelector('.additional_expenses-item'),
	depositBank = document.querySelector('.deposit-bank'),
	depositAmount = document.querySelector('.deposit-amount'),
	depositPercent = document.querySelector('.deposit-percent'),
	targetAmount = document.querySelector('.target-amount'),
	periodSelect = document.querySelector('.period-select'),
	periodAmount = document.querySelector('.period-amount'),
	buttonStart = document.getElementById('start'),
	buttonCancel = document.getElementById('cancel'),
	buttonIncomeAdd = document.getElementsByTagName('button')[0],
	buttonExpensesAdd = document.getElementsByTagName('button')[1],
	depositCheck = document.querySelector('#deposit-check'),
	additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
	budgetMonthValue = document.querySelector('.budget_month-value'),
	budgetDayValue = document.querySelector('.budget_day-value'),
	expensesMonthValue = document.querySelector('.expenses_month-value'),
	additionalIncomeValue = document.querySelector('.additional_income-value'),
	additionalExpensesValue = document.querySelector('.additional_expenses-value'),
	incomePeriodValue = document.querySelector('.income_period-value'),
	targetMonthValue = document.querySelector('.target_month-value');

let expensesItems = document.querySelectorAll('.expenses-items'),
	incomeItems = document.querySelectorAll('.income-items');

const readLocalStorage = () => JSON.parse(localStorage.getItem('appData')) || [];

//функции для работы с cookie
function getCookie(name) {
	const matches = document.cookie.match(new RegExp(
		"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
	));
	return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, options = {}) {
	options = {
		path: '/',
		'max-age': 3600,
		// при необходимости добавьте другие значения по умолчанию
		...options
	};

	if (options.expires instanceof Date) {
		options.expires = options.expires.toUTCString();
	}

	let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

	for (const optionKey in options) {
		updatedCookie += "; " + optionKey;
		const optionValue = options[optionKey];
		if (optionValue !== true) {
			updatedCookie += "=" + optionValue;
		}
	}
	document.cookie = updatedCookie;
}


function deleteCookie(name) {
	setCookie(name, "", {
		'max-age': -1
	});
}

const output = () => {
	const localData = readLocalStorage();
	localData.forEach(item => {
		budgetMonthValue.value = item.budgetMonthValue;
		budgetDayValue.value = item.budgetDayValue;
		expensesMonthValue.value = item.expensesMonthValue;
		additionalExpensesValue.value = item.additionalExpensesValue;
		additionalIncomeValue.value = item.additionalIncomeValue;
		targetMonthValue.value = item.targetMonthValue;
		incomePeriodValue.value = item.incomePeriodValue;
		buttonStart.style.display = 'none';
		buttonCancel.style.display = 'block';
		if (budgetMonthValue.value === item.budgetMonthValue) {
			document.querySelectorAll('.data input[type="text"]').forEach(item => {
				item.setAttribute('readonly', true);
			});
		}
	});
};
const insertToLocalStorage = data => {
	const localData = readLocalStorage();
	localData.push(data);
	localStorage.setItem('appData', JSON.stringify(localData));
	output();
};

const deleteLocalStorage = () => {
	const localData = readLocalStorage();
	localData.splice(0); //удаляем все элементы
	localStorage.setItem('appData', JSON.stringify(localData));
	output();
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
		this.getExpInc();
		this.getExpensesMonth();
		this.getIncomeMonth();
		this.getAddExpInc();
		this.getInfoDeposit();
		this.getBudget();
		this.showResult();
	}
	showResult() {
		budgetMonthValue.value = this.budgetMonth;
		budgetDayValue.value = this.budgetDay;
		expensesMonthValue.value = this.expensesMonth;
		additionalExpensesValue.value = this.addExpenses.join(', ');
		additionalIncomeValue.value = this.addIncome.join(', ');
		targetMonthValue.value = this.getTargetMonth();
		incomePeriodValue.value = this.calcPeriod();
		periodSelect.addEventListener('input', () => {
			incomePeriodValue.value = this.calcPeriod();
		});
		const data = {
			budgetMonthValue: budgetMonthValue.value,
			budgetDayValue: budgetDayValue.value,
			expensesMonthValue: expensesMonthValue.value,
			additionalExpensesValue: additionalExpensesValue.value,
			additionalIncomeValue: additionalIncomeValue.value,
			targetMonthValue: targetMonthValue.value,
			incomePeriodValue: incomePeriodValue.value,
			isLoad: true
		};
		//добавили в localStorage
		insertToLocalStorage(data);
		//добавили в cookie
		for (const key in data) {
			setCookie(key, data[key]);
		}
	}
	addExpIncBlock() {
		const startStr = this.className.split(' ')[1].split('_')[0];
		let items = document.querySelectorAll(`.${startStr}-items`);
		const button = document.querySelector(`.${startStr}_add`);

		const clone = items[0].cloneNode(true);
		clone.querySelector(`.${startStr}-title`).value = '';
		clone.querySelector(`.${startStr}-amount`).value = '';

		items[0].parentNode.insertBefore(clone, button);
		items = document.querySelectorAll(`.${startStr}-items`);

		if (items.length === 3) {
			button.style.display = 'none';
		}
	}
	getExpInc() {

		const count = item => { // при передаче одного аргумента не нужны скобки
			const startStr = item.className.split('-')[0];
			const itemTitle = item.querySelector(`.${startStr}-title`).value;
			const itemAmount = item.querySelector(`.${startStr}-amount`).value;
			if (itemTitle !== '' && itemAmount !== '') {
				this[startStr][itemTitle] = itemAmount;
			}
		};
		expensesItems = document.querySelectorAll('.expenses-items');
		incomeItems = document.querySelectorAll('.income-items');

		expensesItems.forEach(count);
		incomeItems.forEach(count);
	}
	getAddExpInc() {
		const addExpenses = additionalExpensesItem.value.split(',');
		addExpenses.forEach(item => {
			item = item.trim();
			if (item !== '') {
				this.addExpenses.push(item);
			}
		}, this);
		additionalIncomeItem.forEach(item => {
			const itemValue = item.value.trim();
			if (itemValue !== '') {
				this.addIncome.push(itemValue);
			}
		}, this);
	}
	getExpensesMonth() {
		for (const key in this.expenses) {
			this.expensesMonth += +this.expenses[key];
		}
	}
	getIncomeMonth() {
		for (const key in this.income) {
			this.incomeMonth += +this.income[key];
		}
	}
	getInfoDeposit() {
		if (this.deposit) {
			this.percentDeposit = depositPercent.value;
			this.moneyDeposit = depositAmount.value;
		}
	}
	getTargetMonth() {
		return Math.ceil(targetAmount.value / this.budgetMonth);
	}
	getBudget() {
		const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
		this.budgetMonth = Math.ceil(this.budget + this.incomeMonth - this.expensesMonth + monthDeposit);
		this.budgetDay = Math.floor(this.budgetMonth / 30);
	}
	calcPeriod() {
		return this.budgetMonth * periodSelect.value;
	}
	depositHandler() {
		if (depositCheck.checked) {
			depositBank.style.display = 'inline-block';
			depositAmount.style.display = 'inline-block';
			this.deposit = true;
			depositBank.addEventListener('change', this.changePercent);
		} else {
			depositBank.style.display = 'none';
			depositAmount.style.display = 'none';
			depositPercent.style.display = 'none';
			depositBank.value = '';
			depositAmount.value = '';
			this.deposit = false;
			depositBank.removeEventListener('change', this.changePercent);
		}
	}
	changePercent() {
		const valueSelect = this.value;
		if (valueSelect === 'other') {
			depositPercent.value = '';
			depositPercent.style.display = 'inline-block';
		} else {
			depositPercent.style.display = 'none';
			depositPercent.value = valueSelect;
		}
	}
	reset() {
		document.querySelectorAll('input[type="text"]').forEach(item => {
			item.value = '';
		});
		periodSelect.value = 1;
		periodAmount.textContent = periodSelect.value;
		document.querySelectorAll('.data input[type="text"]').forEach(item => {
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
			buttonExpensesAdd.style.display = 'block';
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
		depositCheck.checked = false;
		this.depositHandler();
		deleteLocalStorage();
	}
	eventsListeners() {
		buttonStart.disabled = true;
		salaryAmount.addEventListener('input', () => { //выключение кнопки
			buttonStart.disabled = salaryAmount.value === '';
		});
		periodSelect.addEventListener('input', () => { //динамическое изменение подписи у ползунка
			periodAmount.textContent = periodSelect.value;
		});
		periodSelect.addEventListener('input', () => {
			incomePeriodValue.value = budgetMonthValue.value * periodSelect.value;
		});

		const data = document.querySelector('.data');
		data.addEventListener('input', e => {
			if (e.target.placeholder === 'Сумма' || e.target.placeholder === 'Процент') {
				e.target.value = e.target.value.replace(/[^0-9\b]/, '');
			} else if (e.target.placeholder === 'Наименование' || e.target.placeholder === 'название') {
				e.target.value = e.target.value.replace(/[^а-я\s\W\b]/, '');
			}
		});
		depositPercent.addEventListener('input', () => {
			if (depositPercent.value < 0 || depositPercent.value > 100) {
				buttonStart.disabled = true;
				alert('Введите корректное значение в поле проценты');
				depositPercent.value = '';
			} else {
				buttonStart.disabled = false;
			}

		});
		buttonStart.addEventListener('click', this.start.bind(this)); //начало программы по кнопке рассчитать
		buttonStart.addEventListener('click', () => { //выключение input`ов
			buttonStart.style.display = 'none';
			buttonCancel.style.display = 'block';
			document.querySelectorAll('.data input[type="text"]').forEach(item => {
				item.setAttribute('readonly', true);
			});
		});
		buttonCancel.addEventListener('click', this.reset.bind(this)); //кнопка сброса
		buttonExpensesAdd.addEventListener('click', this.addExpIncBlock); //кнопка "плюс"
		buttonIncomeAdd.addEventListener('click', this.addExpIncBlock);
		depositCheck.addEventListener('change', this.depositHandler.bind(this));
	}
}
const appData = new AppData();

appData.eventsListeners();
output();

// function clearData() {
// 	const local = readLocalStorage();
// 	if (local.length > 0) {
// 		if (getCookie('budgetMonthValue') !== local[0].budgetMonthValue || getCookie('budgetDayValue') !== local[0].budgetDayValue || getCookie('expensesMonthValue') !== local[0].expensesMonthValue || getCookie('additionalExpensesValue') !== local[0].additionalExpensesValue || getCookie('additionalIncomeValue') !== local[0].additionalIncomeValue || getCookie('targetMonthValue') !== local[0].targetMonthValue || getCookie('incomePeriodValue') !== local[0].incomePeriodValue || getCookie('isLoad') !== local[0].isLoad.toString()) {

// 			console.log('cookies change');
// 			deleteCookie('budgetMonthValue');
// 			deleteCookie('budgetDayValue');
// 			deleteCookie('expensesMonthValue');
// 			deleteCookie('additionalExpensesValue');
// 			deleteCookie('additionalIncomeValue');
// 			deleteCookie('targetMonthValue');
// 			deleteCookie('incomePeriodValue');
// 			deleteCookie('isLoad');
// 			deleteLocalStorage();
// 			window.location.reload();
// 		}
// 	}
// }
const cook = decodeURIComponent(document.cookie).split('; ');
const local = readLocalStorage()[0] || [];
console.log(local);
console.log(cook);

let bool = false; //все сходится
if (cook.length > 0) {
	cook.forEach(item => {
		if (item.split('=')[1] !== local[item.split('=')[0]].toString() || Object.keys(local).length !== cook.length) {
			bool = true; //нашлись различия
			return;
		}
	});
}

if (bool) {
	cook.forEach(item => {
		deleteCookie(item.split('=')[0].toString());
	});
	deleteLocalStorage();
	window.location.reload();
}