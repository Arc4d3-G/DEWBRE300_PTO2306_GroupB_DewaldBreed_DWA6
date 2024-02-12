import { authors, BOOKS_PER_PAGE, books, genres } from './data.js';

/**
 * An object literal containing query-selectors of the relevant HTML elements
 */
export const html = {
  search: {
    overlay: document.querySelector('[data-search-overlay]'),
    form: document.querySelector('[data-search-form]'),
    title: document.querySelector('[data-search-title]'),
    cancel: document.querySelector('[data-search-cancel]'),
    genres: document.querySelector('[data-search-genres'),
    authors: document.querySelector('[data-search-authors'),
  },
  settings: {
    overlay: document.querySelector('[data-settings-overlay]'),
    form: document.querySelector('[data-settings-form]'),
    theme: document.querySelector('[data-settings-theme]'),
    cancel: document.querySelector('[data-settings-cancel]'),
  },
  list: {
    button: document.querySelector('[data-list-button]'),
    message: document.querySelector('[data-list-message]'),
    active: document.querySelector('[data-list-active]'),
    blur: document.querySelector('[data-list-blur]'),
    image: document.querySelector('[data-list-image]'),
    title: document.querySelector('[data-list-title]'),
    subtitle: document.querySelector('[data-list-subtitle]'),
    description: document.querySelector('[data-list-description]'),
    close: document.querySelector('[data-list-close]'),
  },
  main: {
    search: document.querySelector('[data-header-search]'),
    settings: document.querySelector('[data-header-settings]'),
    list: document.querySelector('[data-list-items]'),
  },
};

/**
 * Function that creates and returns and HTML fragment containing book
 *  preview elements.
 *
 * @param {Object} targetObject - Accepts any object literal that
 * contains book information.
 *
 * @param {Number} page - Accepts any number. This number dictates where
 * slicing occurs to display the next 36 (or remaining number) of books in
 * the {@link targetObject}
 *
 * @returns {DocumentFragment} previewFragment - Returns the newly created document
 * fragment which can then be appended to the list element.
 * **/
export const generatePreviews = (targetObject, page) => {
  const previewFragment = document.createDocumentFragment();
  const RANGE_START = (page - 1) * BOOKS_PER_PAGE;
  const RANGE_END = page * BOOKS_PER_PAGE;
  for (const { author, id, image, title } of targetObject.slice(RANGE_START, RANGE_END)) {
    const element = document.createElement('button');
    element.classList = 'preview';
    element.setAttribute('data-preview', id);

    element.innerHTML = `
              <img
                  class="preview__image"
                  src="${image}"
              />
              
              <div class="preview__info">
                  <h3 class="preview__title">${title}</h3>
                  <div class="preview__author">${authors[author]}</div>
              </div>
          `;

    previewFragment.appendChild(element);
  }
  return previewFragment;
};

/**
 * A function that generates a list of genres as <option> elements
 *
 * @param {Object} targetObject - accepts any object containing genre data.
 *
 * @returns {DocumentFragment} genreFragment - Returns the newly created document fragment to be appended.
 */
export const generateGenreHtml = (targetObject) => {
  const genreFragment = document.createDocumentFragment();
  const firstGenreElement = document.createElement('option');
  firstGenreElement.value = 'any';
  firstGenreElement.innerText = 'All Genres';
  genreFragment.appendChild(firstGenreElement);

  for (let [id, name] of Object.entries(targetObject)) {
    const element = document.createElement('option');
    element.value = id;
    element.innerText = name;
    genreFragment.appendChild(element);
  }
  return genreFragment;
};

/**
 * A function that generates a list of Authors as <option> elements.
 *
 * @param {Object} targetObject - accepts any object containing Author data.
 *
 * @returns {DocumentFragment} authorFragment - Returns the newly created document fragment to be appended.
 */
export const generateAuthorHtml = (targetObject) => {
  const authorsFragment = document.createDocumentFragment();
  const authorsElement = document.createElement('option');
  authorsElement.value = 'any';
  authorsElement.innerText = 'All Authors';
  authorsFragment.appendChild(authorsElement);

  for (let [id, name] of Object.entries(targetObject)) {
    const element = document.createElement('option');
    element.value = id;
    element.innerText = name;
    authorsFragment.appendChild(element);
  }
  return authorsFragment;
};

export const generateShowMoreButton = (remaining) => {
  html.list.button.innerText = `Show more (${remaining})`;
  html.list.button.disabled = !(remaining > 0);
};

/**
 * A function that creates and returns an object consisting of all the {@link singleBook} of {@link books}
 * which match the search parameters.
 *
 * @param {Object} filters - This accepts an object containing data from the search form,
 * defined as {@link filters} by {@link handleSearchSubmit} in scripts.js
 *
 * @returns {Object} result - This is used by {@link handleSearchSubmit} to define {@link searchResult}
 * in scripts.js
 */
export const generateSearchResults = (filters) => {
  let result = [];
  filters.title = filters.title.trim();
  for (const singleBook of books) {
    const titleMatch =
      filters.title === '' || singleBook.title.toLowerCase().includes(filters.title.toLowerCase());
    const authorMatch = filters.author === 'any' || singleBook.author === filters.author;
    let genreMatch = filters.genre === 'any';

    for (const singleGenre of singleBook.genres) {
      if (genres[singleGenre] === genres[filters.genre]) {
        genreMatch = true;
      }
    }
    if (titleMatch && authorMatch && genreMatch) {
      result.push(singleBook);
    }
  }

  return result;
};
