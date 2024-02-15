import { html } from './scripts.js';

/** Toggles the settings overlay either open or closed */
export const handleSettingsToggle = (event) => {
  if (html.settings.overlay.open) {
    html.settings.overlay.close();
  } else html.settings.overlay.showModal();
  html.settings.theme.focus();
};

/**
 * @param {String} theme - Only accepts "day" or "night"
 */
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

/**
 * Changes the theme according to the result of the settings form submission
 */
export const handleSettingsSubmit = (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const result = Object.fromEntries(formData);
  setTheme(result.theme);
  html.settings.overlay.close();
};
