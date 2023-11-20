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
        'category': 'Vorspeisen'
    },
    {
        'dish': 'Sacmpi Coco',
        'description': 'Großgarnelensuppe mit Kokosmilch, Limettenblättern und Zitronengras',
        'price': '5,90',
        'category': 'Suppen'
    },
    {
        'dish': 'Mullingatawny',
        'description': 'Hühnersuppe nach indischer Art',
        'price': '5,90',
        'category': 'Suppen'
    },
    {
        'dish': 'Gemischter Salat',
        'description': 'Wahl aus: mit Joghurt-Dressing, hausgemacht, mit Kräuter-Dressing oder ohne Dressing',
        'price': '5,90',
        'category': 'Salate'
    },
    {
        'dish': 'Murgh Salat',
        'description': 'Wahl aus: mit Joghurt-Dressing, hausgemacht, mit Kräuter-Dressing oder ohne Dressing.',
        'price': '7,90',
        'category': 'Salate'
    },
    {
        'dish': 'Ente Korma',
        'description': 'Entenbrustfilet mit Mandeln, Rosinen und Cashewnüssen in Spezialsauce',
        'price': '15,90',
        'category': 'Hauptgerichte'
    },
    {
        'dish': 'Bengen Baji',
        'description': 'frische Auberginen, frische Tomaten und Ingwer mit Currygewürzen',
        'price': '11,90',
        'category': 'Hauptgerichte'
    },
    {
        'dish': 'Butter Chicken',
        'description': 'Hühnerfleisch in sahniger Butter-Tomatensauce',
        'price': '7,90',
        'category': 'Kindergerichte'
    },
    {
        'dish': 'Chicken Nuggets',
        'description': 'mit Pommes frites',
        'price': '5,90',
        'category': 'Kindergerichte'
    },
    {
        'dish': 'Gulab Jamon',
        'description': 'frittierte Milchbällchen in Zuckersirup',
        'price': '4,90',
        'category': 'Nachspeisen'
    },
    {
        'dish': 'Mangoeis',
        'description': 'Fruchtsorbet serviert mit Mandelsplittern',
        'price': '4,90',
        'category': 'Nachspeisen'
    },
]

let categories = ['Vorspeisen', 'Suppen', 'Salate', 'Hauptgerichte', 'Kindergerichte', 'Nachspeisen',]

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

function load() {
    renderMenuList()
    //rendern vom Warenkorb
}

function renderMenuList() {
    let menulist = document.getElementById('menulist');
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










// function menuTemplate(disharray, index) {
//     return /*html*/`
//         < div class="menuoptions" >
//                         <div class="menuinfos">
//                             <span id="menu${index}" class="menuname">${disharray['dish']}</span>
//                             <span class="menu">${disharray['description']}</span>
//                             <span id="price${index}" class="menuprice">${disharray['price']} €</span>
//                         </div>
//                         <button class="plusbutton">+</button>
//                     </div >
//         `
// }