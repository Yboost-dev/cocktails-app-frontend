# 🍹 Cocktails Bar - Application Web de Cocktails

![logo.png](public/img/logo.png)

## 📋 À propos du projet

Délices Cocktails est une application web moderne dédiée aux amateurs de cocktails. Notre plateforme permet aux utilisateurs de découvrir une large sélection de cocktails, de consulter les recettes détaillées et d'acheter leurs boissons préférées. Pour les administrateurs, l'application offre une interface complète de gestion des produits, des ingrédients et des utilisateurs.

## ✨ Fonctionnalités principales

- **Catalogue de cocktails** : Parcourez notre vaste collection de cocktails classés par catégories
- **Fiches détaillées** : Consultez les ingrédients, les prix et les descriptions de chaque cocktail
- **Panier d'achat** : Ajoutez vos cocktails préférés à votre panier et passez commande
- **Gestion des stocks** : Système intelligent qui indique la disponibilité des cocktails en fonction du stock d'ingrédients
- **Interface d'administration** : Gérez les produits, les ingrédients, les utilisateurs et les catégories
- **Authentification sécurisée** : Système de connexion avec différents niveaux d'accès (client, employé, administrateur)

## 🚀 Installation

Pour commencer, vous devez installer les dépendances du projet. Dans votre terminal, exécutez :

```shell script
npm install
```


Cette commande installera tous les packages et dépendances nécessaires au fonctionnement du projet.

### Configuration

1. Créez un fichier `.env` à la racine du projet avec les variables d'environnement suivantes :

```
REACT_APP_API_URL=http://localhost:4000
```


Adaptez l'URL à celle de votre API backend.

## 🛠️ Scripts disponibles

Dans le répertoire du projet, vous pouvez exécuter :

### `npm start`

Lance l'application en mode développement.\
Ouvrez [http://localhost:4000](http://localhost:4000) pour la visualiser dans votre navigateur.

La page se rechargera automatiquement lorsque vous apportez des modifications.\
Vous pouvez également voir les erreurs de lint dans la console.


### `npm run build`

Compile l'application pour la production dans le dossier `build`.\
Elle regroupe correctement React en mode production et optimise la build pour les meilleures performances.

La build est minifiée et les noms de fichiers incluent des hachages.\
Votre application est prête à être déployée !

## 🧱 Structure du projet

```
cocktail-app-frontend/
├── public/
│   ├── index.html
│   └── img/
├── src/
│   ├── components/
│   │   ├── header/
│   │   ├── footer/
│   │   ├── errors/
│   │   ├── cart/
│   │   └── form/
│   ├── context/
│   │   └── cartContext.js
│   ├── hooks/
│   │   └── useCurrentUser.js
│   ├── routes/
│   │   ├── privateRoute/
│   │   └── publicRoute/
│   ├── scenes/
│   │   ├── admin/
│   │   ├── article/
│   │   ├── category/
│   │   ├── commande/
│   │   ├── home/
│   │   └── notFound/
│   ├── services/
│   │   ├── articles/
│   │   ├── auth/
│   │   ├── category/
│   │   ├── ingredients/
│   │   └── orders
│   ├── App.js
│   └── index.js
└── package.json
```


## 📱 Compatibilité

L'application est conçue pour être entièrement responsive et fonctionne sur :
- Ordinateurs de bureau

Elle a été testée sur les navigateurs suivants :
- Chrome (dernière version)
- Firefox (dernière version)
- Safari (dernière version)
- Edge (dernière version)

## 👥 Équipe de développement

- **Kantin FAGNIART** - Développeur Frontend | Développeur Backend | Designer UI/UX
- **Vito DERIU** - Développeur Frontend | Chef de projet

© 2024 Cocktails Bar. Tous droits réservés.