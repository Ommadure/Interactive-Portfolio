import { useContext, useEffect, useRef, useState } from 'react';
import { Command, Github, Menu, Moon, Sun, X } from 'lucide-react';
import { ThemeContext } from '@/context/ThemeContext';
import { UIContext } from '@/context/UIContext';
import { profile } from '@/data/profile';
import { getInitials, sectionIds } from '@/utils/format';
import { useLocation } from 'react-router-dom';
import { features } from '@/config/features';

/** Responsive sticky site navigation, including performance and palette controls. */
export function Navbar() {
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState('top');
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const previousScroll = useRef(0);
  const location = useLocation();
  const { theme, toggle } = useContext(ThemeContext);
  const ui = useContext(UIContext)!;
  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      setScrolled(current > 30);
      if (current > previousScroll.current + 8 && current > 100) setHidden(true);
      else if (current < previousScroll.current - 5) setHidden(false);
      previousScroll.current = current;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) setActive(entry.target.id);
    }), { rootMargin: '-35% 0px -55% 0px' });
    const observed = new Set<Element>();
    const syncSections = () => sectionIds.forEach(id => {
      const node = document.getElementById(id);
      if (node && !observed.has(node)) { observer.observe(node); observed.add(node); }
    });
    syncSections();
    const mutations = new MutationObserver(syncSections);
    mutations.observe(document.body, { childList: true, subtree: true });
    return () => { window.removeEventListener('scroll', onScroll); observer.disconnect(); mutations.disconnect(); };
  }, []);
  useEffect(() => {
    if (!menu) return;
    const prior = document.activeElement as HTMLElement | null;
    const closeOnEscape = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenu(false); };
    const trapFocus = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;
      const items = Array.from(document.querySelectorAll<HTMLElement>('.mobile-drawer a[href], .mobile-drawer button:not([disabled])'));
      if (!items.length) return;
      const first = items[0]; const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', closeOnEscape);
    document.addEventListener('keydown', trapFocus);
    document.body.style.overflow = 'hidden';
    document.querySelector<HTMLElement>('.mobile-drawer button')?.focus();
    return () => { document.removeEventListener('keydown', closeOnEscape); document.removeEventListener('keydown', trapFocus); document.body.style.overflow = ''; prior?.focus(); };
  }, [menu]);
  const navItems = sectionIds.map(id => ({ id, label: id === 'top' ? 'Home' : id[0].toUpperCase() + id.slice(1), href: location.pathname === '/' ? `#${id}` : `/#${id}` }));
  const openPalette = () => ui.dispatch({ type: 'command', value: true });
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''} ${hidden ? 'is-hidden' : ''}`}>
      <nav className="nav shell" aria-label="Main navigation">
        <a href={location.pathname === '/' ? '#top' : '/#top'} className="brand" aria-label={`${profile.name}, home`}><span className="brand-mark">{getInitials(profile.name)}</span><span>{profile.name.split(' ')[0].toLowerCase()}<span className="brand-period">.</span></span></a>
        <div className="desktop-nav">{navItems.map(item => <a key={item.id} href={item.href} className={active === item.id ? 'active' : ''}>{item.label}</a>)}</div>
        <div className="nav-actions">
          {features.enableCommandPalette && <button className="icon-button palette-trigger" onClick={openPalette} aria-label="Open command palette"><Command size={16} /><kbd>⌘K</kbd></button>}
          <a className="nav-github" href={profile.sourceRepo} target="_blank" rel="noopener noreferrer" aria-label="View portfolio source code on GitHub (opens in a new tab)"><Github size={16} /></a>
          <button className="icon-button theme-toggle" onClick={toggle} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>{theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}</button>
          <button className={`performance-button ${ui.performanceMode ? 'selected' : ''}`} onClick={() => ui.dispatch({ type: 'performance' })} aria-pressed={ui.performanceMode} title="Turn off 3D and heavy effects"><span />Performance</button>
          <button className="icon-button mobile-menu-button" onClick={() => setMenu(true)} aria-label="Open navigation menu"><Menu size={20} /></button>
        </div>
      </nav>
    </header>
    {menu && <div className="drawer-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) setMenu(false); }}>
      <aside className="mobile-drawer" role="dialog" aria-modal="true" aria-label="Mobile navigation">
        <div className="drawer-top"><a className="brand" href={location.pathname === '/' ? '#top' : '/#top'} onClick={() => setMenu(false)}><span className="brand-mark">{getInitials(profile.name)}</span><span>{profile.name.split(' ')[0].toLowerCase()}<span className="brand-period">.</span></span></a><button className="icon-button" onClick={() => setMenu(false)} aria-label="Close navigation menu"><X size={20} /></button></div>
        {navItems.map((item, index) => <a key={item.id} href={item.href} onClick={() => setMenu(false)} className="drawer-link"><span>0{index + 1}</span>{item.label}</a>)}
        <button className="drawer-setting" onClick={() => ui.dispatch({ type: 'performance' })} aria-pressed={ui.performanceMode}><span className="performance-indicator" />{ui.performanceMode ? 'Performance mode on' : 'Performance mode off'}</button>
        <button className="drawer-setting" onClick={toggle}>{theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}Switch to {theme === 'dark' ? 'light' : 'dark'} theme</button>
        {features.enableCommandPalette && <button className="drawer-setting" onClick={() => { setMenu(false); openPalette(); }}><Command size={16} />Open command palette</button>}
      </aside>
    </div>}
  </>;
}
