export default function filter() {

    const cards = document.querySelectorAll('.goods .card');
    const checkBox = document.querySelector('#discount-checkbox');
    const minPrice = document.getElementById('min');
    const maxPrice = document.getElementById('max');
    const search = document.querySelector('.search-wrapper_input');
    const activeLi = document.querySelector('.catalog-list .active');
    console.log(activeLi.textContent);


    const searchText = new RegExp(search.value.trim(), 'i');
    cards.forEach((card) => {
        const cardPrice = card.querySelector('.card-price');
        const price = parseFloat(cardPrice.textContent);
        const title = card.querySelector('.card-title');

        if ((minPrice.value && price < minPrice.value) ||
            (maxPrice.value && price > maxPrice.value) ||
            !searchText.test(title.textContent) ||
            (checkBox.checked && !card.querySelector('.card-sale')) ||
            (card.dataset.category !== activeLi.textContent && activeLi.textContent !== 'Все')) {
            card.parentNode.style.display = 'none';
        } else {
            card.parentNode.style.display = '';
        }

    });
}
