//@ts-check
import { books, genres, authors } from './data.js';
import { generatePreviews, handlePreviewToggle, generatePreviewOverlayData } from './previews.js';
import {
  updateShowMoreButton,
  handleShowMoreButton,
  handleSearchToggle,
  handleSearchSubmit,
  generateGenreHtml,
  generateAuthorHtml,
} from './search.js';
import { handleSettingsToggle } from './settings.js';
import { setTheme, handleSettingsSubmit } from './settings.js';

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
 * Browser preferred theme is detected and theme is set accordingly via {@link setTheme}
 */
const preferredTheme =
  window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day';
setTheme(preferredTheme);

/**
 * Initial previews are generated using {@link generatePreviews} and then appended
 * to the page.
 */
const initialPreviews = generatePreviews(books, 1);
html.main.list?.appendChild(initialPreviews);

/**
 * Initial Genre list items are generated using {@link generateGenreHtml} and then appended
 * to the search <option> form.
 */
const searchGenres = generateGenreHtml(genres);
html.search.genres?.appendChild(searchGenres);

/**
 * Initial Genre list items are generated using {@link generateAuthorHtml} and then appended
 * to the search <option> form.
 */
const searchAuthors = generateAuthorHtml(authors);
html.search.authors?.appendChild(searchAuthors);

/**
 * The "Show More" button's inner html is updated to display the remaining books
 * from the current search.
 */
updateShowMoreButton();

// "Show More" Button EventListeners & handlers
html.list.button?.addEventListener('click', handleShowMoreButton);

// "Settings" Button EventListeners & handlers
html.main.settings?.addEventListener('click', handleSettingsToggle);
html.settings.cancel?.addEventListener('click', handleSettingsToggle);
html.settings.form?.addEventListener('submit', handleSettingsSubmit);

// "Search" Button EventListeners & handlers
html.main.search?.addEventListener('click', handleSearchToggle);
html.search.cancel?.addEventListener('click', handleSearchToggle);
html.search.form?.addEventListener('submit', handleSearchToggle);
html.search.form?.addEventListener('submit', handleSearchSubmit);

// "Preview" Button EventListeners & handlers
html.main.list?.addEventListener('click', handlePreviewToggle);
html.list.close?.addEventListener('click', handlePreviewToggle);
html.main.list?.addEventListener('click', generatePreviewOverlayData);
