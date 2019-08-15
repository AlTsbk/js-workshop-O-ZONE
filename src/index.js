//checkbox
function checkboxToggle() {
    const checkbox = document.getElementById('discount-checkbox');

    checkbox.addEventListener('change', function () {
        if (this.checked) {
            this.nextElementSibling.classList.add('checked');
        } else {
            this.nextElementSibling.classList.remove('checked');
        }
    })
}

//cart
function cartToggle() {

    const cart = document.querySelector('.cart');
    const cartBtn = document.getElementById('cart');
    const cartCloseBtn = document.querySelector('.cart-close');

    cartBtn.addEventListener('click', () => {
        cart.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });

    cartCloseBtn.addEventListener('click', () => {
        cart.style.display = 'none';
        document.body.style.overflow = '';
    });
}


// add goods

function addGoods() {

    const cards = document.querySelectorAll('.goods .card');
    const cartWrapper = document.querySelector('.cart-wrapper');
    const cartEmpty = document.getElementById('cart-empty');
    const goodsCounter = document.querySelector('.counter');
    const totalPrice = document.querySelector('.cart-total span')

    cards.forEach((card) => {
        const btn = card.querySelector('.btn');
        btn.addEventListener('click', () => {
            cartWrapper.appendChild(card.cloneNode(true));
            showCounter();

            const deleteBtn = cartWrapper.querySelectorAll('.card button');
            deleteBtn.forEach((btn) => {
                btn.textContent = 'Удалить';
                btn.addEventListener('click', () => {
                    btn.parentNode.parentNode.remove();
                    showCounter();
                })

            });

        });
    })


    function showCounter() {
        const goodsInCart = document.querySelectorAll('.cart .card');
        goodsCounter.textContent = goodsInCart.length;

        let tp = 0;
        goodsInCart.forEach((card) => {
            const price = card.querySelector('.card-price').textContent;
            tp += parseFloat(price);
        });

        totalPrice.textContent = tp;

        if (goodsInCart.length) {
            cartEmpty.remove();
        } else {
            cartWrapper.appendChild(cartEmpty);
        }
    }
}

function filters() {
    const cards = document.querySelectorAll('.goods .card');
    const checkBox = document.querySelector('#discount-checkbox');
    const goods = document.querySelector('.goods');
    const minPrice = document.getElementById('min');
    const maxPrice = document.getElementById('max');
    const search = document.querySelector('.search-wrapper_input');
    const searchBtn = document.querySelector('.search-btn');



    function filter() {
        const searchText = new RegExp(search.value.trim(), 'i');
        cards.forEach((card) => {
            const cardPrice = card.querySelector('.card-price');
            const price = parseFloat(cardPrice.textContent);
            const title = card.querySelector('.card-title');
            
            if ((minPrice.value && price < minPrice.value) ||
                (maxPrice.value && price > maxPrice.value) ||
                 !searchText.test(title.textContent) ||
                 (checkBox.checked && !card.querySelector('.card-sale'))) {
                card.parentNode.style.display = 'none';
            } else {
                card.parentNode.style.display = '';
            }

        });
    }

    checkBox.addEventListener('change',filter);
    minPrice.addEventListener('change', filter);
    maxPrice.addEventListener('change', filter);
    searchBtn.addEventListener('click', filter);
}

checkboxToggle();
cartToggle();
addGoods();
filters();