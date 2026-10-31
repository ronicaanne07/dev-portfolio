"use client";

import { useSyncExternalStore } from "react";

export type Theme = "light" | "dark";

// Lets any component re-render when the page's data-theme attribute changes
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

export function useTheme(): Theme {
  return useSyncExternalStore(
    subscribe,
    () => (document.documentElement.dataset.theme === "light" ? "light" : "dark"),
    () => "dark" // what the server renders
  );
}

export function setTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem("theme", theme);
  } catch {
    // private browsing: the choice just won't be remembered
  }
}