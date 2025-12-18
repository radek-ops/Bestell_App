let allDishesArry = [];
let allNames = [];
let allamounts = [];
let allSingelPrices = [];
let showDishes = document.getElementById('dishes');
let sumtotal = document.getElementById('sum');
let amounts = document.getElementById('amounts');
let sentOrder = document.getElementById('submitOrder');
let currentDishes = '';

function init() {
    /*  The website always starts at the top when reloaded. 
        anchors in some functions, for example in scrollToFirstDish() */
    if (history.scrollRestoration) {
        history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    createDishesArray();
    calculateTotalAmount(allamounts, 0);
}

function createDishesArray() {
    showDishes.innerHTML = '';
    allDishesArry = allDishes.filter((createArry) => { return createArry['dish'] });
    mainDishesArray();
}

function mainDishesArray() {
    for (let i = 0; i < allDishesArry.length; i++) {
        const selection = tplRenderMainDishes(i);
        showDishes.innerHTML += selection;
    }
}

function allCurrentDishesSelectionArray(i) {
    showDishes.innerHTML = '';
    for (let j = 0; j < allDishes[i].selection.length; j++) {
        const entireSelection = allDishes[i].selection[j];
        currentDishes = tplShowCurrentDishesSelectionArray(entireSelection, j);
        showDishes.innerHTML += currentDishes;
        scrollToFirstDish();
    }
}

function scrollToFirstDish() {
    setTimeout(function () {
        document.querySelector('#menuCard0').scrollIntoView({
            behavior: 'smooth'
        });
    }, 200);

}

function addToBasket(dishName, toPay) {
    sentOrder.innerHTML = '';
    let index = allNames.indexOf(dishName);
    if (index === -1) {
        pushArrays(dishName, toPay);
    } else {
        allamounts[index] += toPay;
    }
    updateBasket();
    calculateTotalAmount(allamounts, 3.50);
}

function pushArrays(dishName, toPay) {
    allNames.push(dishName);
    allamounts.push(toPay);
    allSingelPrices.push(toPay);
}

function updateBasket() {
    amounts.innerHTML = '';
    for (let i = 0; i < allNames.length; i++) {
        let singelPrice = allSingelPrices[i];
        calculateCounter(i, singelPrice);
    }
}

function calculateCounter(i, singelPrice,) {
    let counterCalc = Math.round(allamounts[i] / singelPrice);
    amounts.innerHTML += tplShowAmounts(allNames[i], allamounts[i], i, counterCalc);
}

function minusDishesInBasket(i) {
    let singelPrice = allSingelPrices[i];
    if (allamounts[i] > singelPrice) {
        minusDishNewPrice(i, singelPrice);

    } else if (allamounts[i] <= allSingelPrices) {
        calculateTotalAmount(allamounts, 0);
        deleteCompletely(i);
    } else {
        afterMinusLastDish(i);
    }
}

function minusDishNewPrice(i, singelPrice) {
    allamounts[i] -= singelPrice;
    updateBasket();
    calculateTotalAmount(allamounts, 3.50);
}

function afterMinusLastDish(i) {
    allNames.splice(i, 1);
    allamounts.splice(i, 1);
    allSingelPrices.splice(i, 1);
    updateBasket();
    calculateTotalAmount(allamounts, 3.50);
}

function plusDishesInBasket(i) {
    let singelPrice = allSingelPrices[i];
    if (allamounts[i] >= singelPrice) {
        plusDishNewPrice(i, singelPrice)
    } else {
        return;
    }
}

function plusDishNewPrice(i, singelPrice) {
    allamounts[i] += singelPrice;
    allamounts[i] > singelPrice;
    updateBasket();
    calculateTotalAmount(allamounts, 3.50, i);

}

function deleteCompletely(i) {
    allNames.splice(i, 1);
    allamounts.splice(i, 1);
    allSingelPrices.splice(i, 1);
    updateBasket();
    calculateTotalAmount(allamounts, 0);
    sentOrder.innerHTML = '';

}

function calculateTotalAmount(allamounts, deliverPrice, i) {
    let net = 0;
    for (let i = 0; i < allamounts.length; i++) {
        net += allamounts[i];
    }
    calculateTaxAndDeliver(net, deliverPrice, i);
}

function calculateTaxAndDeliver(net, deliverPrice, i) {
    let deliver = deliverPrice;
    let taxCal = net * (7 / 100);
    let sum = net + taxCal + deliver;
    sumtotal.innerHTML = tplShowTotalCalculate(net, sum, i);

}

function toggleQuickMenu() {
    let onBurgerButton = document.getElementById("onQuickMenu")
    let offBurgerButton = document.getElementById("offQuickMenu")
    onBurgerButton.classList.toggle('toggle_quick_menu');
    offBurgerButton.classList.toggle('toggle_quick_menu');
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
    createDishesArray();
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
    createDishesArray();
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

function submitOrder() {
    if (allamounts && allNames == 0) {
        sentOrder.innerHTML = 'Bitte erst eine Bestellung aufgeben!';
    } else {
        allNames.length = 0;
        allamounts.length = 0;
        allSingelPrices.length = 0;
        updateBasket();
        calculateTotalAmount(allamounts, 0);
        sentOrder.innerHTML = 'Bestellung gesendet!';
    }
}

function openBasket() {
    document.getElementById("basketResponsiveOn").classList.toggle("basket-on");
    document.getElementById("basketResponsiveOff").classList.toggle("basket-on");
    document.getElementById("continue").innerHTML = 'Weiter einkaufen';
}

