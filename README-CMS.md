# Gestion des actualités sans coder (Decap CMS)

## Comment ça marche
- `data/articles.json` contient la liste des articles (le premier de la liste = celui affiché en
  "A LA UNE", les suivants apparaissent dans "AUTRES ARTICLES").
- `assets/articles.js` lit ce fichier et génère le contenu de `actualite.html` au chargement de la
  page. `assets/articles.css` contient les styles associés.
- `admin/` est l'interface [Decap CMS](https://decapcms.org/) : un formulaire web qui permet
  d'ajouter/modifier/réordonner les articles sans toucher au code. Elle écrit directement dans
  `data/articles.json` via Git.

Ces fichiers sont indépendants du runtime Framer (`js/*.mjs`, à ne jamais modifier à la main) — ce
sont les seuls éléments du site pilotés par contenu plutôt que codés en dur.

## Mise en place restante (une seule fois, côté hébergement)
Ces étapes nécessitent des comptes externes (GitHub, Netlify) que je ne peux pas créer à ta place :

1. **Pousser ce projet sur GitHub** : `git init`, commit, créer un repo GitHub, `git push`.
2. **Créer un site Netlify** connecté à ce repo GitHub (déploiement auto à chaque push).
3. Dans le dashboard Netlify du site : activer **Identity** (Site settings → Identity → Enable),
   puis activer **Git Gateway** (Identity → Services → Git Gateway). C'est ce qui permet à Decap CMS
   de fonctionner sans backend à coder.
4. Dans Identity → Invite users, inviter l'adresse email de ta cliente. Elle reçoit un email,
   choisit un mot de passe, et peut ensuite se connecter sur `https://tonsite.netlify.app/admin/`.

Une fois ces 4 étapes faites, ta cliente gère les actualités seule, en autonomie totale — plus besoin
de toi ni de Framer pour publier un article.

## Si l'hébergement n'est pas Netlify
Decap CMS fonctionne aussi avec un backend GitHub direct (`backend: github` dans
`admin/config.yml`), mais demande de créer une OAuth App GitHub (ou d'utiliser un proxy
d'authentification) — un peu plus de configuration. À adapter le moment venu selon l'hébergeur
finalement choisi.

## Ajouter un nouvel article manuellement (sans passer par l'interface admin)
Il suffit d'ajouter une entrée dans le tableau `articles` de `data/articles.json` :

```json
{
  "title": "Titre de l'article",
  "date": "2026-04-01",
  "description": "Texte de présentation.",
  "link": "https://exemple.com/article.pdf",
  "linkLabel": "Lire l'article",
  "image": "images/mon-image.jpg"
}
```

`quote` et `quoteAuthor` sont optionnels (uniquement utiles pour l'article "A LA UNE").
