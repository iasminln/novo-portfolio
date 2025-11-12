import { useEffect } from "react";

export default function HideUtmParams() {
  useEffect(() => {
    const url = new URL(window.location.href);
    let changed = false;

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