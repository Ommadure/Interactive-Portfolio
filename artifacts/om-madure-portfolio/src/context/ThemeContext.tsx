import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
type Theme = 'dark' | 'light';
export const ThemeContext = createContext<{ theme: Theme; toggle: () => void }>({ theme: 'dark', toggle: () => undefined });
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('om-theme');
    return saved === 'light' || saved === 'dark' ? saved : matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  });
  useEffect(() => { document.documentElement.dataset.theme = theme; localStorage.setItem('om-theme', theme); }, [theme]);
  const toggle = useCallback(() => setTheme(value => value === 'dark' ? 'light' : 'dark'), []);
  const value = useMemo(() => ({ theme, toggle }), [theme, toggle]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
