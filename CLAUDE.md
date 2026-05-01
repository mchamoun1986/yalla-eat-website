# CLAUDE.md — Yalla Eat Website

## Contexte
Site vitrine de Yalla Eat, restaurant libanais fast-good a Lyon 9 (Vaise).
Site HTML statique deploye sur Vercel. Domaine : yallaeat.fr

## Stack technique
- **HTML/CSS/JS** statique (pas de framework, pas de build)
- **Hebergement** : Vercel (auto-deploy depuis GitHub)
- **Repo** : mchamoun1986/yalla-eat-website (branche main)
- **DNS** : GoDaddy → Vercel (A: 216.198.79.1)
- **Formulaires** : Formspree (endpoint xqewdaje) → yallaeat69@gmail.com
- **Analytics** : GA4 (ga4.js)

## Structure
```
index.html              → Page d'accueil
menu.html               → Carte complete
bowl.html               → Page bowls
wrap-sandwich.html      → Wraps et sandwiches
falafel-lyon.html       → Page falafel
shawarma-lyon.html      → Page shawarma
grillade-libanaise.html → Grillades
mezzebox.html           → Mezze box
traiteur.html           → Service traiteur
devis-traiteur.html     → Simulateur devis traiteur
livraison.html          → Infos livraison
emporter.html           → Emporter
contact.html            → Contact (Formspree)
halal.html              → Page halal
vegetarien-vegan.html   → Options vege/vegan
dejeuner-lyon-9.html    → Page dejeuner
mission.html            → Notre mission
mentions-legales.html   → Mentions legales
restaurant-libanais-lyon-9.html → Hub SEO/IA
blog/                   → 18 articles SEO
assets/                 → Images, og-image
style.css               → CSS principal
fonts.css               → Polices
vercel.json             → Config Vercel (cleanUrls, headers, redirects)
sitemap.xml             → 38+ URLs
robots.txt              → Inclut bots IA
```

## SEO
- Score audit : 82/100
- Position 1 : "bowl libanais lyon"
- Top 5 : "traiteur libanais lyon"
- Schema : Restaurant + Article + BreadcrumbList + FAQPage
- Vercel cleanUrls : URLs sans .html
- 18 articles blog publies

## Commandes
- Pas de build — editer les fichiers HTML directement
- Preview local : `python -m http.server 8080` dans le dossier
- Deploy : push sur main → Vercel auto-deploy

## Regles
- Garder les URLs propres (pas de .html dans les liens internes)
- Toujours mettre a jour sitemap.xml quand une page est ajoutee
- Schema JSON-LD dans chaque page
- Meta description unique par page (max 155 caracteres)
- config-traiteur.xlsx = source de donnees pour le simulateur devis
