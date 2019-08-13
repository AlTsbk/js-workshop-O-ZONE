//checkbox

const checkbox = document.getElementById('discount-checkbox');

checkbox.addEventListener('change',function(){
    if(this.checked){
        this.nextElementSibling.classList.add('checked');
    }else{
        this.nextElementSibling.classList.remove('checked');
    }
})

//cart

const cart = document.querySelector('.cart');
const cartBtn = document.getElementById('cart');
const cartCloseBtn = document.querySelector('.cart-close');

cartBtn.addEventListener('click',()=>{
    cart.style.display = 'flex';
    document.body.style.overflow = 'hidden';
});

cartCloseBtn.addEventListener('click',()=>{
    cart.style.display = 'none';
    document.body.style.overflow = '';
});


// add goods

const cards = document.querySelectorAll('.goods .card');
const cartWrapper = document.querySelector('.cart-wrapper');
const cartEmpty = document.getElementById('cart-empty');
const goodsCounter = document.querySelector('.counter');
const totalPrice = document.querySelector('.cart-total span')
console.log(totalPrice);


cards.forEach((card)=>{
    const btn = card.querySelector('.btn');
    btn.addEventListener('click',()=>{
        cartWrapper.appendChild(card.cloneNode(true));
        cartEmpty.remove();
        showCounter();
    });
})


function showCounter(){
    const goodsInCart = document.querySelectorAll('.cart .card');
    goodsCounter.textContent = goodsInCart.length;

    let tp = 0;
    goodsInCart.forEach((card)=>{
        const price = card.querySelector('.card-price').textContent;
        tp += +price.slice(0,price.indexOf(' '));
    });
    totalPrice.textContent = tp;
}
