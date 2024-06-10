import { Link, Outlet } from 'react-router-dom';
import cart from '../assets/icons/shopping-cart.svg?react';
import sun from '../assets/icons/sun.svg?react';
import moon from '../assets/icons/moon.svg?react';
import shoppingStore from '../assets/icons/shopping-store.svg?react';
import { useEffect, useState } from 'react';

export default function Layout({ children }) {
  const [darkTheme, setDarkTheme] = useState(isDarkThemeEnabled());

  if (darkTheme) {
    document.documentElement.classList.add('dark');
    storeThemePreference(darkTheme ? 'dark' : 'light');
  }

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
    document.documentElement.classList.toggle('dark');
    // state doesn't change instantly hence darkTheme will retain its value till render
    storeThemePreference(darkTheme ? 'light' : 'dark');
  };

  useEffect(() => {}, []);
  return (
    <div className="box-border min-h-screen font-display text-slate-800 antialiased dark:bg-slate-950 dark:text-slate-300">
      <header className="sticky top-0 z-[1000] flex justify-between gap-4 px-8 py-4 shadow-lg backdrop-blur-sm dark:shadow-slate-200/40">
        <Link to={'/'} className="font-logo text-3xl">
          Fashion-Kart
        </Link>
        <nav>
          <ul className="flex h-full items-center justify-evenly gap-8">
            <li>
              <button onClick={toggleTheme}>
                {darkTheme ? sun() : moon()}
              </button>
            </li>
            <li>
              <Link to={'/categories'}>{shoppingStore()}</Link>
            </li>
            <li>
              <Link to={'/cart'}>{cart()}</Link>
            </li>
          </ul>
        </nav>
      </header>
      {/* Renders children if provided or Outlet */}
      {children ?? <Outlet />}
    </div>
  );
}

function isDarkThemeEnabled() {
  if (
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
  )
    return true;
  return false;
}

function storeThemePreference(mode) {
  localStorage.theme = mode;
}
