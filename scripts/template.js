function tplRenderMainDishes(i) {
    return `<button class="button-main-menus" type="button" onclick="allCurrentDishesSelectionArray(${i})">
                <div class="main-card" id="card${i}">
                 <h3>${allDishesArry[i].title}</h3>
               </div>
            </button>`;
}

function tplShowCurrentDishesSelectionArray(entireSelection, j) {
    return `<div class="card" id="menuCard${j}">
                       <div class="menu-card">
                          <span class="dish-title" >${entireSelection.name}</span>
                          <span class="dish-description" >${entireSelection.description}</span>
                          <span class="dish-price" id="dishPrice">Preis: ${entireSelection.price.toFixed(2).replace(".", ",")} €</span >
                        </div> 
                        <button id="plusDish" class="plus-button" type="button"
                        onclick="addToBasket('${entireSelection.name}', ${parseFloat(entireSelection.price)})">+</button>                                       
                </div >`;
}

function tplShowAmounts(dishName, toPay, i, counterCalc) {
    return `<div class="besket"><p class="dish-title">${dishName}</p>
                <div class="amount-plus-minus">
                 <button onclick="minusDishesInBasket(${i})" class="button-minus-basket" type="button" >-</button>
                   <span id="counter${i}" class="basket-price">${counterCalc}</span>
                   <button onclick="plusDishesInBasket(${i})" class="button-plus-basket" type="button">+</button>
                   <span id="basketPricePlus" class="basket-price">${toPay.toFixed(2).replace(".", ",") + ' €'}</span>
                  <div class="trash"><button onclick="deleteCompletely(${i})" class="trash-button" typ="button">&#128465;</button>
                </div>
               </div>
            </div>`;
}

function tplShowTotalCalculate(net, sum, i) {
    return ` <div class="price-total">
                    <div class ="subtotal">
                     <p class="p-total">Netto:</p><span class="span-basket">${net.toFixed(2).replace(".", ",") + ' €'}</span>
                        </div>
                        <div class="tax">
                         <p class="p-total">MwSt.:</p><span class="span-basket"> + 7 % </span>
                         </div> 
                         <div class="tax">
                         <p class="p-total">Lieferung.:</p><span class="span-basket"> + 3,50 € </span>
                         </div> 
                         <div class="total">
                       <b>Gesamt:</b><b>${sum.toFixed(2).replace(".", ",") + ' €'}</b>
                   </div>
                   <button id="submit" type="submit" class="submit-button" onclick="submitOrder(${i})">Bestellung Senden</button>
              </div>`;
}