import filter from './filter';

export default function renderCatalog() {
    const cards = document.querySelectorAll('.goods .card');
    const catalogList = document.querySelector('.catalog-list');
    const categories = new Set();
    const catalogBtn = document.querySelector('.catalog-button');
    const catalog = document.querySelector('.catalog');

    cards.forEach((card) => {
        categories.add(card.dataset.category);
    });

    categories.forEach((category) => {
        const li = document.createElement('li');
        li.textContent = category;


        catalogList.appendChild(li);
    });

    const allLi = catalogList.querySelectorAll('li');

    catalogBtn.addEventListener('click', (event) => {
        if (catalog.style.display) {
            catalog.style.display = '';
        } else {
            catalog.style.display = 'block';
        }

        if (event.target.tagName === 'LI') {
            allLi.forEach((li) => {
                if (li === event.target) {
                    li.classList.add('active');
                } else {
                    li.classList.remove('active');
                }
            });
            filter();
        }


    });

}
