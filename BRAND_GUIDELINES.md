# Yalla Eat — Brand & Design System

**Version** : 1.0 · **Date** : 2026-04-16 · **Scope** : `03_YE/02_web/v4/` (site public + blog)
**Source de vérité CSS** : [style.css](style.css)

Ce document est la référence unique pour les couleurs, fontes, composants et tons. **Toute page HTML/CSS doit s'y conformer.** Toute divergence est un bug.

---

## 1. ADN de marque

- **Positionnement** : restaurant libanais moderne Lyon 9 (Vaise), sain, halal, généreux, rapide.
- **Personnalité visuelle** : chaleureux (cream/gold), sain (green), premium (noir profond + Playfair italic).
- **Ton** : français direct, chaleureux, sans jargon, orienté action (CTA : "Commander", "Composer mon bowl").

---

## 2. Palette de couleurs (SOURCE UNIQUE)

Toutes ces variables vivent dans `:root` de [style.css](style.css). **Ne jamais redéfinir ailleurs.**

### 2.1 Couleurs primaires

| Token | Hex | Usage |
|---|---|---|
| `--green-d` | `#0d4f3d` | Vert principal — fonds hero, titres H2 sections, boutons "green", textes d'accent, footer |
| `--gold` | `#f9ad4d` | CTA principal, accents italiques, logo dot, hovers gold |
| `--cream` | `#fff9f2` | Fond body par défaut |
| `--black` | `#0a0a0a` | Corps de texte, footer background |

### 2.2 Couleurs secondaires

| Token | Hex | Usage |
|---|---|---|
| `--green` | `#4b916d` | Vert moyen — sous-titres, états hover |
| `--green-m` | `#97c693` | Vert clair décoratif |
| `--green-l` | `#daf3c0` | Fonds verts doux (cards) |
| `--green-xl` | `#effae5` | Fond badge catégorie "guide" |
| `--gold-d` | `#d49341` | Gold hover sombre |
| `--gold-l` | `#fabd71` | Gold hover clair, accents nav |
| `--cream-d` | `#fef3e5` | Fond section alternée, badge "recette" |
| `--peach` | `#fdead2` | Fond badge "coulisses" |
| `--peach-l` | `#fbe3d9` | Accent chaleureux secondaire |
| `--blue` | `#1a6aff` | **Réservé** — actuellement inutilisé, à garder pour liens externes ou notifications |
| `--blue-d` | `#094bcc` | Blue hover |
| `--blue-l` | `#597dff` | Blue clair |

### 2.3 Neutres

| Token | Hex | Usage |
|---|---|---|
| `--gray` | `#6e6e6e` | Texte secondaire (paragraphes sous-titres, metadata) |
| `--gray-l` | `#b0b0b0` | Séparateurs, texte désactivé, breadcrumb separator |

### 2.4 Règle absolue

**Jamais de code hex en dur** dans les HTML (`style="color:#0d4f3d"` interdit) ou dans les styles inline. Toujours `var(--green-d)`. Exception unique : fallback dans un `linear-gradient` où la variable ne rend pas (rare).

---

## 3. Typographie

### 3.1 Deux fontes, zéro autre

| Rôle | Fonte | Poids | Usage |
|---|---|---|---|
| **Body / UI / titres sans emphase** | **Poppins** | 300 / 400 / 500 / 600 / 700 / 800 / 900 | Tout le texte par défaut |
| **Accents italiques uniquement** | **Playfair Display** | 700 italic | Mots mis en valeur dans H1/H2 (balise `<em>`) — couleur `--gold` ou `--green-d` |

**Import unique (à mettre dans toutes les pages)** :
```html
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@1,700&display=swap" rel="stylesheet">
```

### 3.2 Règles typographiques

- **Playfair Display en ITALIQUE UNIQUEMENT** (`font-style:italic`). Jamais en régulier comme fonte display de titre complet.
- **Jamais** : DM Sans, DM Serif Display, Instrument Serif, Georgia, autres serifs.
- **Hero H1** : `font-family: Poppins; font-weight: 900; font-size: clamp(2.4em, 5vw, 4em); letter-spacing: -2px;` — le mot clé accentué en `<em>` avec Playfair italic gold.
- **Section H2** : `font-weight: 900; font-size: clamp(1.8em, 4vw, 2.8em); letter-spacing: -1.5px;`
- **Body** : `font-size: .95em; line-height: 1.6-1.8; color: #333` (ou `var(--gray)` pour secondaire).
- **Eyebrow / tag** : `font-size: .7em; font-weight: 700; text-transform: uppercase; letter-spacing: 3px;` (vert ou gold).

---

## 4. Composants canoniques

Définis dans [style.css](style.css) — **réutiliser tel quel, ne pas redéfinir localement**.

| Classe | Rôle |
|---|---|
| `.nav` + `.nav--light` | Nav fixe (dark pour index, light pour pages intérieures) |
| `.page-hero` | Hero des pages intérieures — gradient `--green-d` → `#0a3d2e` |
| `.breadcrumb` | Fil d'Ariane (sous nav, sur pages intérieures) |
| `.section-header` + `.section-eyebrow` | Titre de section standard |
| `.btn-cta` / `.btn-primary` / `.btn-order` | Bouton gold — CTA commande |
| `.btn-green` | Bouton vert foncé — CTA secondaire |
| `.feature-card` | Card service/avantage (white + shadow-sm) |
| `.article-card` | Card blog (bande gold en haut) |
| `.cta-banner` | Bannière d'appel à l'action verte |
| `.faq-item` + `.faq-question` + `.faq-answer` | FAQ accordéon |
| `.site-footer` | Footer noir global |
| `.back-to-top` | Bouton retour haut (vert foncé, fixed) |

**Radius** : `--radius: 16px` pour cards, `--radius-sm: 10px` pour inputs, `50px` (pill) pour boutons.
**Shadow** : `--shadow-sm` (cards), `--shadow-md` (hover), `--shadow-lg` (modals).

---

## 5. Catégories blog — palette normée

Actuellement `blog.html` définit 7 catégories avec des couleurs hors palette. **Version normée** (à remplacer) :

| Catégorie | Background | Text |
|---|---|---|
| Guide | `var(--green-xl)` `#effae5` | `var(--green-d)` |
| Recette | `var(--cream-d)` `#fef3e5` | `var(--gold-d)` |
| Nutrition | `var(--green-l)` `#daf3c0` | `var(--green-d)` |
| Healthy | `var(--green-xl)` `#effae5` | `var(--green)` |
| Végétarien | `var(--green-l)` `#daf3c0` | `var(--green-d)` |
| Halal | `var(--peach)` `#fdead2` | `var(--green-d)` |
| Traiteur | `var(--cream-d)` `#fef3e5` | `var(--gold-d)` |
| Coulisses | `var(--peach-l)` `#fbe3d9` | `var(--gold-d)` |

**Interdit** : violet (`#6b21a8`), bleus accent (`#1a5aaa`), oranges (`#c45e00`) — hors palette.

---

## 6. Iconographie et emoji

- Emoji autorisé pour catégories menu et floaters décoratifs uniquement.
- Favicon unique : [favicon.svg](favicon.svg).
- Images produits : `.webp`, optimisées, ratio 4/5 ou 1/1 pour grille.

---

## 7. Responsive & A11y

- **Mobile-first** ; breakpoints `@media(max-width:900px)` et `@media(max-width:600px)`.
- **Contraste** : tout texte sur fond coloré doit atteindre WCAG AA (`--green-d`/`#fff` = OK, `--gold`/`--black` = OK, `--gold`/`#fff` = borderline — préférer `--black` sur gold).
- **`prefers-reduced-motion`** respecté dans `.reveal`.

---

## 8. Structure HTML canonique d'une page intérieure

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <!-- SEO meta + OG + JSON-LD -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@1,700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
  <!-- AUCUN bloc <style> sauf overrides spécifiques à la page, et toujours via var(--*) -->
</head>
<body>
  <nav class="nav nav--light">...</nav>
  <header class="page-hero">...</header>
  <nav class="breadcrumb">...</nav>
  <section class="content-section">...</section>
  <section class="faq-section">...</section>
  <section class="cta-banner">...</section>
  <footer class="site-footer">...</footer>
  <button class="back-to-top">↑</button>
</body>
</html>
```

**Règle** : si un bloc `<style>` local contient plus de 20 lignes, il faut extraire dans [style.css](style.css).

---

## 9. Checklist avant déploiement d'une page

- [ ] Import de fontes identique à la section 3.1
- [ ] `<link rel="stylesheet" href="style.css">` unique
- [ ] Aucune redéfinition de `:root {--*}` dans la page
- [ ] Aucun hex dans les `style="..."` inline
- [ ] Aucune mention de DM Sans, DM Serif, Instrument Serif, Georgia
- [ ] H1 : Poppins 900, `<em>` en Playfair italic
- [ ] Nav avec variante `.nav--light` si page intérieure
- [ ] Breadcrumb présent sous le hero
- [ ] Footer `.site-footer` identique aux autres pages
- [ ] `meta theme-color` = `#0d4f3d`
- [ ] GA4 `ga4.js` chargé
