export default function getData() {
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
