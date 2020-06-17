'use strict'
//part 1
const books = document.querySelectorAll('.book');
books[0].before(books[1]);
books[3].before(books[4]);
books[5].after(books[2]);

//part 2
document.body.style.backgroundImage = 'url(./image/you-dont-know-js.jpg)';

//part 3
const secondHead = document.querySelectorAll('.book>h2>a');
secondHead[2].textContent = 'Книга 3. this и Прототипы Объектов';

// part 4
//если надо скрыть 

// const adv = document.querySelector('.adv');
// adv.style.display = 'none';

//если прям удалить
document.querySelector('.adv').remove();

//part 5
const collectionBookTwo = books[0].querySelectorAll('ul>li');
const collectionBookFive = books[5].querySelectorAll('ul>li');
collectionBookTwo[9].after(collectionBookTwo[2]);
collectionBookTwo[3].after(collectionBookTwo[6]);
collectionBookTwo[6].after(collectionBookTwo[8]);
collectionBookFive[7].after(collectionBookFive[5]);
collectionBookFive[8].after(collectionBookFive[10]);
collectionBookFive[1].after(collectionBookFive[9]);
collectionBookFive[4].after(collectionBookFive[2]);

//part 6
const collectionUlOfBookSix = books[2].querySelectorAll('ul');
const collectionLiofBookSix = books[2].querySelectorAll('ul>li');
collectionLiofBookSix[8].insertAdjacentHTML('afterend', '<li>Глава 8: За пределами ES6</li>');