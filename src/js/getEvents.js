import { COUNTRIES_LIST } from './modules/countriesList';
import { countriesListMurkup } from './templates/countriesListMurkup';
import { createEventCard } from './templates/createEventCard';
import { getEvents } from './modules/getAPI';
import { renderPaginationBar } from './templates/pagination';
import debounce from 'lodash.debounce';
// --------------------------------------------
const refEventsGallery = document.querySelector('.events__cards');
const refSearchEventsInputs = document.querySelector('.js-search-form');
const refSearchFormInput = document.querySelector('.js-countries');

let event = '';
let country = '';
let currentPage = 1;
export const events = [];

refSearchEventsInputs.addEventListener(
  'input',
  debounce(onSearchEventsInput, 1000)
);

refSearchFormInput.insertAdjacentHTML(
  'beforeend',
  countriesListMurkup(COUNTRIES_LIST)
);

getEvents().then(data => {
  events.push(...data.data._embedded.events);
  events.forEach(
    (e, i) => (refEventsGallery.innerHTML += createEventCard(e, i))
  );

  const totalPagesOfEl = data.data.page.totalPages;
  renderPaginationBar(totalPagesOfEl, currentPage);
});

function onSearchEventsInput(e) {
  if (e.target.name === 'event') {
    event = e.target.value;
  }

  if (e.target.name === 'country') {
    country = e.target.value;
  }

  getEvents(event, country).then(data => {
    const totalPagesOfEl = data.data.page.totalPages;
    renderPaginationBar(totalPagesOfEl, currentPage);

    document.querySelector('.events__err').style.display = 'none';
    document.querySelector('.pagination__wripper').style.display = 'flex';

    if (!data.data.page.totalElements) {
      refEventsGallery.innerHTML = '';
      document.querySelector('.events__err').style.display = 'block';
      document.querySelector('.pagination__wripper').style.display = 'none';
      return;
    }

    events.length = 0;
    refEventsGallery.innerHTML = '';

    events.push(...data.data._embedded.events);
    events.forEach(
      (e, i) => (refEventsGallery.innerHTML += createEventCard(e, i))
    );
  });
}

// -----------------Color control on SearchFormInput--------------
refSearchFormInput.addEventListener('click', onCountryInputClick);
function onCountryInputClick(e) {
  if (e.target.value) {
    refSearchFormInput.classList.add('search-form__input--white');
  } else {
    refSearchFormInput.classList.remove('search-form__input--white');
  }
}
