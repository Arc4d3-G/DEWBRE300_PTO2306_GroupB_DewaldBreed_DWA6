import { books, authors, BOOKS_PER_PAGE } from './data.js';
import { getElement } from './scripts.js';

/** Toggles the book preview overlay either open or closed */
export const handlePreviewToggle = (event) => {
  const overlay = getElement('list-active');
  if (event.target.className === 'list__items') return;
  if (overlay.open) {
    overlay.close();
  } else overlay.showModal();
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
 *
 * @param {Array} nodeArray
 * @param {String} dataAttr
 * @returns {Element}
 */
export const getElementFromArray = (nodeArray, dataAttr) => {
  let result = null;
  for (const node of nodeArray) {
    if (node.dataset[dataAttr]) {
      result = node;
      break;
    }
  }
  return result;
};
/**
 * @param {Array} nodeArray - accepts any event path array
 * @returns {Object} active -  matching book object
 */
const setActiveBook = (previewId) => {
  let active = null;
  for (const singleBook of books) {
    if (singleBook.id === previewId) {
      active = singleBook;
      break;
    }
  }
  return active;
};

/**
 * Generates data for the preview overlay by creating an array from the event path and then
 * searching through each node until the active node is found. It then checks if the active node
 * has a dataset of "preview", in which case it then searches through the {@link books} object for a
 * matching {@link id} and then inserts the data to the element.
 */
export const generatePreviewOverlayData = (event) => {
  if (event.target.className === 'list__items') {
    return;
  } else {
    const pathArray = Array.from(event.path || event.composedPath());
    const activePreview = getElementFromArray(pathArray, 'preview');
    const previewId = activePreview.dataset.preview;
    const activeBook = setActiveBook(previewId);
    if (activeBook) {
      getElement('list-blur').src = activeBook.image;
      getElement('list-image').src = activeBook.image;
      getElement('list-title').innerText = activeBook.title;
      getElement('list-subtitle').innerText = `${authors[activeBook.author]} (${new Date(
        activeBook.published
      ).getFullYear()})`;
      getElement('list-description').innerText = activeBook.description;
    } else return;
  }
};
