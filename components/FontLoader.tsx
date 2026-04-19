'use client';

import { useEffect } from 'react';

interface FontConfig {
  type: string;
  family: string;
  url: string;
}

function applyFont(fontConfig: FontConfig, cssVar: string, internalName: string) {
  if (!fontConfig) return;

  if (fontConfig.type === 'upload' && fontConfig.url) {
    const existing = document.getElementById(`font-face-${internalName}`);
    if (!existing) {
      const style = document.createElement('style');
      style.id = `font-face-${internalName}`;
      style.textContent = `@font-face { font-family: '${internalName}'; src: url('${fontConfig.url}'); font-display: swap; }`;
      document.head.appendChild(style);
    }
    document.documentElement.style.setProperty(cssVar, `'${internalName}', system-ui, sans-serif`);
  } else if (fontConfig.type === 'google' && fontConfig.family) {
    const encoded = fontConfig.family.replace(/ /g, '+');
    const href = `https://fonts.googleapis.com/css2?family=${encoded}:wght@300;400;500;600;700;800&display=swap`;
    const existing = document.querySelector(`link[href="${href}"]`);
    if (!existing) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      document.head.appendChild(link);
    }
    document.documentElement.style.setProperty(cssVar, `'${fontConfig.family}', system-ui, sans-serif`);
  }
  // 'system' type: clear override so the next/font fallback takes over
  else if (fontConfig.type === 'system') {
    document.documentElement.style.removeProperty(cssVar);
  }
}

export function FontLoader({
  logoFont,
  bodyFont,
}: {
  logoFont: FontConfig;
  bodyFont: FontConfig;
}) {
  useEffect(() => {
    applyFont(bodyFont, '--font-body-dynamic', 'CustomBodyFont');
    applyFont(logoFont, '--font-logo-dynamic', 'CustomLogoFont');
  }, [bodyFont.family, bodyFont.type, bodyFont.url, logoFont.family, logoFont.type, logoFont.url]);

  return null;
}
