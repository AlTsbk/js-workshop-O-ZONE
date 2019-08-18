import filter from './filter';

export default function actionPage() {
    const checkBox = document.querySelector('#discount-checkbox');
    const goods = document.querySelector('.goods');
    const minPrice = document.getElementById('min');
    const maxPrice = document.getElementById('max');
    const searchBtn = document.querySelector('.search-btn');


    checkBox.addEventListener('change', filter);
    minPrice.addEventListener('change', filter);
    maxPrice.addEventListener('change', filter);
    searchBtn.addEventListener('click', filter);
}
