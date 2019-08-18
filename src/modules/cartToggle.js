export default function cartToggle() {

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

