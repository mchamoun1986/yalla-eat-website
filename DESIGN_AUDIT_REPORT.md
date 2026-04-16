# Yalla Eat — Audit Design System v1.0

**Date** : 2026-04-16 · **Scope** : `03_YE/02_web/v4/*.html` + `blog/*.html` (31 pages)
**Référentiel** : [BRAND_GUIDELINES.md](BRAND_GUIDELINES.md)

> **TL;DR** — Le site a un bon socle ([style.css](style.css)) mais 2 pages dérivent fortement (index, mission) et 15+ pages contiennent des hex hardcodés. **Effort estimé : 3-5h pour tout uniformiser.**
>
> **Note** : `traiteur-menu.html` (fichier orphelin, jamais lié) a été archivé dans `03_YE/02_web/_archive/` et retiré de cet audit.

---

## Score global par page

| Page | Conformité | Priorité fix |
|---|---|---|
| [index.html](index.html) | 40 % | 🔴 Critique |
| [mission.html](mission.html) | 55 % | 🟠 Haute |
| [mentions-legales.html](mentions-legales.html) | 60 % | 🟠 Haute |
| [blog.html](blog.html) | 65 % | 🟡 Moyenne |
| [traiteur.html](traiteur.html) | 70 % | 🟡 Moyenne |
| [contact.html](contact.html) | 75 % | 🟡 Moyenne |
| [mezzebox.html](mezzebox.html) | 75 % | 🟡 Moyenne |
| [bowl.html](bowl.html) | 80 % | 🟢 Basse |
| [menu.html](menu.html) | 80 % | 🟢 Basse |
| [wrap-sandwich.html](wrap-sandwich.html) | 80 % | 🟢 Basse |
| [vegetarien-vegan.html](vegetarien-vegan.html) | 80 % | 🟢 Basse |
| [halal.html](halal.html) | 80 % | 🟢 Basse |
| [emporter.html](emporter.html), [livraison.html](livraison.html), [falafel-lyon.html](falafel-lyon.html), [dejeuner-lyon-9.html](dejeuner-lyon-9.html) | 82 % | 🟢 Basse (mêmes pattern d'inline styles) |
| `blog/*.html` (15 pages) | 85 % | 🟢 Basse |

---

## 🔴 Problèmes CRITIQUES (rupture d'identité visuelle)

### 1. [index.html](index.html) utilise un système de design PARALLÈLE

**Gravité** : CRITIQUE — la page d'accueil, la plus visible, n'utilise PAS le design system.

**Preuves** (lignes [70-78](index.html#L70-L78)) :
```css
--green-dark:#1a2e1a;        /* ≠ --green-d:#0d4f3d */
--green-mid:#2d5a27;         /* nouveau */
--green-bright:#3d8b37;      /* nouveau */
--green-light:#5ab348;       /* nouveau */
--orange:#f4a012;            /* ≠ --gold:#f9ad4d */
--orange-light:#f7b93e;      /* ≠ --gold-l:#fabd71 */
--cream:#faf8f3;             /* ≠ --cream:#fff9f2 */
--text-dark:#1a1a1a;         /* ≠ --black:#0a0a0a */
```

**Typo** : utilise `Playfair Display` en **NON-italic** comme fonte display pour H1/H2 sections (lignes [138,164,191,204,215,225,238](index.html)). **Viole** la règle "Playfair = italique uniquement".

**Conséquence** : un visiteur qui arrive sur l'accueil et clique vers `bowl.html` voit 2 sites différents (couleurs + typos).

**Action** :
- [ ] Supprimer bloc `<style>` custom
- [ ] Migrer vers `var(--green-d)`, `var(--gold)`, `var(--cream)`, `var(--black)`
- [ ] Remplacer H1/H2 Playfair par Poppins 900 + `<em>Playfair italic` sur mot accentué
- [ ] Garder nav dark (`.nav` sans `--light`) car c'est un hero plein écran

---

### 2. [mentions-legales.html](mentions-legales.html) — CTA nav en BLEU

**Gravité** : HAUTE — incohérence avec toutes les autres pages (CTA = gold).

**Preuve** (ligne 4, classe `.btn-cta`) :
```css
.btn-cta{background:var(--blue);color:#fff}
```

Toutes les autres pages : `.btn-cta` = `var(--gold)`. L'utilisateur perd le repère visuel du bouton "Commandez".

**Autres issues sur cette page** :
- Tag `<em>` dans "Mentions <em>légales</em>" : utilisé SANS italique Playfair (juste emphase)
- `.ml-pending` : couleur `#a06020` hardcodée — hors palette
- Gradient hero hardcodé : `#07362a`, `#041f18` au lieu de variables

**Action** :
- [ ] `.btn-cta` → `var(--gold)` avec `color:var(--black)` (convention brand)
- [ ] `.ml-pending` → `color:var(--gold-d)` (brun cohérent)
- [ ] Hero gradient → `linear-gradient(135deg, var(--green-d) 0%, #0a3d2e 100%)` (comme [style.css ligne 70](style.css#L70))

---

## 🟠 Problèmes HAUTE priorité

### 4. [mission.html](mission.html) — Playfair Display non-italic pour tous les titres

**Preuves** (lignes [60, 65, 72, 92](mission.html)) :
```css
.hero-title{font-family:'Playfair Display',serif;font-weight:800}
.section-title{font-family:'Playfair Display',serif;font-weight:800}
.value-title{font-family:'Playfair Display',serif;font-weight:800}
.cta-title{font-family:'Playfair Display',serif;font-weight:800}
```

**Mais** l'import de police ne demande QUE l'italic (`Playfair+Display:ital,wght@0,700;1,700`) — donc techniquement seul `700 italic` est chargé. Les titres en non-italique tombent sans doute en fallback serif. À vérifier dans le navigateur.

**Action** :
- [ ] Remplacer par Poppins 800-900 + `<em>` en Playfair italic gold (pattern standard)
- OU alternative : si on veut une page "plus éditoriale", accepter Playfair non-italic MAIS l'ajouter à l'import (`0,700;1,700`) et documenter comme exception.

### 5. [blog.html](blog.html) — Couleurs de catégories HORS palette

**Preuves** (lignes [66-72](blog.html#L66-L72)) :
```css
.cat-nutrition{background:#e8f4ff;color:#1a5aaa}    /* bleu */
.cat-healthy{background:#e5f7ee;color:#1a7a4a}     /* vert custom */
.cat-halal{background:#f3e8ff;color:#6b21a8}       /* 🚨 VIOLET */
.cat-vegetarien{background:#e5f7ee;color:#2d6a3f}  /* vert custom */
.cat-traiteur{background:#fff3e0;color:#c45e00}    /* orange custom */
.cat-coulisses{background:var(--peach);color:#8a5a2b}  /* brun */
```

**Le VIOLET (`#6b21a8`) sur halal** est particulièrement hors sujet : pas de violet dans la marque.

**Action** : utiliser la table normée de [BRAND_GUIDELINES.md § 5](BRAND_GUIDELINES.md#5-catégories-blog--palette-normée).

### 6. Chaque page REDÉFINIT `:root {--*}` (26 fichiers)

**Gravité** : moyenne/haute — maintenance fragile. Si on change `--gold` dans style.css, **aucune** page ne suivra.

**Pages concernées** : toutes sauf `index.html` (qui a son propre système) et `generate-icons.html`.

**Pire** : certaines pages OMETTENT des variables (`menu.html` omet `--peach`, `--gold-l`, `--green-m`, `--green-l`, `--peach-l`), ce qui casse les composants partagés qui en dépendent.

**Action** :
- [ ] Supprimer tous les `:root{--cream:#fff9f2;...}` des blocs `<style>` des pages
- [ ] Conserver uniquement dans [style.css](style.css) (source unique)

---

## 🟡 Problèmes MOYENS

### 7. Hex hardcodés dans `style="..."` inline (~100+ occurrences)

Patterns récurrents détectés dans `livraison.html`, `falafel-lyon.html`, `wrap-sandwich.html`, `emporter.html`, `dejeuner-lyon-9.html`, `halal.html`, `vegetarien-vegan.html`, `mission.html`, `traiteur.html`, `mezzebox.html`, blog posts :

| Hex inline | Variable CSS à utiliser |
|---|---|
| `color:#6e6e6e` | `var(--gray)` |
| `color:#0d4f3d` | `var(--green-d)` |
| `background:#effae5` | `var(--green-xl)` |
| `background:#fef3e5` | `var(--cream-d)` |
| `background:#fbe3d9` | `var(--peach-l)` |
| `color:#444` (mezzebox) | `var(--gray)` ou `#333` (matche article-body) |
| `background:#f0f0ff` (menu) | ❌ hors palette — à remplacer par `var(--cream-d)` ou `var(--green-xl)` |
| `background:#fff0e8` (menu) | ❌ hors palette — remplacer par `var(--peach)` |
| `background:#e8f4ff` (menu) | ❌ hors palette — remplacer par `var(--green-xl)` ou retirer |
| `color:#1a3a2a` (traiteur:240) | `var(--green-d)` |

**Script de migration suggéré** : [voir § Plan d'action](#plan-daction).

### 8. [menu.html](menu.html) — icônes catégorie avec fonds hors palette

**Preuves** (lignes [158, 211, 239, 270, 288, 336, 374, 407, 435](menu.html)) :
```html
<div class="menu-category-icon" style="background:#f0f0ff">...  <!-- bleu lavande HS -->
<div class="menu-category-icon" style="background:#fff0e8">...  <!-- saumon HS -->
<div class="menu-category-icon" style="background:#e8f4ff">...  <!-- bleu clair HS -->
```

**Action** : harmoniser avec `var(--green-xl)`, `var(--cream-d)`, `var(--peach)`, `var(--peach-l)` par rotation logique.

---

## 🟢 Problèmes MINEURS (détails de finition)

### 9. Blocs `<style>` dupliquant le reset CSS (26 pages)

Chaque page répète :
```css
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
body{font-family:Poppins,sans-serif;background:var(--cream);color:var(--black);...}
a{color:inherit;text-decoration:none}
img{max-width:100%;display:block}
button{font-family:inherit;cursor:pointer;border:none}
```

Ces règles sont **déjà dans [style.css § 01-02](style.css#L8-L33)** — pure duplication.

**Action** : supprimer les resets des blocs `<style>` locaux.

### 10. Imports de fontes non uniformes

| Page | Import |
|---|---|
| `index.html` | `Poppins:wght@300-800 + Playfair:ital,wght@0,700;1,700` |
| `mentions-legales.html` | `Poppins:wght@400-900 + Playfair:ital,wght@0,700;1,700` |
| Standard (style.css référence) | `Poppins:wght@300-900 + Playfair:ital,wght@1,700` (italic only) |

**Action** : imposer l'import standard (§ 3.1 BRAND_GUIDELINES) sur toutes les pages.

### 11. Classes de nav dédoublées (`.nav__logo` VS `.nav-logo`)

[style.css § 03-04](style.css#L39-L67) gère les 2 conventions (`.nav__logo,.nav-logo`). Historique de refactor inachevé. Pas grave, mais à normaliser sur une seule convention BEM (`__`) à terme.

---

## ✅ Points positifs (ce qui est déjà bien)

- [style.css](style.css) est **bien structuré** : variables logiques, composants réutilisables, responsive, shadows/eases cohérents.
- 15 articles de blog utilisent tous le **même pattern** (import, :root, nav--light, article-body) — cohérence forte.
- Tag Playfair italic gold `<em>` bien implanté (15 pages).
- Footer `.site-footer` et back-to-top identiques partout (sauf `mentions-legales.html` avec `.btt` custom).
- Meta `theme-color:#0d4f3d` présent sur 31/31 pages ✅
- GA4 (`ga4.js`) présent sur 31/31 pages ✅

---

## Plan d'action (par ordre de ROI)

### Phase 1 — Critique (1h30)
1. **Refondre [index.html](index.html)** : supprimer `<style>` custom (lignes 68-470), migrer vers variables `--green-d`, `--gold`, `--cream`, `--black`, remplacer titres Playfair non-italic par Poppins 900 + `<em>` Playfair.
2. **Fixer mentions-legales** : `.btn-cta` en gold, corriger `.ml-pending`.

### Phase 2 — Haute (1h30)
4. **Refondre mission.html** : Poppins 800-900 pour titres, Playfair italic pour accents uniquement.
5. **Normaliser catégories blog** : appliquer table [BRAND_GUIDELINES § 5](BRAND_GUIDELINES.md#5-catégories-blog--palette-normée).

### Phase 3 — Moyenne (1h30)
6. **Supprimer les `:root` dupliqués** de toutes les pages (find-replace mass).
7. **Remplacer hex inline** par variables (script de migration) :
   ```bash
   # depuis 03_YE/02_web/v4/
   # À tester avant commit
   for f in *.html blog/*.html; do
     sed -i 's/color:#6e6e6e/color:var(--gray)/g; \
             s/color:#0d4f3d/color:var(--green-d)/g; \
             s/background:#effae5/background:var(--green-xl)/g; \
             s/background:#fef3e5/background:var(--cream-d)/g; \
             s/background:#fbe3d9/background:var(--peach-l)/g' "$f"
   done
   ```
8. **Fixer `menu.html`** : icônes catégories avec backgrounds de palette.

### Phase 4 — Finition (1h)
9. Supprimer les resets CSS dupliqués dans les `<style>` locaux.
10. Uniformiser imports de fontes.
11. Normaliser naming BEM (`.nav__*` partout).

---

## NEXT ACTIONS

1. **Valider** [BRAND_GUIDELINES.md](BRAND_GUIDELINES.md) avec toi — est-ce bien l'ADN visuel voulu ?
2. **Prioriser** : veux-tu que je lance Phase 1 (index.html + mentions-legales) maintenant ?
