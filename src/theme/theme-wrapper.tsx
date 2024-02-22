import type { ReactNode } from 'react';
import { createContext, useEffect, useMemo, useState } from 'react';
import { useTheme, ThemeProvider as NextThemesProvider } from 'next-themes';
import { cn } from '@/lib/utils';

// Helper
import { findColor } from '../helpers/theme-wrapper';

// Constant
import { ThemeColorVariables, themes } from '@/constants/theme';

const INITIAL_THEME_CONFIGURATIONS = {
  ATTRIBUTES: 'class',
  DEFAULT_THEMES: 'system',
  INITIAL_CONFIG_THEME_COLOR: themes[0],
};

export enum NameTheme {
  Zinc = 'zinc',
  Slate = 'slate',
  Stone = 'stone',
  Gray = 'gray',
  Neutral = 'neutral',
  Red = 'red',
  Rose = 'rose',
  Orange = 'orange',
  Green = 'green',
  Blue = 'blue',
  Yellow = 'yellow',
  Violet = 'violet',
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <h1>...loading</h1>;
  }

  return (
    <NextThemesProvider
      attribute={INITIAL_THEME_CONFIGURATIONS.ATTRIBUTES}
      enableSystem
      defaultTheme={INITIAL_THEME_CONFIGURATIONS.DEFAULT_THEMES}
    >
      {isMounted ? <ThemeColorProvider>{children}</ThemeColorProvider> : <p>...Loading</p>}
    </NextThemesProvider>
  );
}

export const ThemeColorContext = createContext<{
  configThemeColor: string;
  handleSetConfigThemeColor: (name: NameTheme) => void;
}>({
  configThemeColor: 'zinc',
  handleSetConfigThemeColor: (name: NameTheme) => undefined,
});

const ThemeColorProvider = ({ children }: { children: ReactNode }) => {
  const { resolvedTheme: mode } = useTheme();

  const currentTheme = mode === 'dark' ? 'dark' : 'light';
  const [configThemeColor, setConfigThemeColor] = useState<string>(NameTheme.Zinc);
  const themeColor = findColor(configThemeColor);

  const handleSetConfigThemeColor = (name: NameTheme) => {
    setConfigThemeColor(name);
  };

  const prefixedCssVars = useMemo(() => {
    const defaultValueThemeLight = themes[0].cssVars.light;

    if (!currentTheme) {
      return defaultValueThemeLight;
    }

    if (themeColor) {
      return Object.keys(themeColor.cssVars[currentTheme]).reduce((result: Record<string, string>, key) => {
        const value = themeColor.cssVars[currentTheme][key as keyof ThemeColorVariables];
        result[`--${key}`] = value !== undefined ? `${value}` : '';

        return result;
      }, {});
    }

    return {};
  }, [currentTheme, themeColor]);

  const style = {
    ...prefixedCssVars,
    '--radius': `${
      INITIAL_THEME_CONFIGURATIONS.INITIAL_CONFIG_THEME_COLOR.name ? '0.5' : themeColor?.cssVars.light.radius
    }rem`,
  } as unknown as React.CSSProperties;

  return (
    <ThemeColorContext.Provider value={{ configThemeColor, handleSetConfigThemeColor }}>
      <div className={cn(`theme-${configThemeColor || configThemeColor}`, 'w-full')} style={style}>
        {children}
      </div>
    </ThemeColorContext.Provider>
  );
};
