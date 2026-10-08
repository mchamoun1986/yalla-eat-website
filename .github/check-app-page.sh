#!/usr/bin/env bash
# Garde-fou : tous les QR imprimes menent a /app. Echoue si app.html manque ou a perdu ses liens vers les stores.
f="app.html"
[ -f "$f" ] || { echo "ERREUR : $f est absent"; exit 1; }
grep -q 'apps.apple.com/fr/app/yalla-eat/id6807079918' "$f" || { echo "ERREUR : lien App Store absent de $f"; exit 1; }
grep -q 'play.google.com/store/apps/details?id=com.dishop.yallaeat' "$f" || { echo "ERREUR : lien Google Play absent de $f"; exit 1; }
echo "OK : page /app presente avec ses liens App Store et Google Play"
