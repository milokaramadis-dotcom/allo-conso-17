import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Menu, Search, Heart, Home, Star, Info, MessageSquare, User,
  X, ChevronRight, SlidersHorizontal, Sparkles, Package, ArrowLeft,
  Send, Instagram, ShieldCheck, CircleHelp, Check
} from "lucide-react";
import "./styles.css";

const products = [
  { id: 1, name: "Studio Hoodie", price: 64, category: "Vêtements", tag: "NOUVEAUTÉ", maker: "Atelier Nord", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=85", description: "Sweat-shirt confortable, coupe ample et finition premium." },
  { id: 2, name: "Sac Everyday", price: 48, category: "Accessoires", tag: "BEST-SELLER", maker: "Maison Studio", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=85", description: "Un sac pratique au design minimaliste pour tous les jours." },
  { id: 3, name: "Sneakers Mono", price: 89, category: "Chaussures", tag: "ÉDITION", maker: "Atelier Nord", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85", description: "Sneakers au profil épuré et aux détails contrastés." },
  { id: 4, name: "Casquette Classic", price: 29, category: "Accessoires", tag: "ESSENTIEL", maker: "Maison Studio", image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=900&q=85", description: "Casquette réglable, facile à associer au quotidien." },
  { id: 5, name: "Veste Utility", price: 112, category: "Vêtements", tag: "NOUVEAUTÉ", maker: "Collectif 02", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=900&q=85", description: "Veste polyvalente avec une silhouette structurée." },
  { id: 6, name: "Lunettes Frame", price: 55, category: "Accessoires", tag: "SÉLECTION", maker: "Collectif 02", image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=85", description: "Monture intemporelle et légère, pensée pour tous les jours." }
];

const categories = ["Tous les produits", "Vêtements", "Accessoires", "Chaussures"];
const tags = ["Tous", "NOUVEAUTÉ", "BEST-SELLER", "ESSENTIEL", "ÉDITION", "SÉLECTION"];
const makers = ["Tous", "Atelier Nord", "Maison Studio", "Collectif 02"];

function App() {
  const [page, setPage] = useState("Accueil");
  const [showSplash, setShowSplash] = useState(true);
  const [drawer, setDrawer] = useState(false);
  const [category, setCategory] = useState("Tous les produits");
  const [tag, setTag] = useState("Tous");
  const [maker, setMaker] = useState("Tous");
  const [query, setQuery] = useState("");
  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem("noir-favorites") || "[]"); } catch { return []; }
  });
  const [selected, setSelected] = useState(null);
  const [toast, setToast] = useState("");
  const [telegramUser, setTelegramUser] = useState(null);

  useEffect(() => {
    const splashTimer = window.setTimeout(() => setShowSplash(false), 2600);
    return () => window.clearTimeout(splashTimer);
  }, []);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (tg) {
      tg.ready();
      tg.expand();
      tg.setHeaderColor?.("#09090b");
      tg.setBackgroundColor?.("#09090b");
      setTelegramUser(tg.initDataUnsafe?.user || null);
    }
  }, []);

  useEffect(() => localStorage.setItem("noir-favorites", JSON.stringify(favorites)), [favorites]);

  const visibleProducts = useMemo(() => products.filter(p => {
    const matchesCategory = category === "Tous les produits" || p.category === category;
    const matchesTag = tag === "Tous" || p.tag === tag;
    const matchesMaker = maker === "Tous" || p.maker === maker;
    const matchesQuery = `${p.name} ${p.category} ${p.maker} ${p.tag}`.toLowerCase().includes(query.toLowerCase());
    const matchesPage = page !== "Favoris" || favorites.includes(p.id);
    return matchesCategory && matchesTag && matchesMaker && matchesQuery && matchesPage;
  }), [category, tag, maker, query, page, favorites]);

  const notify = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2100);
  };

  const toggleFavorite = (id) => {
    setFavorites(old => old.includes(id) ? old.filter(x => x !== id) : [...old, id]);
    notify(favorites.includes(id) ? "Retiré des favoris" : "Ajouté aux favoris");
  };

  const chooseCategory = (value) => {
    setCategory(value);
    setPage("Accueil");
    setDrawer(false);
  };

  const navItems = [
    { label: "Accueil", icon: Home },
    { label: "Avis", icon: Star },
    { label: "Infos", icon: Info },
    { label: "Contact", icon: MessageSquare },
    { label: "Profil", icon: User }
  ];

  return (
    <div className="app-shell">
      {showSplash && <div className="splash-screen" role="status" aria-label="Chargement de Allo Conso 17">
        <img src="/allo-conso-17.jpeg" alt="Allo Conso 17" className="splash-logo" />
        <div className="splash-caption">BIENVENUE CHEZ ALLO CONSO 17</div>
        <div className="splash-loader"><span /></div>
      </div>}
      <header className="topbar">
        <button className="icon-button menu-button" onClick={() => setDrawer(true)} aria-label="Ouvrir le menu"><Menu /></button>
        <button className="brand" onClick={() => setPage("Accueil")} aria-label="Accueil">
          <span className="brand-mark">ALLO <span>CONSO 17</span></span>
          <small>CATALOGUE / SÉLECTION</small>
        </button>
        <button className="icon-button search-shortcut" onClick={() => document.getElementById("catalog-search")?.focus()} aria-label="Rechercher"><Search /></button>
      </header>

      {page === "Accueil" || page === "Favoris" ? (
        <main className="main-content">
          <section className="hero">
            <div className="hero-kicker"><span className="live-dot" /> COLLECTION  /  2026</div>
            <h1>Le détail fait<br /><em>la différence.</em></h1>
            <p>Une sélection de pièces choisies avec soin.</p>
          </section>

          <div className="search-wrap">
            <Search size={18} />
            <input id="catalog-search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Rechercher dans le catalogue..." />
            {query && <button onClick={() => setQuery("")} aria-label="Effacer"><X size={17}/></button>}
          </div>

          <section className="filter-section">
            <div className="filter-line">
              <span className="filter-label">CATÉGORIES</span>
              <div className="chips">
                {categories.map(c => <button key={c} className={`chip ${category === c ? "active" : ""}`} onClick={() => chooseCategory(c)}>{c === "Tous les produits" ? "Tout" : c}</button>)}
              </div>
            </div>
            <div className="filter-line">
              <span className="filter-label">TAGS</span>
              <div className="chips">
                {tags.map(t => <button key={t} className={`chip ${tag === t ? "active" : ""}`} onClick={() => setTag(t)}>{t}</button>)}
              </div>
            </div>
            <div className="filter-line">
              <span className="filter-label">SÉLECTION</span>
              <div className="chips">
                {makers.map(m => <button key={m} className={`chip ${maker === m ? "active" : ""}`} onClick={() => setMaker(m)}>{m}</button>)}
              </div>
            </div>
          </section>

          <div className="section-heading">
            <div><span className="eyebrow">{page === "Favoris" ? "VOTRE SÉLECTION" : "À DÉCOUVRIR"}</span><h2>{page === "Favoris" ? "Mes favoris" : "Le catalogue"} <span>({visibleProducts.length})</span></h2></div>
            <button className="sort-button" onClick={() => {setCategory("Tous les produits");setTag("Tous");setMaker("Tous");setQuery("");}}><SlidersHorizontal size={16}/> Réinitialiser</button>
          </div>

          {visibleProducts.length ? <div className="product-grid">
            {visibleProducts.map(p => <article className="product-card" key={p.id}>
              <button className="product-image" onClick={() => setSelected(p)}>
                <img src={p.image} alt={p.name} loading="lazy" />
                <span className="image-tag">{p.tag}</span>
              </button>
              <button className={`favorite-button ${favorites.includes(p.id) ? "is-favorite" : ""}`} onClick={() => toggleFavorite(p.id)} aria-label="Ajouter aux favoris"><Heart size={18} fill={favorites.includes(p.id) ? "currentColor" : "none"}/></button>
              <button className="product-info" onClick={() => setSelected(p)}>
                <span className="product-name">{p.name}</span>
                <span className="product-meta">{p.category} <b>·</b> {p.maker}</span>
                <span className="product-price">{p.price.toFixed(2).replace(".", ",")} €</span>
              </button>
            </article>)}
          </div> : <div className="empty-state"><Package size={30}/><h3>Aucun résultat</h3><p>Essaie de modifier tes filtres ou ta recherche.</p></div>}
        </main>
      ) : <PageContent page={page} user={telegramUser} favorites={favorites.length} onHome={() => setPage("Accueil")} />}

      <nav className="bottom-nav">
        {navItems.map(({label, icon: Icon}) => <button key={label} className={page === label ? "selected" : ""} onClick={() => setPage(label)}><Icon size={20}/><span>{label}</span></button>)}
      </nav>

      {drawer && <div className="overlay" onClick={() => setDrawer(false)}>
        <aside className="drawer" onClick={e => e.stopPropagation()}>
          <div className="drawer-head"><div><span className="eyebrow">NAVIGATION</span><h2>Explorer</h2></div><button className="icon-button" onClick={() => setDrawer(false)}><X/></button></div>
          <button className="drawer-link" onClick={() => {setPage("Accueil");setDrawer(false)}}><Home/> Accueil <ChevronRight/></button>
          <button className="drawer-link" onClick={() => {setPage("Favoris");setDrawer(false)}}><Heart/> Mes favoris <span className="drawer-count">{favorites.length}</span></button>
          <div className="drawer-divider"/>
          <span className="eyebrow drawer-label">CATÉGORIES</span>
          {categories.map(c => <button className={`category-link ${category === c ? "current" : ""}`} key={c} onClick={() => chooseCategory(c)}>{c}<ChevronRight size={16}/></button>)}
          <div className="drawer-foot">ALLO CONSO 17 <span>© 2026</span></div>
        </aside>
      </div>}

      {selected && <div className="overlay modal-overlay" onClick={() => setSelected(null)}>
        <section className="product-modal" onClick={e => e.stopPropagation()}>
          <button className="modal-close icon-button" onClick={() => setSelected(null)}><X/></button>
          <img className="modal-image" src={selected.image} alt={selected.name}/>
          <div className="modal-content">
            <span className="eyebrow">{selected.tag} / {selected.category}</span>
            <h2>{selected.name}</h2>
            <p>{selected.description}</p>
            <div className="modal-bottom"><strong>{selected.price.toFixed(2).replace(".", ",")} €</strong><button className="primary-button" onClick={() => notify("Catalogue de démonstration : aucune commande n'est activée.")}>En savoir plus <ChevronRight size={17}/></button></div>
          </div>
        </section>
      </div>}

      {toast && <div className="toast"><Check size={16}/>{toast}</div>}
      <footer className="site-foot">ALLO CONSO 17 <span>CATALOGUE DE DÉMONSTRATION</span></footer>
    </div>
  );
}

function PageContent({ page, user, favorites, onHome }) {
  const content = {
    "Avis": { eyebrow: "LA COMMUNAUTÉ", title: "Avis & retours", text: "Les retours des visiteurs seront affichés ici lorsque cette section sera reliée à une source de données.", icon: Star },
    "Infos": { eyebrow: "À PROPOS", title: "Notre univers", text: "Un catalogue éditorial, une sélection soignée et une expérience simple, pensée d'abord pour le mobile.", icon: Sparkles },
    "Contact": { eyebrow: "RESTONS EN CONTACT", title: "Une question ?", text: "Configure ici ton adresse e-mail, ton compte Instagram ou ton canal Telegram officiel.", icon: MessageSquare },
    "Profil": { eyebrow: "ESPACE PERSONNEL", title: user ? `Bonjour ${user.first_name || " !"}` : "Votre espace", text: user ? "Connecté via Telegram. Les données de profil sont fournies par Telegram." : "Ouvre cette mini-app depuis Telegram pour afficher les informations de ton profil.", icon: User }
  }[page] || { title: page, text: "", icon: Info };
  const Icon = content.icon;
  return <main className="page-content">
    <div className="page-icon"><Icon size={27}/></div>
    <span className="eyebrow">{content.eyebrow}</span>
    <h1>{content.title}</h1>
    <p>{content.text}</p>
    {page === "Profil" && <div className="info-tile"><span>Favoris enregistrés</span><strong>{favorites}</strong></div>}
    {page === "Contact" && <div className="contact-actions"><a href="https://t.me/" target="_blank" rel="noreferrer"><Send size={17}/> Telegram</a><a href="mailto:contact@example.com"><MessageSquare size={17}/> E-mail à configurer</a></div>}
    <button className="primary-button page-home" onClick={onHome}>Retour au catalogue <ChevronRight size={17}/></button>
  </main>;
}

createRoot(document.getElementById("root")).render(<App/>);
