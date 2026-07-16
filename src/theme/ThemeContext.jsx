import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { ConfigProvider, theme as antdTheme } from 'antd';
import { DEFAULT_THEME, THEME_STORAGE_KEY, THEMES } from './themes';

const ThemeContext = createContext(null);

function loadGoogleFont(fontQuery) {
  const id = 'sckora-theme-font';
  let link = document.getElementById(id);
  if (!link) {
    link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }
  link.href = `https://fonts.googleapis.com/css2?family=${fontQuery}&display=swap`;
}

function applyCssVars(themeConfig) {
  const root = document.documentElement;
  const { token, custom } = themeConfig;
  root.style.setProperty('--sck-primary', token.colorPrimary);
  root.style.setProperty('--sck-bg', token.colorBgBase);
  root.style.setProperty('--sck-surface', custom.surface);
  root.style.setProperty('--sck-surface-muted', custom.surfaceMuted);
  root.style.setProperty('--sck-text', token.colorText);
  root.style.setProperty('--sck-text-secondary', token.colorTextSecondary);
  root.style.setProperty('--sck-border', token.colorBorder);
  root.style.setProperty('--sck-sidebar-bg', custom.sidebarBg);
  root.style.setProperty('--sck-sidebar-text', custom.sidebarText);
  root.style.setProperty('--sck-sidebar-active', custom.sidebarActive);
  root.style.setProperty('--sck-header-bg', custom.headerBg);
  root.style.setProperty('--sck-accent', custom.accent);
  root.style.setProperty('--sck-accent-soft', custom.accentSoft);
  root.style.setProperty('--sck-watermark', custom.watermark);
  root.style.setProperty('--sck-gradient', custom.gradient);
  root.style.setProperty('--sck-font', themeConfig.fontFamily);
  root.style.setProperty('--sck-radius', `${token.borderRadius}px`);
  root.dataset.theme = themeConfig.id;
  document.body.style.fontFamily = themeConfig.fontFamily;
  document.body.style.background = custom.gradient;
  document.body.style.color = token.colorText;
}

export function ThemeProvider({ children }) {
  const [themeId, setThemeId] = useState(() => {
    try {
      return localStorage.getItem(THEME_STORAGE_KEY) || DEFAULT_THEME;
    } catch {
      return DEFAULT_THEME;
    }
  });

  const themeConfig = THEMES[themeId] || THEMES[DEFAULT_THEME];

  useEffect(() => {
    loadGoogleFont(themeConfig.googleFont);
    applyCssVars(themeConfig);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, themeId);
    } catch {
      /* ignore */
    }
  }, [themeId, themeConfig]);

  const value = useMemo(
    () => ({
      themeId,
      theme: themeConfig,
      themes: THEMES,
      setTheme: (id) => {
        if (THEMES[id]) setThemeId(id);
      },
      chartPalette: themeConfig.custom.chartPalette,
    }),
    [themeId, themeConfig]
  );

  return (
    <ThemeContext.Provider value={value}>
      <ConfigProvider
        theme={{
          algorithm:
            themeConfig.algorithm === 'dark'
              ? antdTheme.darkAlgorithm
              : antdTheme.defaultAlgorithm,
          token: themeConfig.token,
          components: {
            Layout: {
              bodyBg: themeConfig.token.colorBgBase,
              headerBg: themeConfig.custom.headerBg,
              siderBg: themeConfig.custom.sidebarBg,
            },
            Card: {
              borderRadiusLG: themeConfig.token.borderRadius,
            },
            Menu: {
              darkItemBg: themeConfig.custom.sidebarBg,
              darkSubMenuItemBg: themeConfig.custom.sidebarBg,
              darkItemSelectedBg: themeConfig.custom.accentSoft,
              darkItemSelectedColor: '#fff',
            },
          },
        }}
      >
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
