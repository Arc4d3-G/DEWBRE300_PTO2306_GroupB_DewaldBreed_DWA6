import { books, authors, genres, BOOKS_PER_PAGE } from './data.js';
import {
  html,
  generatePreviews,
  generateGenreHtml,
  generateAuthorHtml,
  generateShowMoreButton,
  generateSearchResults,
} from './generators.js';
import {
  setTheme,
  handleSettingsToggle,
  handleSearchToggle,
  handleListToggle,
  handleSettingsSubmit,
} from './handlers.js';

let page = 1;
let matches = books;

const initialPreviews = generatePreviews(matches, page);
html.main.list.appendChild(initialPreviews);

const searchGenres = generateGenreHtml(genres);
html.search.genres.appendChild(searchGenres);

const searchAuthors = generateAuthorHtml(authors);
html.search.authors.appendChild(searchAuthors);

const preferredTheme =
  window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day';
setTheme(preferredTheme);

let remainingResults =
  matches.length - page * BOOKS_PER_PAGE > 0 ? matches.length - page * BOOKS_PER_PAGE : 0;
generateShowMoreButton(remainingResults);

html.main.settings.addEventListener('click', handleSettingsToggle);
html.settings.cancel.addEventListener('click', handleSettingsToggle);

html.main.search.addEventListener('click', handleSearchToggle);
html.search.cancel.addEventListener('click', handleSearchToggle);
html.search.form.addEventListener('submit', handleSearchToggle);

html.main.list.addEventListener('click', handleListToggle);
html.list.close.addEventListener('click', handleListToggle);

html.settings.form.addEventListener('submit', handleSettingsSubmit);

/**
 * A function that creates an object from the search form submission results and assigns it to
 * {@link filters}. It then uses filters as a parameter for {@link generateSearchResults} and assigns
 * it's return value as {@link searchResult} which is then used in {@link generatePreviewHtml} to generate
 * preview html to be appended to the page.
 */
const handleSearchSubmit = (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const filters = Object.fromEntries(formData);
  const searchResult = generateSearchResults(filters);

  if (searchResult.length < 1) {
    html.list.message.classList.add('list__message_show');
  } else html.list.message.classList.remove('list__message_show');

  html.main.list.innerHTML = '';
  html.main.list.appendChild(generatePreviews(searchResult, 1));
  window.scrollTo({ top: 0, behavior: 'smooth' });
  matches = searchResult;
  page = 1;
  console.log(matches);
  remainingResults =
    matches.length - page * BOOKS_PER_PAGE > 0 ? matches.length - page * BOOKS_PER_PAGE : 0;
  generateShowMoreButton(remainingResults);
};
html.search.form.addEventListener('submit', handleSearchSubmit);

/**
 * When "Show More" button is clicked it will append the relevant book previews taken from whichever
 * object is assigned to {@link matches} (either {@link books} or {@link searchResult})
 * It also increases the value of {@link page} by 1 for use in slice calculations
 */
const handleListButton = (event) => {
  page = page + 1;
  html.main.list.appendChild(generatePreviews(matches, page));
  remainingResults =
    matches.length - page * BOOKS_PER_PAGE > 0 ? matches.length - page * BOOKS_PER_PAGE : 0;
  generateShowMoreButton(remainingResults);
};
html.list.button.addEventListener('click', handleListButton);

document.querySelector('[data-list-items]').addEventListener('click', (event) => {
  const pathArray = Array.from(event.path || event.composedPath());
  let active = null;

  for (const node of pathArray) {
    if (active) break;

    if (node?.dataset?.preview) {
      let result = null;

      for (const singleBook of books) {
        if (result) break;
        if (singleBook.id === node?.dataset?.preview) result = singleBook;
      }

      active = result;
    }
  }

  if (active) {
    document.querySelector('[data-list-active]').open = true;
    document.querySelector('[data-list-blur]').src = active.image;
    document.querySelector('[data-list-image]').src = active.image;
    document.querySelector('[data-list-title]').innerText = active.title;
    document.querySelector('[data-list-subtitle]').innerText = `${
      authors[active.author]
    } (${new Date(active.published).getFullYear()})`;
    document.querySelector('[data-list-description]').innerText = active.description;
  }
});
