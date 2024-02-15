import { books, authors, BOOKS_PER_PAGE } from './data.js';
import { html } from './scripts.js';

/** Toggles the book preview overlay either open or closed */
export const handlePreviewToggle = (event) => {
  if (event.target.className === 'list__items') return;
  if (html.list.active.open) {
    html.list.active.close();
  } else html.list.active.showModal();
};

/**
 * Function that creates and returns and HTML fragment containing button elements.
 * These elements are populated with data relevant to each book.
 *
 * @param {Object} targetObject - Accepts any object literal that
 * contains book information.
 *
 * @param {Number} page - Accepts any number. This number dictates where
 * slicing occurs to display the next 36 (or remaining number) of books in
 * the {@link targetObject}
 *
 * @returns {DocumentFragment} previewFragment - Returns the newly created document
 * fragment which can then be appended to the page.
 * **/
export const generatePreviews = (targetObject, page) => {
  const previewFragment = document.createDocumentFragment();
  const rangeStart = (page - 1) * BOOKS_PER_PAGE;
  const rangeEnd = page * BOOKS_PER_PAGE;
  for (const { author, id, image, title } of targetObject.slice(rangeStart, rangeEnd)) {
    let element = document.createElement('button');
    element.classList.add('preview');
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
 * Generates data for the preview overlay by creating an array from the event path and then
 * searching through each node until the active node is found. It then checks if the active node
 * has a dataset of "preview", in which case it then searches through the {@link books} object for a
 * matching {@link id} and then inserts the data to the element.
 */
export const generatePreviewOverlayData = (event) => {
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

  html.list.blur.src = active.image;
  html.list.image.src = active.image;
  html.list.title.innerText = active.title;
  html.list.subtitle.innerText = `${authors[active.author]} (${new Date(
    active.published
  ).getFullYear()})`;
  html.list.description.innerText = active.description;
};
