export type Theme = 'light' | 'dark';

const THEME_KEY = 'online-zoo-theme';

export const getSavedTheme = (): Theme => {
  const savedTheme = localStorage.getItem(THEME_KEY);
  return savedTheme === 'dark' ? 'dark' : 'light';
};

export const applyTheme = (theme: Theme): void => {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_KEY, theme);
};

export const toggleTheme = (): Theme => {
  const currentTheme = getSavedTheme();
  const nextTheme: Theme = currentTheme === 'light' ? 'dark' : 'light';
  applyTheme(nextTheme);
  return nextTheme;
};

export const initTheme = (): void => {
  applyTheme(getSavedTheme());
};