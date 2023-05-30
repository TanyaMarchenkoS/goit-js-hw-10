import { fetchCatByBreed, fetchBreeds } from './cat-api.js'
import SlimSelect from 'slim-select'
import 'slim-select/dist/slimselect.css'
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import Notiflix from 'notiflix';
        
const catInfo = document.querySelector('.cat-info');
const select = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const errorEl = document.querySelector('.error');

updateSelect();

function updateSelect(data) {
    fetchBreeds(data).then(data => {
        const markupBreeds = data.map(({id, name }) => {
            return `<option value ='${id}'>${name}</option>`;
        }).join('')
        select.insertAdjacentHTML('beforeend', markupBreeds);
        new SlimSelect({
            select: '#selectElement'
        });
    }).catch(() => Notify.failure('Oops! Something went wrong! Try reloading the page!'))
};

select.addEventListener("change", onSelected);

Loading.remove('loader');
errorEl.style.display = 'none'
loader.style.display = 'none'

function onSelected(e) {
    Loading.dots();
    let breedId = e.target.value;

    fetchCatByBreed(breedId).then((data) => {

        const markupCats = data[0].breeds
            .map(({ name, description, temperament }) => {
            return `<h1>${name}</h1><p>${description}</p><p>Temperament: ${temperament}</p>`;
        }).join('');

        const markupPicture = data.map(({url}) => {
            return `<img src='${url}' width='500'>`
        }).join('');

        catInfo.insertAdjacentHTML('afterbegin', markupCats);
        catInfo.insertAdjacentHTML('beforeend', markupPicture);
    })
    .catch(() => Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!'))
    .finally(() => {
        Loading.remove();
    });
    catInfo.innerHTML = '';
};