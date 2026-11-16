# ALLO CONSO 17 — Telegram Mini App (catalogue de démonstration)

Base front-end React/Vite personnalisée avec le logo fourni et un écran de lancement ALLO CONSO 17. Inspirée du style des captures fournies : thème sombre, cartes arrondies, filtres, favoris, tiroir de catégories, navigation basse et fiche produit.

Le projet est un catalogue de démonstration pour des produits légaux. Il ne comprend ni paiement, ni panier, ni système de commande.

## 1. Prérequis
- Node.js 20 ou plus récent
- Un compte GitHub (facultatif, pour déployer)
- Un compte Telegram et accès à [@BotFather](https://t.me/BotFather)

## 2. Lancer sur ton ordinateur
Dans le dossier du projet :

```bash
npm install
npm run dev
```

Vite affiche une adresse locale. Pour tester sur un téléphone, ordinateur et téléphone doivent être sur le même réseau, ou utilise un tunnel HTTPS.

## 3. Personnaliser le catalogue
Ouvre `src/main.jsx` et modifie :
- `products` : noms, prix, descriptions et images de démonstration
- `categories` : catégories
- `tags` : filtres
- `makers` : collections / marques

Les favoris sont sauvegardés localement dans le navigateur. Pour une vraie synchronisation multi-appareils, branche une base de données et une authentification côté serveur.

## 4. Déployer sur Vercel
1. Crée un dépôt GitHub et pousse le contenu de ce dossier.
2. Sur Vercel, importe le dépôt.
3. Framework : Vite ; commande de build : `npm run build` ; dossier de sortie : `dist`.
4. Déploie et récupère l'URL HTTPS.

## 5. Créer le bot Telegram
1. Ouvre [@BotFather](https://t.me/BotFather).
2. Envoie `/newbot`, puis suis les étapes pour créer le bot.
3. Dans BotFather, configure un menu bouton / Web App avec l'URL HTTPS de ton site (les intitulés exacts peuvent évoluer dans Telegram).
4. Ouvre le bot et teste la Mini App sur Telegram mobile.

Le SDK Telegram est chargé dans `index.html`. L'application appelle `ready()` et `expand()` et lit le profil Telegram disponible côté client.

## 6. Avant une mise en production
- Vérifier `Telegram.WebApp.initData` côté serveur avant de faire confiance à l'identité Telegram.
- Ajouter une vraie base de données (par exemple Supabase) pour produits, catégories et favoris.
- Ajouter un panneau d'administration protégé pour gérer le catalogue.
- Remplacer les liens et coordonnées de démonstration.
- Ajouter politique de confidentialité, mentions légales et gestion des données.
- Tester les tailles d'écran iOS / Android et les paramètres de thème Telegram.

Documentation officielle : https://core.telegram.org/bots/webapps

## Écran de lancement et logo
Le visuel fourni est enregistré dans `public/allo-conso-17.jpeg` et s'affiche au lancement pendant environ 2,6 secondes. Remplace ce fichier par ton nouveau visuel en conservant le même nom si tu souhaites changer le logo.
