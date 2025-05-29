var products = [];
var featured = [
    {
        price: '€300,00 EUR',
        text: 'Dark blue alpine climbing jacket',
        image: './assets/featured/product_photo_01.webp',
        alt: 'Dark blue alpine climbing jacket on a snowy mountain background',
        label: 'bestseller'
    },
    {
        price: '€300,00 EUR',
        text: 'Orange helmet for alpine TOUNDRA',
        image: './assets/featured/product_photo_02.webp',
        alt: 'Bright orange alpine helmet TOUNDRA displayed on rocky terrain',
        label: 'limited edition'
    },
    {
        price: '€300,00 EUR',
        text: 'Grey alpine climbing jacket',
        image: './assets/featured/product_photo_03.webp',
        alt: 'Light grey alpine climbing jacket suitable for winter expeditions'
    },
    {
        price: '€300,00 EUR',
        text: 'Dark blue alpine climbing jacket',
        image: './assets/featured/product_photo_01.webp',
        alt: 'Dark blue alpine climbing jacket on a snowy mountain background',
        label: 'bestseller'
    },
    {
        price: '€300,00 EUR',
        text: 'Dark blue alpine climbing jacket',
        image: './assets/featured/product_photo_01.webp',
        alt: 'Dark blue alpine climbing jacket on a snowy mountain background',
        label: 'bestseller'
    },
    {
        price: '€300,00 EUR',
        text: 'Orange helmet for alpine TOUNDRA',
        image: './assets/featured/product_photo_02.webp',
        alt: 'Bright orange alpine helmet TOUNDRA displayed on rocky terrain',
        label: 'limited edition'
    },
    {
        price: '€300,00 EUR',
        text: 'Grey alpine climbing jacket',
        image: './assets/featured/product_photo_03.webp',
        alt: 'Light grey alpine climbing jacket suitable for winter expeditions'
    },
];

let pageSize = 14;
let pageNumber = 1;
let fetchProducts = () => {
    return fetch(`https://brandstestowy.smallhost.pl/api/random?pageNumber=${pageNumber}&pageSize=${pageSize}`)
        .then(resp => resp.json())
        .then((resp) => {
            products = resp.data;
        })
        .then(() => {
            displayProducts(products);
        })
}

function displayProducts(products) {
    let productList = document.getElementById('productList');
    products.forEach(product => {
        let productTile = document.createElement('div');
        productTile.classList.add('product-item');
        productTile.addEventListener('click', () => {
            openPopup(product);
        })

        let productImage = createProductImage(product);
        productImage.alt = product.text;

        let label = createProductImageLabel(product.id);

        productTile.appendChild(label);
        productTile.appendChild(productImage);
        productList.appendChild(productTile);
    })
}

function displayFeatured(products) {
    let productList = document.getElementsByClassName('swiper-wrapper')[0];
    products.forEach(product => {

        let wraper = document.createElement('div');
        wraper.classList.add('swiper-slide');

        let productTile = document.createElement('div');
        productTile.classList.add('product-item');

        let productImage = createProductImage(product);
        productImage.alt = product.alt;
        let label = createFeturedLabel(product);
        let fav = createFavoriteIcon();

        let text = document.createElement('div');
        text.classList.add('featured-text');
        text.innerHTML = `
            <p class="large">${product.text}</p>
            <spanp>${product.price}</span>
        `

        if (label) {
            productTile.appendChild(label);
        }

        productTile.appendChild(fav);
        productTile.appendChild(productImage);
        wraper.appendChild(productTile);
        wraper.appendChild(text);
        productList.appendChild(wraper);
    })
}

function openPopup(product) {
    let popup = document.createElement('div');
    let popupText = document.createElement('div');
    popupText.classList.add('popup-text');
    popup.id = 'popup-window';
    let body = document.getElementsByTagName('body')[0];
    popup.classList.add('product-image', 'popup');

    let closeButton = createPopupCloseButton();
    let label = createProductImageLabel(product.id);
    label.classList.remove('product-image-label');

    popupText.appendChild(label);
    popupText.appendChild(closeButton);

    popup.appendChild(popupText);
    let productImage = createProductImage(product);
    popup.appendChild(productImage);
    body.appendChild(popup);

    toggleOverlay();
}

function closePopup() {
    let popup = document.getElementById('popup-window');
    popup.parentNode.removeChild(popup);
    toggleOverlay();
}

function toggleOverlay() {
    let overlay = document.getElementById('popup-overlay');
    overlay.classList.toggle('show-overlay');
}

function createPopupCloseButton() {
    let closeButton = document.createElement('div');
    closeButton.classList.add('close-button');
    closeButton.addEventListener('click', () => {
        closePopup();
    });
    let icon = document.createElement('img');
    icon.src = 'CLOSE.svg';
    let text = document.createElement('span');
    text.innerText = 'Close';

    closeButton.appendChild(icon);
    closeButton.appendChild(text);
    return closeButton;
}

function createProductImage(product) {
    let image = document.createElement('img');
    image.src = product.image;
    image.loading = 'lazy';
    image.classList.add('product-image');
    return image;
}

function createFavoriteIcon() {
    let img = document.createElement('img');
    img.src = './assets/icons/icon_fav.svg';
    img.classList.add('fav-icon');
    return img;
}

function createProductImageLabel(productId) {
    let label = document.createElement('span');
    label.innerText = `ID: ${String(productId).padStart(2, '0')}`;
    label.classList.add('product-image-label');
    return label;
}

function createFeturedLabel(product) {
    if (!product.label) {
        return null;
    }
    let label = document.createElement('span');
    label.innerText = product.label;
    label.classList.add('featured-label');
    switch (product.label) {
        case 'bestseller':
            label.classList.add('bestseller-label');
            break;
        case 'limited edition':
            label.classList.add('limited-label');
            break;
    }
    return label;
}

function selectValue(value) {
    pageSize = value;
    let sel = document.getElementById('selectedValue');
    sel.innerText = pageSize;
    pageNumber = 1;
    console.log('pn', pageNumber);
    console.log('ps', pageSize);
    console.log('current', products.leangth);
    clearList();
    console.log('cleared', products.length);
    fetchProducts();
    console.log('fetched', products.length);
}

function clearList() {
    products = [];
    let productList = document.getElementById('productList');
    baner = productList.firstElementChild;
    productList.innerHTML = '';
    productList.appendChild(baner);
}

function openMobileMenu() {
    let menu = document.getElementById('menu-mobile');
    menu.classList.toggle('active-menu');
    document.body.classList.toggle('overflow-none');
    toggleOverlay();
}

fetchProducts();

displayFeatured(featured);

let container = document.querySelector('a.logo');
let icon = document.getElementById('forma-logo');
container.addEventListener("mouseover", (event) => {
    icon.src = './assets/icons/forma-fill.svg';
});

container.addEventListener("mouseleave", (event) => {
    icon.src = './assets/icons/forma-default.svg';
});

let favIcons = [...document.getElementsByClassName('fav-icon')];
favIcons.forEach(icon => {
    icon.addEventListener('click', (event) => {
        const src = event.target.getAttribute('src');
        event.target.src = src == './assets/icons/icon_fav.svg' ? './assets/icons/icon_fav_fill.svg' : './assets/icons/icon_fav.svg';
    })
})

let customSelect = document.getElementsByClassName('custom-select')[0];
customSelect.addEventListener('click', (event) => {
    let options = [...document.getElementsByClassName('option')];
    customSelect.classList.toggle('active');
    let choosen = document.getElementsByClassName("choosen-select")[0];
    choosen.classList.toggle('border-bottom');
    options.forEach(option => {
        option.classList.toggle('hidden');
    })
});

let scrollTriggered = false;
window.addEventListener("scroll", function () {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
        if (!scrollTriggered) {
            pageNumber += 1;
            fetchProducts();
            scrollTriggered = true;

            this.setTimeout(() => {
                scrollTriggered = false;
            }, 1000)
        }
    }
});