export type ThemeType = 'fantasy' | 'business';

export interface ThemeState {
  theme: ThemeType;
  toggleTheme: () => void;
  setTheme: (theme: ThemeType) => void;
}
