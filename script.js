let dishes = [
    {
        'dish': 'Gobi Pakora',
        'description': 'Blumenkohl in Kichererbsenmehlteig',
        'price': '4,90',
        'category': 'Vorspeisen',
    },
    {
        'dish': 'Panir Pakora',
        'description': 'hausemachter Käse in Teig',
        'price': '5,90',
        'category': 'Vorspeisen',
    },
    {
        'dish': 'Scampi Coco',
        'description': 'Großgarnelensuppe mit Kokosmilch, Limettenblättern und Zitronengras',
        'price': '5,90',
        'category': 'Suppen',
    },
    {
        'dish': 'Mullingatawny',
        'description': 'Hühnersuppe nach indischer Art',
        'price': '5,90',
        'category': 'Suppen',
    },
    {
        'dish': 'Gemischter Salat',
        'description': 'Wahl aus: mit Joghurt-Dressing, hausgemacht, mit Kräuter-Dressing oder ohne Dressing',
        'price': '5,90',
        'category': 'Salate',
    },
    {
        'dish': 'Murgh Salat',
        'description': 'Wahl aus: mit Joghurt-Dressing, hausgemacht, mit Kräuter-Dressing oder ohne Dressing.',
        'price': '7,90',
        'category': 'Salate',
    },
    {
        'dish': 'Ente Korma',
        'description': 'Entenbrustfilet mit Mandeln, Rosinen und Cashewnüssen in Spezialsauce',
        'price': '15,90',
        'category': 'Hauptgerichte',
    },
    {
        'dish': 'Bengen Baji',
        'description': 'frische Auberginen, frische Tomaten und Ingwer mit Currygewürzen',
        'price': '11,90',
        'category': 'Hauptgerichte',
    },
    {
        'dish': 'Butter Chicken',
        'description': 'Hühnerfleisch in sahniger Butter-Tomatensauce',
        'price': '7,90',
        'category': 'Kindergerichte',
    },
    {
        'dish': 'Chicken Nuggets',
        'description': 'mit Pommes frites',
        'price': '5,90',
        'category': 'Kindergerichte',
    },
    {
        'dish': 'Gulab Jamon',
        'description': 'frittierte Milchbällchen in Zuckersirup',
        'price': '4,90',
        'category': 'Nachspeisen',
    },
    {
        'dish': 'Mangoeis',
        'description': 'Fruchtsorbet serviert mit Mandelsplittern',
        'price': '4,90',
        'category': 'Nachspeisen',
    },
]

let categories = ['Vorspeisen', 'Suppen', 'Salate', 'Hauptgerichte', 'Kindergerichte', 'Nachspeisen',]
let basketDishes = [];
let basketPrices = [];
let amounts = [];
let subtotals = [];

function load() {
    updateArrays();
    renderIcons();//Herz rot oder weiß wird angezeigt
    renderMenuList();//die Speisekarte wird geladen
    renderBasket();// der Warenkorb, sofern was drin, wird geladen
    renderPricing();// Die Preisrechnung , sofern was drin, wird geladen
    renderCounter();
}

function updateArrays() {
    if (localStorage.getItem('savedDishes')) {// wenn etwas i locstor existiert, dann lese diese werte für das alle arrays aus
        basketDishes = getArray('savedDishes');
        basketPrices = getArray('savedPrices');
        amounts = getArray('savedAmounts');
    }// alle drei Arrays haben nun die Werte aus dem local storage und sind bereit zum rendern
}

function renderBasket() {
    if (basketDishes.length <= 0) {
        addPlaceholder();
        let lines = document.getElementById('menucounter');
        lines.innerHTML = '';
    }
    else {
        removePlaceholder();
        renderBasketLines();
    }
}

function renderBasketLines() {
    let lines = document.getElementById('menucounter');
    lines.innerHTML = '';
    for (let i = 0; i < basketDishes.length; i++) {
        const currentDish = basketDishes[i];
        const currentPrice = (basketPrices[i] * amounts[i]).toFixed(2);
        const currentamount = amounts[i];
        lines.innerHTML += basketLine(currentDish, currentPrice, currentamount, i);
    }

}

function basketLine(currentDish, currentPrice, currentamount, i) {
    return /*html*/`
        <div class="menucounter">
                    <div class="menudata">
                        <p>${currentamount}</p>
                        <p>${currentDish}</p>
                    </div>
                    <div class="counter">
                        <div class="countline">
                        <button class="countbutton" onclick="raiseAmount(${i})">+</button>
                        <button class="countbutton" onclick="decreaseAmount(${i})">-</button>
                        <span class="singlepricecount">${currentPrice} €</span>
                        </div>
                        <div>
                        <button onclick="deleteDish(${i})" class="deletebutton"><img class="icons bin" src="img/bin.png" alt="bin"></button>
                        </div>
                    </div>
                </div>
    `
}

function renderPricing() {
    let pricing = document.getElementById('pricefigure');
    if (basketDishes.length > 0) {
        let netto = calculateNetto();
        let brutto = calculateBrutto(netto);
        pricing.innerHTML = pricingTemplate(netto, brutto);
    } else {
        pricing.innerHTML = pricingTemplate(0, 0);
    }
}

function calculateNetto() {
    subtotals.length = 0;
    for (let i = 0; i < basketDishes.length; i++) {
        const subtotal = basketPrices[i] * amounts[i];//multipliziert jedes Dish mit dem mount aus den arrays
        subtotals.push(subtotal);//schiebt die zwischenergebnisse in ein array
    }
    let netto = subtotals.reduce(function (accumulator, currentValue) {
        return accumulator + currentValue;
    }, 0);
    return netto
}

function calculateBrutto(netto) {
    let brutto = netto + 7;
    if (brutto > 21) {
        removeMinimumHint()
    }
    else {
        setMimimunHint()
    }
    return brutto;
}

function renderCounter() {
    let counter = document.getElementById('smallmenucounter');
    let count = amounts.reduce(function (accumulator, currentValue) {
        return accumulator + currentValue;
    }, 0);
    counter.innerHTML = counterTemplate(count);
}

function counterTemplate(count) {
    return /*html*/`<span  class="smallmenucounter">${count}</span>`
}

function removeMinimumHint() {
    document.getElementById('toLess').classList.add('d-none');
    document.getElementById('orderbuttoncolor').classList.add('orderbuttonset');
}

function setMimimunHint() {
    document.getElementById('toLess').classList.remove('d-none');
    document.getElementById('orderbuttoncolor').classList.remove('orderbuttonset');
}

function pricingTemplate(netto, brutto) {
    return /*html*/`
    <div id="">
                    <div class="pricing">
                        <span>Zwischensumme</span>
                        <span>${parseFloat(+netto).toFixed(2)} €</span>
                    </div>
                    <div class="pricing">
                        <span>Lieferkosten</span>
                        <span>7 €</span>
                    </div>
                    <div class="pricing wholesum">
                        <span>Gesamtpreis</span>
                        <span>${parseFloat(+brutto).toFixed(2)} €</span>
                    </div>
                </div>
   `
}

function AddToBasket(index) {
    let newDish = getDishValue(index);
    let newPrice = getPriceValue(index);
    let currentIndex = getDishIndex(newDish);

    if (currentIndex === -1) {// Bedingung: wenn der index vergeben ist, ist index immer positiv, ist er also negativ, dann gibt es ihn nicht
        basketDishes.push(newDish);
        basketPrices.push(newPrice);
        amounts.push(1);// Als menge wird immer 1 in das amount-array geschoben
    }
    else {
        amounts[currentIndex] += 1// gibt es das dish schon wird der entsprechende wert im amountarray um 1 erhöht
    }
    save();
    load();
}

function raiseAmount(i) {
    amounts[i] += 1;
    saveArray('savedAmounts', amounts);
    load();
}

function decreaseAmount(i) {
    if (amounts[i] <= 1) {
        deleteDish(i);
    } else {
        amounts[i] -= 1;
        saveArray('savedAmounts', amounts);
        load();
    }

}

function deleteDish(i) {
    basketDishes.splice(i, 1);
    basketPrices.splice(i, 1);
    amounts.splice(i, 1);
    save();
    load();
}

function sendOrder() {
    if (basketDishes.length > 0) {
        basketDishes.splice(0, basketDishes.length);
        basketPrices.splice(0, basketPrices.length);
        amounts.splice(0, amounts.length);
        alert('Deine Bestellung wurde überittelt.');
        save();
        load();
    }
}

function getValues(divID) {
    let inputValue = document.getElementById(divID).innerHTML;
    return inputValue;
}

function getDishValue(currentIndex) {
    let choosenDish = getValues(`menu${currentIndex}`);
    return choosenDish.trim();
}

function getPriceValue(currentIndex) {
    let choosenPrice = getValues(`price${currentIndex}`);
    deziPrice = choosenPrice.replace(",", ".");// ersetzt die , mit Punkten da js nur mit punkten rechnen kann
    calcPrice = deziPrice.slice(0, -1);//nimmt die letzte stelle des wertes weg ( das euro zeichen)
    return parseFloat(+calcPrice).toFixed(2);//gibt eine zahl als dezimalzahl mit 2 kommastellen wieder
}

function getDishIndex(newDish) {
    return basketDishes.indexOf(newDish);
}

function removePlaceholder() {
    if (basketDishes.length >= 1) {
        document.getElementById('placeholder').classList.add('d-none');
    }
}

function addPlaceholder() {
    document.getElementById('placeholder').classList.remove('d-none');
}

function renderMenuList() {
    let menulist = document.getElementById('menulist');
    menulist.innerHTML = '';
    for (let i = 0; i < categories.length; i++) {
        menulist.innerHTML += categoryTemplate(i);
        for (let j = 0; j < dishes.length; j++) {// j durchläuft das ganze json also werte von 0-11
            let menudiv = document.getElementById(`menuoptions${i}`)// die existiert 6 mal mit werten 0-1
            if (categories[i] == dishes[j]['category']) {
                menudiv.innerHTML += menuOptionTemplate(j);
            }

        };
    }
}

function categoryTemplate(i) {
    return /*html*/`
                 <figure  id="${categories[i]}" class="menucollection figuremargin">
                    <span class="menuheadline">${categories[i]}</span>
                    <div id="menuoptions${i}" class="menuoptions">
                    </div>
                </figure>
    `
}

function menuOptionTemplate(j) {
    return /*html*/` <div class="menubox">
                        <div class="menuinfos">
                            <span id="menu${j}" class="menuname">${dishes[j]['dish']}</span>
                            <span class="menu">${dishes[j]['description']}</span>
                            <span id="price${j}" class="menuprice">${dishes[j]['price']} €</span>
                        </div>
                        <button onclick="AddToBasket(${j})" class="plusbutton">+</button>
</div>

`
}

function renderIcons() {
    if (localStorage.getItem('savedcolor')) {// wenn etwas im locstor existiert, dann lese diese werte für das array aus
        heartcolor = JSON.parse(localStorage.getItem('savedcolor'));  //dem array  werden die neuen werte aus dem local storage zugewiesen und sind bereit zum rendern, hier werden sie also returned
        document.getElementById('hearticondiv').innerHTML = setHeart(heartcolor);
    }
    else {
        document.getElementById('hearticondiv').innerHTML = setHeart('herz.png');
    }
}

function setHeart(heartcolor) {
    return  /*html*/`   <img class="icons" src="img/info.png" alt="info">
                        <img onclick="like()" id="hearticon" class="icons" src="img/${heartcolor}" alt="heart">
                    `
}

function like() {
    let heart = document.getElementById('hearticon');
    if (heart.src.includes('img/herz.png')) {// wenn das Herz weiß ist
        heartcolor = 'herzred.png'; //HertRot wird in variable gepackt
        localStorage.setItem('savedcolor', JSON.stringify(heartcolor)); //herzrot wird unter key savedcolor in lcstor gespeichert
        renderIcons();// Herz wird rot
    }
    else {// wenn das Herz nicht weiß, also Rot ist
        heartcolor = 'herz.png'; //HertRot wird in variable gepackt
        localStorage.setItem('savedcolor', JSON.stringify(heartcolor)); //herzrot wird unter key savedcolor in lcstor gespeichert
        renderIcons();// Herz wird rot
    }
}

function save() {
    saveArray('savedDishes', basketDishes);
    saveArray('savedPrices', basketPrices);
    saveArray('savedAmounts', amounts);
}

function saveArray(key, array) {
    localStorage.setItem(key, JSON.stringify(array));
}

function getArray(key) {
    return JSON.parse(localStorage.getItem(key));
}

function showflexbasket() {
    document.getElementById('restaurantsection').classList.add('blurdiv');
    document.getElementById('asidebasket').classList.add('d-flex');
    document.getElementById('footerid').classList.add('blurdiv');
    document.getElementById('header').classList.add('blurdiv');
}

function closebasket() {
    document.getElementById('restaurantsection').classList.remove('blurdiv');
    document.getElementById('asidebasket').classList.remove('d-flex');
    document.getElementById('footerid').classList.remove('blurdiv');
    document.getElementById('header').classList.remove('blurdiv');
}

function flexbasketresponsive() {
    screenWidth = window.innerWidth;
    if (screenWidth > 1620) {
        closebasket()
    }
}

setInterval(flexbasketresponsive, 100);