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
        'dish': 'Sacmpi Coco',
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

function load() {
    renderIcons();
    renderMenuList();
    //rendern vom Warenkorb fehlt hier noch
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
                        <button class="plusbutton">+</button>
</div>

`
}


function renderBasket() {

}


function basketLine() {
    return /*html*/`
        <div class="menucounter">
                    <div class="menudata">
                        <span>5</span>
                        <span>Tikka Masala</span>
                    </div>
                    <div class="counter">
                        <button class="countbutton">+</button>
                        <button class="countbutton">-</button>
                        <span class="singlepricecount">7,99€</span>
                        <img class="icons bin" src="img/bin.png" alt="bin">
                    </div>
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


function saveArray(key, array) {
    localStorage.setItem(key, JSON.stringify(array));
}


function getArray(key) {
    return JSON.parse(localStorage.getItem(key));
}


function showflexbasket() {
    document.getElementById('flexbasket').classList.add('flexbasketvisible');
    document.getElementById('restaurantsection').classList.add('blurdiv');
    document.getElementById('asidebasket').classList.add('blurdiv');
    document.getElementById('footerid').classList.add('blurdiv');
}

function closebasket() {
    document.getElementById('flexbasket').classList.remove('flexbasketvisible');
    document.getElementById('restaurantsection').classList.remove('blurdiv');
    document.getElementById('asidebasket').classList.remove('blurdiv');
    document.getElementById('footerid').classList.remove('blurdiv');
}