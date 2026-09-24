'use client';

import { useEffect, useMemo, useState } from 'react';
import { allMenuItems, menuCategories, menuItemCount } from '@/lib/menu';
import { getMenuPrice } from '@/lib/menu-prices';

const LOGO = 'https://raj-delight-three.vercel.app/grok_1789624913553.jpg';

const imagePools: Record<string, string[]> = {
  'Warm & Cozy': [
    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=88',
    'https://images.unsplash.com/photo-1512568400610-62da28bc8a13?auto=format&fit=crop&w=900&q=88'
  ],
  'Shake It Up': [
    'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=900&q=88',
    'https://images.unsplash.com/photo-1553787499-6f7c7f8e2c40?auto=format&fit=crop&w=900&q=88'
  ],
  'Fizzy Mocktails': [
    'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=88',
    'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=900&q=88'
  ],
  'Soulful Soups': ['https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=88'],
  Lassi: ['https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=900&q=88'],
  'Tandoori Station': [
    'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=88',
    'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=900&q=88'
  ],
  'Indian Main Course': [
    'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=900&q=88',
    'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=900&q=88'
  ],
  'Dal Delight': ['https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=900&q=88'],
  Rice: ['https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=88'],
  Biryani: ['https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=900&q=88'],
  Raita: ['https://images.unsplash.com/photo-1628294895950-9805252327bc?auto=format&fit=crop&w=900&q=88'],
  Salad: ['https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=88'],
  'Indian Breads': [
    'https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=900&q=88',
    'https://images.unsplash.com/photo-1626132647523-66a20f2c0b6b?auto=format&fit=crop&w=900&q=88'
  ],
  Paratha: ['https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=900&q=88'],
  Papad: ['https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=900&q=88'],
  'Chinese Appetizers': ['https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=900&q=88'],
  Dumplings: ['https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?auto=format&fit=crop&w=900&q=88'],
  'Saucy Delights': ['https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=900&q=88'],
  'Chinese Cuisine': ['https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=900&q=88'],
  'Smokey Grills': ['https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=900&q=88'],
  Continental: ['https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=88'],
  'Garlic Breads': ['https://images.pexels.com/photos/1117862/pexels-photo-1117862.jpeg?auto=compress&cs=tinysrgb&w=1200'],
  'Delicious Burger': ['https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=88'],
  'Italian Pasta': ['https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=88'],
  Fries: ['https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=900&q=88'],
  Sandwich: ['https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=900&q=88'],
  'Special Thali': ['https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=900&q=88'],
  'South Indian': ['https://images.unsplash.com/photo-1630383249896-424e482c9f4b?auto=format&fit=crop&w=900&q=88'],
  'Street Smart': ['https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=900&q=88'],
  Dessert: ['https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=88'],
  'Variety Of Ice Cream': ['https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=900&q=88'],
  'Kitty Menu': ['https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=900&q=88'],
  'Navratri Food': ['https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=900&q=88'],
  Drinks: ['https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=900&q=88'],
};

const fallback = 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=900&q=80';

function imageFor(category: string, item: string, index: number) {
  // Keep curated category photography as a graceful fallback, but ask the image
  // service for the actual dish name first so every menu row gets a unique visual.
  const query = encodeURIComponent(`${item} ${category} vegetarian food`);
  return `https://loremflickr.com/900/700/${query}?lock=${index}`;
}

function Icon({name}:{name:'search'|'sun'|'moon'|'close'|'arrow'|'grid'|'list'}) {
  const p={fill:'none',stroke:'currentColor',strokeWidth:1.7,strokeLinecap:'round' as const,strokeLinejoin:'round' as const};
  return <svg viewBox="0 0 24 24" aria-hidden="true">
    {name==='search' && <><circle {...p} cx="10.8" cy="10.8" r="6.1"/><path {...p} d="m15.5 15.5 4.2 4.2"/></>}
    {name==='sun' && <><circle {...p} cx="12" cy="12" r="3.5"/><path {...p} d="M12 2.4v2.2M12 19.4v2.2M2.4 12h2.2M19.4 12h2.2M5.3 5.3 6.9 6.9M17.1 17.1l1.6 1.6M18.7 5.3 17.1 6.9M6.9 17.1l-1.6 1.6"/></>}
    {name==='moon' && <path {...p} d="M19.4 14.6A7.8 7.8 0 0 1 9.4 4.6 8.1 8.1 0 1 0 19.4 14.6Z"/>}
    {name==='close' && <path {...p} d="m7 7 10 10M17 7 7 17"/>}
    {name==='arrow' && <path {...p} d="M5 19 19 5M9 5h10v10"/>}
    {name==='grid' && <><rect {...p} x="4" y="4" width="6" height="6" rx="1"/><rect {...p} x="14" y="4" width="6" height="6" rx="1"/><rect {...p} x="4" y="14" width="6" height="6" rx="1"/><rect {...p} x="14" y="14" width="6" height="6" rx="1"/></>}
    {name==='list' && <><path {...p} d="M5 6h14M5 12h14M5 18h14"/></>}
  </svg>;
}

export function MenuExperience(){
  const [intro,setIntro]=useState(true);
  const [theme,setTheme]=useState<'light'|'dark'>('light');
  const [query,setQuery]=useState('');
  const [category,setCategory]=useState('All');
  const [view,setView]=useState<'grid'|'list'>('grid');
  const [showAllCategories,setShowAllCategories]=useState(false);

  useEffect(()=>{
    const saved=localStorage.getItem('raj-delight-menu-theme');
    if(saved==='dark'||saved==='light') setTheme(saved);
    else if(window.matchMedia('(prefers-color-scheme: dark)').matches) setTheme('dark');
    const timer=window.setTimeout(()=>setIntro(false),1800);
    return ()=>window.clearTimeout(timer);
  },[]);

  useEffect(()=>{
    document.documentElement.dataset.theme=theme;
    localStorage.setItem('raj-delight-menu-theme',theme);
  },[theme]);

  const visible=useMemo(()=>{
    const q=query.trim().toLowerCase();
    return allMenuItems.filter(item=>{
      const categoryMatch=category==='All'||item.category===category;
      const queryMatch=!q||(item.name+' '+item.category).toLowerCase().includes(q);
      return categoryMatch&&queryMatch;
    });
  },[query,category]);

  const categories=query.trim()
    ? menuCategories.filter(entry=>visible.some(item=>item.category===entry.name))
    : menuCategories;
  const shownCategories=showAllCategories||query.trim()?categories:categories.slice(0,11);
  const scrollToMenu=()=>document.getElementById('menu-list')?.scrollIntoView({behavior:'smooth',block:'start'});

  return <>
    <div className={`intro ${intro?'intro--visible':'intro--gone'}`} aria-hidden={!intro}>
      <div className="intro__glow"/>
      <div className="intro__seal"><img src={LOGO} alt=""/></div>
      <div className="intro__rule"/>
      <p>RAJ DELIGHT</p>
      <span>CHANDAUSI · VEGETARIAN RESTAURANT</span>
    </div>

    <main className="app">
      <header className="topbar">
        <button className="brand" onClick={()=>window.scrollTo({top:0,behavior:'smooth'})} aria-label="Back to top">
          <img src={LOGO} alt="Raj Delight logo"/>
          <span><strong>Raj Delight</strong><small>Chandausi · Vegetarian Menu</small></span>
        </button>
        <div className="topbar__actions">
          <button className="iconButton" onClick={()=>setTheme(v=>v==='light'?'dark':'light')} aria-label={theme==='light'?'Enable dark mode':'Enable light mode'} title={theme==='light'?'Dark mode':'Light mode'}>
            <Icon name={theme==='light'?'moon':'sun'}/>
          </button>
          <button className="viewButton" onClick={()=>setView(v=>v==='grid'?'list':'grid')} aria-label={view==='grid'?'Switch to list view':'Switch to grid view'}>
            <Icon name={view==='grid'?'list':'grid'}/><span>{view==='grid'?'List':'Grid'}</span>
          </button>
        </div>
      </header>

      <section className="menuIntro">
        <div className="menuIntro__copy">
          <p className="eyebrow">THE COMPLETE MENU</p>
          <h1>Everything on the <em>table.</em></h1>
          <p>{menuItemCount} dishes · {menuCategories.length} categories · vegetarian kitchen</p>
        </div>
        <button className="scrollCard" onClick={scrollToMenu}>
          <span className="scrollCard__mark">₹</span>
          <span><small>MENU BOOK</small><strong>Explore the complete menu</strong></span>
          <Icon name="arrow"/>
        </button>
      </section>

      <section className="controls" aria-label="Menu filters">
        <label className="search">
          <Icon name="search"/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search dishes or categories" aria-label="Search dishes or categories"/>
          {query&&<button type="button" className="searchClear" onClick={()=>setQuery('')} aria-label="Clear search"><Icon name="close"/></button>}
        </label>
        <div className="categoryRail">
          <button className={category==='All'?'chip chip--active':'chip'} onClick={()=>setCategory('All')}>All <b>{menuItemCount}</b></button>
          {shownCategories.map(entry=><button key={entry.name} className={category===entry.name?'chip chip--active':'chip'} onClick={()=>setCategory(entry.name)}>{entry.name} <b>{entry.items.length}</b></button>)}
          {categories.length>11&&!query.trim()&&<button className="chip chip--more" onClick={()=>setShowAllCategories(v=>!v)}>{showAllCategories?'Show less':`+{categories.length-11} more`}</button>}
        </div>
        <div className="controls__meta"><span>{visible.length} dishes shown</span><span>Prices shown in ₹</span></div>
      </section>

      <section id="menu-list" className={`menuList menuList--${view}`}>
        {query.trim()||category!=='All' ? (
          <div className="filtered">
            {visible.map((item,index)=>{
              const price=getMenuPrice(item.category,item.name);
              return <article className="dishCard" key={`${item.category}-${item.name}`}>
                <div className="dishCard__media"><img src={imageFor(item.category,item.name,index)} alt={item.name} loading="lazy" decoding="async" onError={(event) => {
  const target = event.currentTarget;
  if (target.dataset.fallbackApplied) return;
  target.dataset.fallbackApplied = 'true';
  target.src = fallback;
}}/><span>{item.category}</span></div>
                <div className="dishCard__body"><div><small>{item.category}</small><h2>{item.name}</h2></div><strong className="price">{price===null?'Price not listed':`₹${price}`}</strong></div>
              </article>;
            })}
          </div>
        ) : (
          menuCategories.map((entry,categoryIndex)=>(
            <section className="categorySection" key={entry.name}>
              <div className="categoryHead">
                <div><span>{String(categoryIndex+1).padStart(2,'0')}</span><div><p>{entry.items.length} dishes</p><h2>{entry.name}</h2></div></div>
                <button onClick={()=>setCategory(entry.name)}>Browse <Icon name="arrow"/></button>
              </div>
              <div className="dishGrid">
                {entry.items.map((name,index)=>{
                  const price=getMenuPrice(entry.name,name);
                  return <article className="dishCard" key={`${entry.name}-${name}`} style={{'--delay':`${Math.min(index,14)*18}ms`} as React.CSSProperties}>
                    <div className="dishCard__media"><img src={imageFor(entry.name,name,index)} alt={name} loading="lazy" decoding="async" onError={(event) => {
                      const target = event.currentTarget;
                      if (target.dataset.fallbackApplied) return;
                      target.dataset.fallbackApplied = 'true';
                      target.src = fallback;
                    }}/><span>{entry.name}</span></div>
                    <div className="dishCard__body"><h3>{name}</h3><strong className="price">{price===null?'Price not listed':`₹${price}`}</strong></div>
                  </article>;
                })}
              </div>
            </section>
          ))
        )}
      </section>

      {visible.length===0&&<div className="empty"><strong>No dishes found.</strong><p>Try another dish or category.</p><button onClick={()=>{setQuery('');setCategory('All')}}>Reset menu</button></div>}

      <footer className="footer"><img src={LOGO} alt="Raj Delight logo"/><div><strong>Raj Delight</strong><small>Complete vegetarian menu · Chandausi</small></div><span>© {new Date().getFullYear()} Raj Delight</span></footer>
    </main>
  </>;
}
