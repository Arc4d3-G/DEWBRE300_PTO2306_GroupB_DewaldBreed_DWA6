import { html } from './generators.js';

export const setTheme = (theme) => {
  if (theme === 'night') {
    html.settings.theme.value = 'night';
    document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
    document.documentElement.style.setProperty('--color-light', '10, 10, 20');
  } else {
    html.settings.theme.value = 'day';
    document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
    document.documentElement.style.setProperty('--color-light', '255, 255, 255');
  }
};

/** Toggles the settings overlay either open or closed */
export const handleSettingsToggle = (event) => {
  if (html.settings.overlay.open) {
    html.settings.overlay.close();
  } else html.settings.overlay.showModal();
  html.settings.theme.focus();
};

/** Toggles the settings overlay either open or closed */
export const handleSearchToggle = (event) => {
  if (html.search.overlay.open) {
    html.search.overlay.close();
  } else html.search.overlay.showModal();
  html.search.title.focus();
};

/** Toggles the book preview overlay either open or closed */
export const handleListToggle = (event) => {
  if (event.target.className === 'list__items') return;
  if (html.list.active.open) {
    html.list.active.close();
  } else html.list.active.showModal();
};

/**
 * Changes the theme according to the result of the settings form <option> submission
 */
export const handleSettingsSubmit = (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const result = Object.fromEntries(formData);
  setTheme(result.theme);
  html.settings.overlay.close();
};
