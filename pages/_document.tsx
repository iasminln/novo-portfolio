import { Html, Head, Main, NextScript } from 'next/document';
import { useEffect } from 'react';

export function HideUtmParams() {
  useEffect(() => {
    const url = new URL(window.location.href);
    let changed = false;

    // remove apenas os parâmetros utm_
    for (const key of url.searchParams.keys()) {
      if (key.startsWith('utm_')) {
        url.searchParams.delete(key);
        changed = true;
      }
    }

    if (changed) {
      window.history.replaceState({}, document.title, url.pathname + url.search);
    }
  }, []);

  return null;
}

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head />
      <body>
        <HideUtmParams />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

