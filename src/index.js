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

    checkBox.addEventListener('change', filter);
    minPrice.addEventListener('change', filter);
    maxPrice.addEventListener('change', filter);
    searchBtn.addEventListener('click', filter);
}


// render Cards

function getData() {
    const content = document.querySelector('.goods');
    return fetch('../db/db.json').then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error('Данные не были получены, ошибка: ' + res.status);

            }
        })
        //.then(data => renderCards(data))
        .catch((err) => {
            content.innerHTML = '<div class="alert alert-warning center" role="alert" style = "margin: auto;">Упс, что-то пошло не так</div>'
            console.log(err);
            
        });

}

function renderCards(data) {
    const goods = document.querySelector('.goods');
    data.goods.forEach((good) => {
        const card = document.createElement('div');
        card.className = 'col-12 col-md-6 col-lg-4 col-xl-3';
        card.innerHTML = `  <div class="card" data-category = ${good.category}>
                                ${good.sale ? '<div class="card-sale">🔥Hot Sale🔥</div>' : ''}
                                <div class="card-img-wrapper">
                                    <span class="card-img-top"
                                        style="background-image: url('${good.img}')"></span>
                                </div>
                                <div class="card-body justify-content-between">
                                    <div class="card-price">${good.price} ₽</div>
                                    <h5 class="card-title">${good.title}</h5>
                                    <button class="btn btn-primary">В корзину</button>
                                </div>
                            </div>`

        goods.appendChild(card);
    });
}

// catalog

function renderCatalog(){
    const cards = document.querySelectorAll('.goods .card');
    const catalogList = document.querySelector('.catalog-list');
    const categories = new Set();
    const catalogBtn = document.querySelector('.catalog-button');
    const catalog = document.querySelector('.catalog');

    categories.add('Все');
    cards.forEach((card) =>{
        categories.add(card.dataset.category);
    });

    categories.forEach((category)=>{
        const li = document.createElement('li');
        li.textContent = category;
        
        
        catalogList.appendChild(li);
    });

    catalogBtn.addEventListener('click',(event)=>{
        if(catalog.style.display){
            catalog.style.display = '';
        }else{
            catalog.style.display = 'block';
        }
        
        if(event.target.tagName === 'LI'){
            cards.forEach((card)=>{
                if(card.dataset.category === event.target.textContent || event.target.textContent === 'Все'){
                    card.style.display = '';
                }else{
                    card.style.display = 'none';
                }
            });
        }
    });

}

getData().then(data =>{
    renderCards(data);
    checkboxToggle();
    cartToggle();
    addGoods();
    filters();
    renderCatalog();
});
