import { getEvents } from '../modules/getAPI';
import { createEventCard } from './createEventCard';
import { events } from '../getEvents';

const paginationBarRef = document.querySelector('.pagination__wripper');
const listOfEl = document.querySelector('.events__cards');
const searchInputEl = document.querySelector('.search-form__input');
const searchCountryEl = document.querySelector('.js-countries');

let currentPage = 1;

const markup = {
  number(n, isActive = false) {
    return /*html*/ `<li
      class="pagination__button ${isActive ? 'pagination__button--active' : ''}"
      data-page="${n}"
      data-type="number"
    >
      <span>${n}</span>
    </li>`;
  },
  dots() {
    return /*html*/ `<li 
        class=pagination__button pagination__button_dots"
        data-type="dots"> 
      <span>...</span>
    </li>`;
  },
};

paginationBarRef.addEventListener('click', onPaginationBarClick);

async function onPaginationBarClick(event) {
  if (event.target.dataset.type !== 'number') return;
  currentPage = event.target.dataset.page;

  events.length = 0;
  listOfEl.innerHTML = '';

  const result = await getEvents(
    searchInputEl.value,
    searchCountryEl.value,
    currentPage - 1
  );

  events.push(...result.data._embedded.events);
  events.forEach((e, i) => (listOfEl.innerHTML += createEventCard(e, i)));

  const totalPages = result.data.page.totalPages;
  renderPaginationBar(totalPages, Number(currentPage));
}

export function renderPaginationBar(totalPages, cPage) {
  let toInsert = '';
  let pageBefore = cPage - 2;
  let pageAfter = cPage + 2;

  if (totalPages >= 50) totalPages = 50;

  //Отрисовка числа 1 и ... после неё, если надо
  if (cPage > 2) {
    toInsert += markup.number(1, false);
    if (cPage > 4) {
      toInsert += markup.dots();
    }
  }

  for (let i = pageBefore; i <= pageAfter; i++) {
    if (i > totalPages) {
      continue;
    }
    if (i < 0) {
      continue;
    }
    if (i === 0) {
      i += 1;
    }
    if (i === 1) {
      if (cPage === 3) {
        i += 1;
      }
    }
    if (i === totalPages) {
      if (cPage === totalPages - 2) {
        continue;
      }
    }
    if (i != cPage) {
      toInsert += markup.number(i);
    } else {
      toInsert += markup.number(i, true);
    }
  }

  //Отрисовка числа последней страницы и ... до, если надо
  if (cPage < totalPages - 1) {
    if (cPage < totalPages - 3) {
      toInsert += markup.dots();
    }
    toInsert += markup.number(totalPages, false);
  }

  paginationBarRef.innerHTML = toInsert;
}
