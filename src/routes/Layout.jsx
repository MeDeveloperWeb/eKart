import { Link, Outlet } from 'react-router-dom';
import cart from '../assets/icons/shopping-cart.svg?react';
import sun from '../assets/icons/sun.svg?react';
import moon from '../assets/icons/moon.svg?react';
import shoppingStore from '../assets/icons/shopping-store.svg?react';
import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

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

  const [showHeader, setShowHeader] = useState(true);

  const scrollPos = useRef(0);

  useEffect(() => {
    function handleScroll() {
      const newScrollPos =
        window.pageYOffset || document.documentElement.scrollTop;
      const currScrollPos = scrollPos.current;

      scrollPos.current = newScrollPos;

      if (newScrollPos < currScrollPos) setShowHeader(true);
      else if (newScrollPos > currScrollPos) setShowHeader(false);
    }
    window.addEventListener('scroll', handleScroll, true);

    return () => window.removeEventListener('scroll', handleScroll, true);
  }, [scrollPos]);

  return (
    <div className="scroll box-border min-h-screen bg-gray-100 font-display text-slate-800 antialiased dark:bg-slate-950 dark:text-slate-300">
      <header
        className={`${showHeader ? 'sticky top-0' : ''} z-[1000] flex justify-between gap-4 bg-white bg-opacity-25 px-8 py-4 shadow-lg backdrop-blur-sm dark:bg-slate-950 dark:shadow-slate-200/40`}
      >
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
      <footer className="flex justify-center bg-bisque bg-opacity-50 px-8 py-28 text-yellow-950 dark:bg-yellow-950 dark:text-bisque">
        <p>Copyright Fashion-Kart since 2084 </p>
      </footer>
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

Layout.propTypes = {
  children: PropTypes.node
};
