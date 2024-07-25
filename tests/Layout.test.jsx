import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vitest } from 'vitest';
import Layout from '../src/routes/Layout';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vitest.fn().mockImplementation((query) => ({
    // automatic dark theme
    matches: true,
    media: query,
    onchange: null,
    addListener: vitest.fn(), // Deprecated
    removeListener: vitest.fn(), // Deprecated
    addEventListener: vitest.fn(),
    removeEventListener: vitest.fn(),
    dispatchEvent: vitest.fn()
  }))
});

describe('App Layout Header renders correctly', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    );
  });

  afterEach(() => {
    cleanup();
  });

  it('renders logo', () => {
    const logo = screen.getByLabelText('Logo');
    expect(logo.textContent).toMatch('Fashion-Kart');
  });

  it('logo links to homepage', () => {
    const logo = screen.getByLabelText('Logo');
    expect(logo).toHaveAttribute('href', '/');
  });

  it('renders all 3 nav items', () => {
    const nav = screen.getByLabelText('Nav Items');
    expect(nav.children).toHaveLength(3);
  });

  it('renders theme toggle button', () => {
    const nav = screen.getByLabelText('Nav Items');
    const themeToggler = screen.getByTestId('theme-toggler');

    expect(nav).toContainElement(themeToggler);
  });

  it('renders categories link correctly', () => {
    const nav = screen.getByLabelText('Nav Items');
    const categories = screen.getByLabelText(/Product Categories/i);

    expect(nav).toContainElement(categories);
    expect(categories).toHaveAttribute('href', '/categories');
  });

  it('renders cart link correctly', () => {
    const nav = screen.getByLabelText('Nav Items');
    const cart = screen.getByLabelText(/Shopping Cart/i);

    expect(nav).toContainElement(cart);
    expect(cart).toHaveAttribute('href', '/cart');
  });
});

describe('App Layout Footer renders correctly', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    );
  });

  afterEach(() => {
    cleanup();
  });

  it('renders footer correctly', () => {
    expect(screen.getByLabelText('footer')).toHaveTextContent(
      'Copyright Fashion-Kart since 2084'
    );
  });
});

describe('Theme toggling Works', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    );
  });

  afterEach(() => {
    cleanup();
  });

  it('detects dark theme from match media', () => {
    expect(document.documentElement).toHaveClass('dark');
  });

  it('switches from dark to light theme on toggle', async () => {
    const themeToggler = screen.getByTestId('theme-toggler');

    const user = userEvent.setup();

    await user.click(themeToggler);

    expect(document.documentElement).not.toHaveClass('dark');
  });

  it('switches from light to dark theme on toggle', async () => {
    const themeToggler = screen.getByTestId('theme-toggler');

    const user = userEvent.setup();

    await user.click(themeToggler);

    expect(document.documentElement).toHaveClass('dark');
  });
});
