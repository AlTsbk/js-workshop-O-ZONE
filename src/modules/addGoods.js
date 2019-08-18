export default function addGoods() {

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
