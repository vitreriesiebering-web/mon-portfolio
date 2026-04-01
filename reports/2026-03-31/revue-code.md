# Revue de code complète — MonPortfolio

## Note globale : 7.9/10

Le projet est bien structuré pour un site statique sans framework. L'accessibilité est remarquablement soignée, la sécurité est solide (aucun `innerHTML`), et le système de design tokens CSS est cohérent. Les axes d'amélioration portent principalement sur la robustesse JS et quelques incohérences avec les conventions documentées.

---

## CRITIQUE (à corriger impérativement)

| # | Problème | Fichiers | Détail |
|---|----------|----------|--------|
| 1 | **Null-checks manquants sur les sélecteurs DOM** | `js/main.js:3-15, 32-55` | Le script est partagé entre 3 pages. Si `.navbar__toggle` ou `.theme-toggle` est absent, une `TypeError` bloque **tout** le JS (formulaire + animations inclus). Envelopper dans des guards `if (el)`. |
| 2 | **Emoji du theme-toggle non masqué** | `index.html:71`, `blog/index.html:70`, `blog/posts/*.html:72` | `<span class="theme-toggle__icon">` sans `aria-hidden="true"` — les lecteurs d'écran lisent "soleil" en doublon du `aria-label`. |
| 3 | **`meta theme-color` statique** | 3 fichiers HTML | Reste `#0a0a0a` même en mode clair. Utiliser deux `<meta>` avec `media="(prefers-color-scheme: ...)"` ou mettre à jour en JS. |

---

## IMPORTANT (à corriger rapidement)

| # | Problème | Domaine |
|---|----------|---------|
| 4 | **Lien LinkedIn factice** (`href="#"`, `aria-hidden`, `tabindex="-1"`) dans le footer des 3 pages — à retirer du DOM | HTML/A11y |
| 5 | **Approche desktop-first** (`max-width`) alors que le CLAUDE.md documente mobile-first (`min-width`) | CSS |
| 6 | **`#hero` utilise un sélecteur ID** — spécificité élevée, rupture de cohérence avec le reste en classes BEM | CSS |
| 7 | **Classes `.subtitle` et `.tagline` non-BEM** — devraient être `.hero__subtitle` / `.hero__tagline` | CSS/BEM |
| 8 | **`--color-muted` dark = `#a0a0a0`** alors que le CLAUDE.md documente `#888888` | CSS |
| 9 | **Variables `--color-link` et `--color-disabled` non documentées** et `--color-disabled` mal nommé (utilisé pour les titres h2, pas pour des éléments désactivés) | CSS |
| 10 | **Couleur d'erreur `#e74c3c` codée en dur** (2 occurrences) — seule couleur brute hors du système de variables | CSS |
| 11 | **Transition dupliquée sur `.project-card`** — la déclaration globale (l.163) est écrasée par la déclaration locale (l.481) | CSS/Perf |
| 12 | **Pas de fermeture du menu au clic extérieur** — Escape et clic sur lien gérés, mais pas le clic sur le contenu | JS/UX |
| 13 | **Message de succès jamais re-masqué** si le formulaire est soumis une deuxième fois | JS/UX |
| 14 | **Absence de données structurées JSON-LD** (`Person` sur index, `BlogPosting` sur les articles) | SEO |
| 15 | **`og:image` pointe vers un fichier inexistant** (`og-image.png` absent du repo) | SEO |
| 16 | **`aria-current="page"` incorrect** sur `blog/posts/mon-premier-article.html` — pointe sur "Blog" au lieu de l'article courant | A11y |
| 17 | **Pas de media queries pour `.article__content`** — `blockquote` et `code` peuvent déborder sur mobile | CSS |

---

## MINEUR (améliorations souhaitables)

| # | Problème | Domaine |
|---|----------|---------|
| 18 | Chargement bloquant de Google Fonts (`<link rel="stylesheet">`) — utiliser `media="print" onload` | Perf |
| 19 | `--color-link` non redéfini en mode clair (#999 sur fond blanc = contraste faible) | A11y |
| 20 | Pas de debounce sur la validation `input` du formulaire | JS/Perf |
| 21 | `role="alert"` sur les erreurs inline trop agressif — préférer `aria-live="polite"` | A11y |
| 22 | Valeur de thème non validée depuis `localStorage` (accepte toute chaîne) | JS |
| 23 | Magic numbers à variabiliser : `translateY(20px)` fade-in, `6.5px` hamburger, `-4px` card hover | CSS |
| 24 | `h3` sans `font-size` explicite (dépend du navigateur) | CSS |
| 25 | `.blog-header` devrait être `.blog__header` pour cohérence BEM | CSS |
| 26 | Format `article:published_time` sans timezone (ISO 8601 recommandé) | SEO |

---

## Points forts

- **Accessibilité** (9/10) : skip-link, `aria-expanded`, `aria-controls`, `aria-describedby`, gestion de l'Escape avec retour du focus, `sr-only`, `noscript` fallback
- **Sécurité** (9/10) : aucun `innerHTML`, `rel="noopener noreferrer"` systématique, validation native
- **IntersectionObserver** (10/10) : `unobserve()` après animation, threshold sensé, fallback noscript
- **Système de design tokens CSS** : palette quasi-complète, typographie cohérente, `clamp()` pour les titres
- **Thème toggle** : persistance `localStorage` + fallback `prefers-color-scheme`, CSS critique inliné anti-FOUC

---

## Top 3 des actions prioritaires

1. **Ajouter les null-checks dans `main.js`** — 2 lignes qui sécurisent tout le script
2. **Corriger `aria-hidden="true"` sur les emojis du theme-toggle** — sur les 3 fichiers HTML
3. **Remplacer `#hero` par `.hero` et BEMifier le hero** — supprime la seule rupture de cohérence BEM/spécificité
