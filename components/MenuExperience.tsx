'use client';

import { useEffect, useMemo, useState } from 'react';
import { allMenuItems, menuCategories, menuItemCount } from '@/lib/menu';
import { getMenuPrice } from '@/lib/menu-prices';
import { dishImage } from '@/lib/dish-images';

const LOGO = 'https://raj-delight-three.vercel.app/grok_1789624913553.jpg';

const SIGNATURE = [
  ['Tandoori Paneer Tikka', 'Tandoori Station'],
  ['Paneer Butter Masala', 'Indian Main Course'],
  ['Dal Makhani (special)', 'Dal Delight'],
  ['Veg Hyderabadi Biryani (special)', 'Biryani'],
  ['Masala Dosa', 'South Indian'],
  ['Raj Delight Delux Thali', 'Special Thali'],
  ['Oreo Shake', 'Shake It Up'],
  ['Gulab Jamun (1 Pc)', 'Dessert'],
];

const QUICK = ['Paneer', 'Dosa', 'Shake', 'Momos', 'Pizza', 'Biryani', 'Dal', 'Thali'];

function Icon({ name }: { name: 'search' | 'sun' | 'moon' | 'close' | 'arrow' | 'grid' | 'list' | 'spark' | 'up' }) {
  const p = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {name === 'search' && (
        <>
          <circle {...p} cx="10.8" cy="10.8" r="6.1" />
          <path {...p} d="m15.5 15.5 4.2 4.2" />
        </>
      )}
      {name === 'sun' && (
        <>
          <circle {...p} cx="12" cy="12" r="3.5" />
          <path {...p} d="M12 2.4v2.2M12 19.4v2.2M2.4 12h2.2M19.4 12h2.2M5.3 5.3 6.9 6.9M17.1 17.1l1.6 1.6M18.7 5.3 17.1 6.9M6.9 17.1l-1.6 1.6" />
        </>
      )}
      {name === 'moon' && <path {...p} d="M19.4 14.6A7.8 7.8 0 0 1 9.4 4.6 8.1 8.1 0 1 0 19.4 14.6Z" />}
      {name === 'close' && <path {...p} d="m7 7 10 10M17 7 7 17" />}
      {name === 'arrow' && <path {...p} d="M5 19 19 5M9 5h10v10" />}
      {name === 'grid' && (
        <>
          <rect {...p} x="4" y="4" width="6" height="6" rx="1" />
          <rect {...p} x="14" y="4" width="6" height="6" rx="1" />
          <rect {...p} x="4" y="14" width="6" height="6" rx="1" />
          <rect {...p} x="14" y="14" width="6" height="6" rx="1" />
        </>
      )}
      {name === 'list' && <path {...p} d="M5 6h14M5 12h14M5 18h14" />}
      {name === 'spark' && <path {...p} d="M12 3.2 13.6 8.4 19 10 13.6 11.6 12 16.8 10.4 11.6 5 10 10.4 8.4Z" />}
      {name === 'up' && <path {...p} d="M12 19V5M6 11l6-6 6 6" />}
    </svg>
  );
}

function Price({ value }: { value: number | null }) {
  if (value === null) return <strong className="price price--empty">Ask</strong>;
  return <strong className="price">₹{value}</strong>;
}

function DishPhoto({ category, name, eager = false }: { category: string; name: string; eager?: boolean }) {
  const [src, setSrc] = useState(() => dishImage(category, name));
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <div className={`dishPhoto${ready ? ' is-ready' : ''}${failed ? ' is-plain' : ''}`}>
      {!failed && (
        <img
          src={src}
          alt={name}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setReady(true)}
          onError={() => {
            if (src !== dishImage('Fallback', name)) {
              setSrc(dishImage('Fallback', name));
              return;
            }
            setFailed(true);
          }}
        />
      )}
      <span className="dishPhoto__glow" />
    </div>
  );
}

function DishCard({ category, name, index }: { category: string; name: string; index: number }) {
  const price = getMenuPrice(category, name);
  return (
    <article className="dishCard" style={{ '--delay': `${Math.min(index, 10) * 35}ms` } as React.CSSProperties}>
      <DishPhoto category={category} name={name} />
      <div className="dishCard__body">
        <div className="dishCard__title">
          <small>{category}</small>
          <h3>{name}</h3>
        </div>
        <Price value={price} />
      </div>
    </article>
  );
}

export function MenuExperience() {
  const [intro, setIntro] = useState(true);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('raj-delight-menu-theme');
    if (saved === 'dark' || saved === 'light') setTheme(saved);
    else if (window.matchMedia('(prefers-color-scheme: dark)').matches) setTheme('dark');
    if (window.matchMedia('(max-width: 720px)').matches) setView('grid');
    const timer = window.setTimeout(() => setIntro(false), 2200);
    const onScroll = () => setShowTop(window.scrollY > 640);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('raj-delight-menu-theme', theme);
  }, [theme]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allMenuItems.filter((item) => {
      const categoryMatch = category === 'All' || item.category === category;
      const queryMatch = !q || (item.name + ' ' + item.category).toLowerCase().includes(q);
      return categoryMatch && queryMatch;
    });
  }, [query, category]);

  const categories = query.trim()
    ? menuCategories.filter((entry) => visible.some((item) => item.category === entry.name))
    : menuCategories;
  const shownCategories = showAllCategories || query.trim() ? categories : categories.slice(0, 10);
  const filtered = query.trim() || category !== 'All';
  const scrollToMenu = () => document.getElementById('menu-list')?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <>
      <div className={`intro ${intro ? 'intro--visible' : 'intro--gone'}`} aria-hidden={!intro}>
        <div className="intro__glow" />
        <div className="intro__orbs" aria-hidden="true">
          <i />+          <i />
          <i />
        </div>
        <div className="intro__seal">
          <img src={LOGO} alt="" />
        </div>
        <p className="intro__welcome">Welcome</p>
        <p className="intro__name">RAJ DELIGHT</p>
        <span>CHANDAUSI · VEGETARIAN RESTAURANT</span>
      </div>

      <main className="app">
        <header className="topbar">
          <button className="brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top">
            <img src={LOGO} alt="Raj Delight logo" />
            <span>
              <strong>Raj Delight</strong>
              <small>Chandausi · Vegetarian Menu</small>
            </span>
          </button>
          <div className="topbar__actions">
            <button
              className="iconButton"
              onClick={() => setTheme((v) => (v === 'light' ? 'dark' : 'light'))}
              aria-label={theme === 'light' ? 'Enable dark mode' : 'Enable light mode'}
            >
              <Icon name={theme === 'light' ? 'moon' : 'sun'} />
            </button>
            <button className="viewButton" onClick={() => setView((v) => (v === 'grid' ? 'list' : 'grid'))} aria-label="Toggle layout">
              <Icon name={view === 'grid' ? 'list' : 'grid'} />
              <span>{view === 'grid' ? 'List' : 'Grid'}</span>
            </button>
          </div>
        </header>

        <section className="hero">
          <div className="hero__copy">
            <p className="eyebrow">
              <Icon name="spark" /> The complete vegetarian menu
            </p>
            <h1>
              Flavours of
              <em> Raj Delight.</em>
            </h1>
            <p className="hero__meta">
              {menuItemCount} dishes · {menuCategories.length} categories · Chandausi
            </p>
          </div>
          <button className="scrollCard" onClick={scrollToMenu}>
            <span className="scrollCard__mark">₹</span>
            <span>
              <small>Open menu</small>
              <strong>Browse every dish</strong>
            </span>
            <Icon name="arrow" />
          </button>
        </section>

        <section className="signature" aria-label="Signature dishes">
          <div className="signature__head">
            <p>House favourites</p>
            <h2>Start with these.</h2>
          </div>
          <div className="signature__rail">
            {SIGNATURE.map(([name, cat], index) => {
              const price = getMenuPrice(cat, name);
              return (
                <button key={name} className="sigCard" onClick={() => setCategory(cat)} style={{ '--delay': `${index * 70}ms` } as React.CSSProperties}>
                  <DishPhoto category={cat} name={name} eager={index < 4} />
                  <div>
                    <small>{cat}</small>
                    <strong>{name}</strong>
                    <span>{price === null ? 'Ask in house' : `₹${price}`}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <section className="controls" aria-label="Menu filters">
          <label className="search">
            <Icon name="search" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search paneer, dosa, shake…" aria-label="Search dishes" />
            {query && (
              <button type="button" className="searchClear" onClick={() => setQuery('')} aria-label="Clear search">
                <Icon name="close" />
              </button>
            )}
          </label>
          <div className="quickSearch" aria-label="Popular searches">
            {QUICK.map((term) => (
              <button key={term} className={query.toLowerCase() === term.toLowerCase() ? 'quickChip is-on' : 'quickChip'} onClick={() => setQuery(term)}>
                {term}
              </button>
            ))}
          </div>
          <div className="categoryRail">
            <button className={category === 'All' ? 'chip chip--active' : 'chip'} onClick={() => setCategory('All')}>
              All <b>{menuItemCount}</b>
            </button>
            {shownCategories.map((entry) => (
              <button key={entry.name} className={category === entry.name ? 'chip chip--active' : 'chip'} onClick={() => setCategory(entry.name)}>
                {entry.name} <b>{entry.items.length}</b>
              </button>
            ))}
            {categories.length > 10 && !query.trim() && (
              <button className="chip chip--more" onClick={() => setShowAllCategories((v) => !v)}>
                {showAllCategories ? 'Show less' : `+${categories.length - 10} more`}
              </button>
            )}
          </div>
          <div className="controls__meta">
            <span>{visible.length} dishes shown</span>
            <span>Prices in ₹ · veg kitchen</span>
          </div>
        </section>

        <section id="menu-list" className={`menuList menuList--${view}`}>
          {filtered ? (
            <div className="filtered">
              {visible.map((item, index) => (
                <DishCard key={`${item.category}-${item.name}`} category={item.category} name={item.name} index={index} />
              ))}
            </div>
          ) : (
            menuCategories.map((entry, categoryIndex) => (
              <section className="categorySection" key={entry.name}>
                <div className="categoryHead">
                  <div>
                    <span>{String(categoryIndex + 1).padStart(2, '0')}</span>
                    <div>
                      <p>{entry.items.length} dishes</p>
                      <h2>{entry.name}</h2>
                    </div>
                  </div>
                  <button onClick={() => setCategory(entry.name)}>
                    View all <Icon name="arrow" />
                  </button>
                </div>
                <div className="dishGrid">
                  {entry.items.map((name, index) => (
                    <DishCard key={`${entry.name}-${name}`} category={entry.name} name={name} index={index} />
                  ))}
                </div>
              </section>
            ))
          )}
        </section>

        {visible.length === 0 && (
          <div className="empty">
            <strong>No dishes found.</strong>
            <p>Try another name or reset the filters.</p>
            <button
              onClick={() => {
                setQuery('');
                setCategory('All');
              }}
            >
              Reset menu
            </button>
          </div>
        )}

        <footer className="footer">
          <img src={LOGO} alt="Raj Delight logo" />
          <div>
            <strong>Raj Delight</strong>
            <small>Complete vegetarian menu · Chandausi</small>
          </div>
          <span>© {new Date().getFullYear()} Raj Delight</span>
        </footer>
      </main>

      <button
        className={`toTop${showTop ? ' is-on' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
      >
        <Icon name="up" />
      </button>
    </>
  );
}

