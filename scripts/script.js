let allDishesArry = [];
let allNames = [];
let allamounts = [];
let allSingelPrices = [];
let showDishes = document.getElementById('dishes');
let sumtotal = document.getElementById('sum');
let amounts = document.getElementById('amounts');
let currentDishes = '';


function init() {
    if (history.scrollRestoration) {
        history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
    createDishArry();
}

function createDishArry() {
    showDishes.innerHTML = '';
    allDishesArry = allDishes.filter((createArry) => { return createArry['dish'] });
    dishArry();
}

function dishArry() {
    for (let i = 0; i < allDishesArry.length; i++) {
        const selection = loadDishes(i);
        showDishes.innerHTML += selection;
    }
}

function loadCurrentSelection(i) {
    showDishes.innerHTML = '';
    for (let j = 0; j < allDishes[i].selection.length; j++) {
        const entireSelection = allDishes[i].selection[j];
        getCurrentSelections(entireSelection, j);
    }
}

function getCurrentSelections(entireSelection, j) {
    currentDishes = getCurrentDishes(entireSelection, j);
    showDishes.innerHTML += currentDishes;

}

function addToBasket(dishName, toPay, j) {
    let index = allNames.indexOf(dishName);
    if (index === -1) {
        pushArrys(dishName, toPay, j);
    } else {
        allamounts[j] += toPay;
    }
    updateBasket();
    calculate(allamounts);
}

function pushArrys(dishName, toPay, j) {
    allNames.push(dishName);
    allamounts.push(toPay);
    allSingelPrices.push(toPay);
    amounts.innerHTML += showAmounts(dishName, toPay, j);
}

function updateBasket() {
    amounts.innerHTML = '';
    for (let i = 0; i < allNames.length; i++) {
        let singelPrice = allSingelPrices[i];
        calculateCounter(i, singelPrice);
    }
}

function calculateCounter(i, singelPrice,) {
    let counterCalc = Math.ceil(allamounts[i] / singelPrice);
    amounts.innerHTML += showAmounts(allNames[i], allamounts[i], i, counterCalc);
}

function minusDishesInBasket(i) {
    let singelPrice = allSingelPrices[i];
    if (allamounts[i] > singelPrice) {
        minusDischNewPrice(i, singelPrice);

    } else if (allamounts[i] >= -1) {
        deleteCompletely(i);
    } else {
        afterMinusLastDisch(i)
    }

}

function minusDischNewPrice(i, singelPrice) {
    allamounts[i] -= singelPrice;
    updateBasket();
    calculate(allamounts);
}

function afterMinusLastDisch(i) {
    allNames.splice(i, 1);
    allamounts.splice(i, 1);
    allSingelPrices.splice(i, 1);
    updateBasket();
    calculate(allamounts);
}

function plusDishesInBasket(i) {
    let singelPrice = allSingelPrices[i];
    if (allamounts[i] >= singelPrice) {
        plusDischNewPrice(i, singelPrice)
    } else {
        return;
    }
}

function plusDischNewPrice(i, singelPrice) {
    allamounts[i] += singelPrice;
    allamounts[i] > singelPrice;
    updateBasket();
    calculate(allamounts);
}

function deleteCompletely(i) {
    allNames.splice(i, 1);
    allamounts.splice(i, 1);
    allSingelPrices.splice(i, 1);
    updateBasket();
    calculate(allamounts);
}

function calculate(allamounts) {
    let net = 0;
    for (let i = 0; i < allamounts.length; i++) {
        net += allamounts[i];
    }
    calculateTaxAndDeliver(net);
}

function calculateTaxAndDeliver(net) {
    let deliver = 3.50;
    let taxCal = net * (7 / 100);
    let sum = net + taxCal + deliver;
    sumtotal.innerHTML = showTotalCalculate(net, sum);

}

function toggleBurgerMenu() {
    let onBurgerButton = document.getElementById("onBurgerMenu")
    let offBurgerButton = document.getElementById("offBurgerMenu")
    onBurgerButton.classList.toggle('toggle_burger_menu');
    offBurgerButton.classList.toggle('toggle_burger_menu');
    quikMenuScroll();
}

function quikMenuScroll() {
    setTimeout(function () {
        document.querySelector('footer').scrollIntoView({
            behavior: 'smooth', block: 'end'
        });
    }, 200);
    setTimeout(function () {
        document.querySelector('nav').scrollIntoView({
            behavior: 'smooth', block: 'start'
        });
    }, 200);
}

function scrollMainDishes() {
    dishArry();
    setTimeout(function () {
        document.querySelector('#card0').scrollIntoView({
            behavior: 'smooth'
        });
    }, 200);
    setTimeout(function () {
        document.querySelector('footer').scrollIntoView({
            behavior: 'smooth'
        });
    }, 200);
}

function scrollSideDishes() {
    dishArry();
    setTimeout(function () {
        document.querySelector('footer').scrollIntoView({
            behavior: 'smooth'
        });
    }, 200);
    setTimeout(function () {
        document.querySelector('#card5').scrollIntoView({
            behavior: 'smooth',
        });
    }, 200);
}

let ifeelfgood = new Audio('/sounds/james-brown-i-feel-good.mp3')
function playSound() {
    ifeelfgood.play();
}


