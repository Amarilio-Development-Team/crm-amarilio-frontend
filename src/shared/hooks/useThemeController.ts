import { useEffect } from 'react';
import { ThemeType, ThemeState } from '../types/theme.store.types';
import { useThemeStore } from '../stores/theme.store';

interface ThemeController {
  theme: ThemeType;
  handleChangeTheme: () => void;
}

export const useThemeController = (): ThemeController => {
  const theme = useThemeStore((state: ThemeState) => state.theme);

  const toggleTheme = useThemeStore((state: ThemeState) => state.toggleTheme);

  useEffect(() => {
    const bodyElement = document.getElementsByName('body')[0] || document.body;
    if (bodyElement) {
      bodyElement.setAttribute('data-theme', theme);
    }
  }, [theme]);

  return {
    theme,
    handleChangeTheme: toggleTheme,
  };
};
