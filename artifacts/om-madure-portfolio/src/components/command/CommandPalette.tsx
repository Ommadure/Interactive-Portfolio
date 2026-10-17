import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowUpRight, Command, Github, Moon, Sun } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UIContext } from '@/context/UIContext';
import { ThemeContext } from '@/context/ThemeContext';
import { projects } from '@/data/projects';
import { profile } from '@/data/profile';
import { features } from '@/config/features';
type Action = { title: string; detail: string; action?: () => void; href?: string };

/** Keyboard-operable command menu with focus management and live project links. */
export function CommandPalette() {
  const { commandOpen, dispatch } = useContext(UIContext)!;
  const { theme, toggle } = useContext(ThemeContext);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const actions = useMemo<Action[]>(() => [
    ...['top', 'about', 'skills', 'experience', 'projects', 'contact'].map(id => ({ title: `Go to ${id === 'top' ? 'home' : id}`, detail: 'Section', action: () => { if (location.pathname !== '/') navigate(`/#${id}`); else document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); dispatch({ type: 'command', value: false }); } })),
    ...projects.map(project => ({ title: project.title, detail: 'Project', action: () => { navigate(`/projects/${project.slug}`); dispatch({ type: 'command', value: false }); } })),
    ...projects.filter(project => project.links.live).map(project => ({ title: `Open ${project.title} live demo`, detail: 'External link', href: project.links.live })),
    { title: 'Toggle theme', detail: 'Appearance', action: toggle },
    { title: 'Portfolio source code', detail: 'GitHub', href: profile.sourceRepo },
    { title: 'GitHub profile', detail: 'External link', href: profile.social.github },
    { title: 'LinkedIn profile', detail: 'External link', href: profile.social.linkedin },
    { title: 'Email Om Madure', detail: 'Email', href: `mailto:${profile.email}` },
  ], [navigate, toggle, dispatch, location.pathname]);
  const filtered = useMemo(() => actions.filter(action => `${action.title} ${action.detail}`.toLowerCase().includes(query.toLowerCase())), [actions, query]);
  const filteredRef = useRef(filtered);
  const selectedRef = useRef(selected);
  filteredRef.current = filtered;
  selectedRef.current = selected;
  useEffect(() => {
    if (!commandOpen) return;
    const prior = document.activeElement as HTMLElement | null;
    input.current?.focus();
    const handler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') dispatch({ type: 'command', value: false });
      if (event.key === 'Tab') { event.preventDefault(); input.current?.focus(); }
      if (event.key === 'ArrowDown') { event.preventDefault(); setSelected(value => (value + 1) % Math.max(1, filteredRef.current.length)); }
      if (event.key === 'ArrowUp') { event.preventDefault(); setSelected(value => (value - 1 + Math.max(1, filteredRef.current.length)) % Math.max(1, filteredRef.current.length)); }
      if (event.key === 'Enter') { event.preventDefault(); const action = filteredRef.current[selectedRef.current]; action?.action?.(); if (action?.href) window.open(action.href, '_blank', 'noopener,noreferrer'); dispatch({ type: 'command', value: false }); }
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); dispatch({ type: 'command', value: false }); }
    };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', handler); document.body.style.overflow = ''; prior?.focus(); setQuery(''); setSelected(0); };
  }, [commandOpen, dispatch]);
  useEffect(() => {
    const handler = (event: KeyboardEvent) => { if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); dispatch({ type: 'command', value: !commandOpen }); } };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [commandOpen, dispatch]);
  if (!commandOpen || !features.enableCommandPalette) return null;
  return <div className="palette-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) dispatch({ type: 'command', value: false }); }}>
    <section className="command-dialog" role="dialog" aria-modal="true" aria-label="Command palette">
      <div className="command-search"><Command size={18} /><input ref={input} value={query} onChange={event => { setQuery(event.target.value); setSelected(0); }} placeholder="What would you like to find?" aria-label="Search commands" /><kbd>ESC</kbd></div>
      <p className="command-label">Navigate and open</p>
      <div className="command-list" role="listbox">{filtered.map((action, index) => <button role="option" aria-selected={index === selected} key={`${action.detail}-${action.title}`} className={`command-row ${index === selected ? 'is-selected' : ''}`} onMouseEnter={() => setSelected(index)} onClick={() => { action.action?.(); if (action.href) window.open(action.href, '_blank', 'noopener,noreferrer'); dispatch({ type: 'command', value: false }); }}>
        <span className="command-icon">{action.detail === 'GitHub' ? <Github size={16} /> : action.detail === 'Appearance' ? (theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />) : <ArrowUpRight size={16} />}</span><span>{action.title}</span><small>{action.detail}</small>
      </button>)}
      {!filtered.length && <p className="palette-empty">No matching commands.</p>}</div>
      <footer className="command-footer"><span><kbd>↑</kbd><kbd>↓</kbd> to navigate</span><span><kbd>↵</kbd> to select</span><span>⌘ K to close</span></footer>
    </section>
  </div>;
}
