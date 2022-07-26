const form = document.querySelector('.search__form');
const resultsContainer = document.querySelector('.search__findings-list');
const countContainer = document.querySelector('.search__findings');
const errorContainer = document.querySelector('.search__error');

const renderError = () => {
    errorContainer.innerHTML = `
        <img src="https://code.s3.yandex.net/web-code/entrance-test/search.svg" alt="" class="search__error-icon" />
        <p class="search__error-message">
            Произошла ошибка...
        </p>
  `;
    countContainer.innerHTML = '';
};

const renderEmptyResults = () => {
    errorContainer.innerHTML = `
        <img src="https://code.s3.yandex.net/web-code/entrance-test/search.svg" alt="" class="search__error-icon" />
        <p class="search__error-message">
            По вашему запросу ничего не найдено, попробуйте уточнить запрос
        </p>
  `;
    countContainer.innerHTML = '';
};

const renderCount = count => {
    countContainer.innerHTML = `
      Найдено <span class="search__findings-amount">${count.toLocaleString(
        'ru-RU'
    )}</span> результатов
  `;
};

const onSubmitStart = () => {
    countContainer.innerHTML = `Загрузка...`;
    resultsContainer.innerHTML = '';
    errorContainer.innerHTML = '';
};

const template = (item) => {
    const newElement = document.createElement('li');
    newElement.classList.add('search__finding-item');
    newElement.innerHTML = `
<a href=${item.html_url}>
 <p class="search__finding-name"> ${item.full_name} </p> </a>
      <span class="search__finding-description">${item.description}</span>
	`;
    return newElement;
}


const searchButton = document.querySelector('.search__button')
const searchInput = document.querySelector('.search__textfield')
const API = 'https://api.nomoreparties.co/github-search?q='


const textInputEnter = (e) => {
    let total_count = 0
    e.preventDefault()
    const arr = searchInput.value
    onSubmitStart()

    fetch(`${API}${arr}`)
        .then(res => (res.json()))
        .then((res) => {
            total_count = res.total_count
            total_count === 0 ? renderEmptyResults() : renderCount(total_count)
            res.items.map((item) => {
                resultsContainer.appendChild(template(item))
            })
        }, renderError)


}

searchButton.addEventListener('click', textInputEnter)


// async function onSubmit(event) {
//     // ваш код
// }