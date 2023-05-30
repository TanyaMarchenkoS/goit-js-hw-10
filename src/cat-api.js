import Notiflix from 'notiflix';

const BASE_URL = 'https://api.thecatapi.com/v1/breeds';
const API = "live_WbBVxSj9QuEvqod7wmsLfgFgTbUxlVPYBfEKx3qV4lcR9TKupO5XjvMNFsMB7WUA";
const CAT_SEARCH = 'https://api.thecatapi.com/v1/images/search';

export function fetchBreeds(){
      const params = new URLSearchParams({
          apikey: API,
    });
    return fetch(`${BASE_URL}?${params}`)
        .then((r) => {
            if (!r.ok) {
                throw new error(r.status)
            }
            return r.json()
        })
    .catch(() => Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!'));
};

export function fetchCatByBreed(breedId) {
    return fetch(`${CAT_SEARCH}?breed_ids=${breedId}&api_key=${API}`)
    .then((r) => {
        if (!r.ok) {
            throw new error(r.status)
        }
        return r.json()
    })
    .catch(() => console.log());
};