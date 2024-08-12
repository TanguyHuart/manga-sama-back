# Admin
## 1\. Modifier les privilèges d'un utilisateur (administrateur)
- **URL:** `/admin/user/:id`
- **Méthode:** `PUT`
- **Description:** Modifie les privilèges d'un utilisateur spécifique en tant qu'administrateur.
- **Paramètres Requis:**
  - `id` (integer): Identifiant de l'utilisateur.
- **Paramètres Optionnels dans le Corps de la Requête:**
  - `role_id` (integer): Nouvel identifiant du rôle de l'utilisateur.
- **En-tête Requis:**
  - `Authorization` (string): Token JWT d'authentification de l'administrateur.
- **Réponse Succès:**
  - Code 200 (OK)
    - Corps de la réponse :
      ~~~ json
      {
      "success": true,
      "message": "Privilèges de l'utilisateur modifiés avec succès."
      }
      ~~~
- **Réponse Erreur:**
  - Code 403 (Forbidden) si l'utilisateur n'est pas authentifié en tant qu'administrateur.
  - Code 404 (Not Found) si l'utilisateur spécifié n'est pas trouvé.
  - Code 500 (Internal Server Error) en cas d'erreur interne du serveur.
# Articles
## 1\. Obtenir tous les articles
- **URL:** `/article`
- **Méthode:** `GET`
- **Description:** Récupère la liste de tous les articles disponibles.
- **Exemple de Réponse:**
  ~~~ json
  [
  {
      "id": 1,
      "title": "Article 1",
      "description": "Description de l'article 1",
      "price": 20,
      // ...
  },
  {
      "id": 2,
      "title": "Article 2",
      "description": "Description de l'article 2",
      "price": 30,
      // ...
  }
  ]
  ~~~
## 2\. Obtenir un article par ID
- **URL:** `/article/:id`
- **Méthode:** `GET`
- **Description:** Récupère les informations d'un article spécifique.
- **Paramètres Requis:**
  - `id` (integer): Identifiant de l'article.
- **Exemple de Réponse:**
  ~~~ json
  {
  "id": 1,
  "title": "Article 1",
  "description": "Description de l'article 1",
  "price": 20,
  // ...
  }
  ~~~
## 3\. Créer un nouvel article
- **URL:** `/article`
- **Méthode:** `POST`
- **Description:** Crée un nouvel article dans la base de données.
- **Paramètres Requis dans le Corps de la Requête:**
  - `title` (string): Titre de l'article.
  - `description` (string): Description de l'article.
  - `price` (integer): Prix de l'article.
  - `image_url` (string): URL de l'image de l'article.
  - `condition_id` (integer): Identifiant de l'état de l'article.
- **Exemple de Corps de Requête:**
  ~~~ json
  {
  "title": "Nouvel Article",
  "description": "Description du nouvel article",
  "price": 25,
  "image_url": "https://example.com/image.jpg",
  "condition_id": 1
  }
  ~~~
- **Exemple de Réponse (Création Réussie):**
  ~~~ json
  {
  "status": 201,
  "success": true,
  "message": "L'annonce a été créée avec succès",
  "article": {
      "id": 3,
      "title": "Nouvel Article",
      "description": "Description du nouvel article",
      "price": 25,
      // ...
  }
  }
  ~~~
## 4\. Mettre à jour un article par ID
- **URL:** `/article/:id`
- **Méthode:** `PUT`
- **Description:** Modifie les informations d'un article spécifique.
- **Paramètres Requis dans le Corps de la Requête:**
  - `title` (string): Nouveau titre de l'article.
  - `description` (string): Nouvelle description de l'article.
  - `price` (integer): Nouveau prix de l'article.
  - `image_url` (string): Nouvelle URL de l'image de l'article.
  - `condition_id` (integer): Nouvel identifiant de l'état de l'article.
- **Paramètres Requis dans l'URL:**
  - `id` (integer): Identifiant de l'article à mettre à jour.
- **Exemple de Corps de Requête:**
  ~~~ json
  {
  "title": "Article Modifié",
  "description": "Nouvelle description de l'article",
  "price": 30,
  "image_url": "https://example.com/new_image.jpg",
  "condition_id": 2
  }
  ~~~
- **Exemple de Réponse (Modification Réussie):**
  ~~~ json
  {
  "id": 1,
  "title": "Article Modifié",
  "description": "Nouvelle description de l'article",
  "price": 30,
  // ...
  }
  ~~~
## 5\. Supprimer un article par ID
- **URL:** `/article/:id`
- **Méthode:** `DELETE`
- **Description:** Supprime un article spécifique.
- **Paramètres Requis:**
  - `id` (integer): Identifiant de l'article à supprimer.
- **Exemple de Réponse (Suppression Réussie):**
  ~~~ json
  {
  "status": 200,
  "success": true,
  "message": "Article supprimé avec succès"
  }

# Associations
## 1\. Récupérer toutes les annonces en lien avec un manga particulier
- **URL :** `associate/article/manga/:isbn`
- **Méthode:** `GET`
- **Description :** Récupère toutes les annonces associées à un manga spécifique.
- **Exemple d'utilisation :**
  ~~~ http
  GET associate/article/manga/123456789
  ~~~
## 2\. Associer un manga à un article
- **URL :** `associate/article/manga/:articleId/:isbn`
- **Méthode:** `POST`
- **Middleware d'Authentification Requis**
- **Description :** Associe un manga existant à une annonce spécifique.
- **Exemple d'utilisation :**
  ~~~ http
  POST associate/article/manga/1/123456789
  ~~~
## 3\. Récupérer toutes les annonces en lien avec un utilisateur particulier
- **URL :** `associate/user/:userId/article/`
- **Méthode:** `GET`
- **Description :** Récupère toutes les annonces associées à un utilisateur spécifique.
- **Exemple d'utilisation :**
  ~~~ http
  GET associate/user/123/articles/
  ~~~
## 4\. Associer un utilisateur à une annonce
- **URL :** `associate/user/article/:userId/:articleId`
- **Méthode:** `POST`
- **Middleware d'Authentification Requis**
- **Description :** Associe un utilisateur existant à une annonce spécifique.
- **Exemple d'utilisation :**
  ~~~ http
  POST associate/user/article/123/1
  ~~~
## 5\. Récupérer toutes les annonces associées à un manga
- **URL :** `associate/article/manga/:isbn`
- **Méthode:** `GET`
- **Description :** Récupère toutes les annonces associées à un manga spécifique.
- **Exemple d'utilisation :**
  ~~~ http
  GET associate/article/manga/123456789
  ~~~
## 6\. Associer un utilisateur à une annonce
- **URL :** `associate/user/article/:userId/:articleId`
- **Méthode:** `POST`
- **Middleware d'Authentification Requis**
- **Description :** Associe un utilisateur existant à une annonce spécifique.
- **Exemple d'utilisation :**
  ~~~ http
  POST /user/article/123/1
  ~~~
# Authentification
L'API d'authentification permet aux utilisateurs de s'authentifier et de se déconnecter. Les utilisateurs peuvent se connecter en fournissant leur adresse e-mail et leur mot de passe. Un token JWT est généré lors de la connexion et doit être inclus dans les en-têtes de toutes les requêtes subséquentes pour authentifier l'utilisateur.
## Endpoints
## 1\. Connexion de l'utilisateur
Permet à un utilisateur de se connecter en fournissant son adresse e-mail et son mot de passe.

- **Endpoint:** `POST /login`
- **Paramètres du corps de la requête:**
  - `email` (string): Adresse e-mail de l'utilisateur.
  - `password` (string): Mot de passe de l'utilisateur.
- **Réponses:**
  - Code 200 OK:
    - `success` (boolean): true.
    - `message` (string): "Connexion réussie".
    - `user` (object): Informations sur l'utilisateur connecté.
      - `id` (integer): Identifiant de l'utilisateur.
      - `pseudo` (string): Pseudo de l'utilisateur.
      - `email` (string): Adresse e-mail de l'utilisateur.
      - `role` (string): Rôle de l'utilisateur.
      - ... (autres informations de l'utilisateur).
    - `token` (string): Token JWT à inclure dans les en-têtes des requêtes subséquentes.
  - Code 401 Unauthorized:
    - `message` (string): "Adresse e-mail ou mot de passe incorrect."
## 2\. Déconnexion de l'utilisateur
Permet à un utilisateur de se déconnecter en invalidant son token JWT. Le token doit être inclus dans les en-têtes de la requête.

- **Endpoint:** `POST /logout`
- **Paramètres du corps de la requête:** Aucun.
- **Réponses:**
  - Code 200 OK:
    - `success` (boolean): true.
    - `message` (string): "Déconnexion réussie".
  - Code 401 Unauthorized:
    - `message` (string): "Token manquant. Déconnexion impossible."
## Utilisation du Token JWT
Une fois connecté, l'utilisateur doit inclure le token JWT dans les en-têtes de toutes les requêtes subséquentes pour accéder aux ressources protégées. Ajoutez un en-tête `Authorization` avec la valeur `Bearer {token}`.

Exemple d'en-tête pour une requête HTTP:
~~~
Authorization: Bearer {token}
~~~

Notez que le token JWT a une expiration d'une heure, après quoi l'utilisateur devra se reconnecter.

-----
# Catégories
## Structure de la Table
La table "category" représente les catégories associées aux mangas.
### Colonnes de la Table
1. **id (INTEGER):** Identifiant unique de la catégorie (clé primaire).
1. **category\_name (VARCHAR(30)):** Nom de la catégorie.
## Endpoints API
## 1\. Récupérer toutes les catégories
#### Endpoint: `GET /category/`
**Description:** Récupère la liste complète de toutes les catégories.

**Paramètres de requête:** Aucun.

**Réponse réussie (200 OK):** Liste de toutes les catégories.

**Réponse d'erreur (404 Not Found):** Aucune catégorie trouvée dans la base de données.
## 2\. Créer une nouvelle catégorie
#### Endpoint: `POST /category/`
**Description:** Crée une nouvelle catégorie dans la base de données.

**Paramètres de requête:**

**category\_name (VARCHAR(30)):** Nom de la nouvelle catégorie.

**Réponse réussie (201 Created):** Catégorie créée avec succès.

**Réponse d'erreur (400 Bad Request):** Paramètre manquant dans le corps de la requête HTTP.
## 3\. Récupérer une catégorie par son ID
#### Endpoint: `GET /category/:id`
**Description:** Récupère une catégorie spécifique en utilisant son ID.

**Paramètres de requête:** ID de la catégorie.

**Réponse réussie (200 OK):** Détails de la catégorie spécifiée.

**Réponse d'erreur (404 Not Found):** Aucune catégorie trouvée avec l'ID spécifié.
## 4\. Modifier une catégorie par son ID
#### Endpoint: `PATCH /category/:id`
**Description:** Modifie les informations d'une catégorie spécifique en utilisant son ID.

**Paramètres de requête:**

**category\_name (VARCHAR(30)):** Nouveau nom de la catégorie.

**Réponse réussie (201 Created):** Catégorie modifiée avec succès.

**Réponse d'erreur (400 Bad Request):** Paramètre manquant dans le corps de la requête HTTP.
## 5\. Supprimer une catégorie par son ID
#### Endpoint: `DELETE /category/:id`
**Description:** Supprime une catégorie spécifique en utilisant son ID.

**Paramètres de requête:** ID de la catégorie.

**Réponse réussie (200 OK):** Catégorie supprimée avec succès.

**Réponse d'erreur (404 Not Found):** Aucune catégorie trouvée avec l'ID spécifié.

**Documentation sur la Table "condition"**

La table "condition" de la base de données est responsable de stocker différentes conditions liées aux articles, en particulier aux mangas. Cette table est utilisée pour définir l'état dans lequel se trouve un manga mis en vente. Voici une documentation détaillée sur la structure et les fonctionnalités de la table "condition".

-----
# Condition
La table "condition" est composée des colonnes suivantes :

- **id** (`INTEGER`): Identifiant unique de l'état.
- **condition\_name** (`VARCHAR(30)`): Nom de l'état, décrivant la condition de l'article.
### Contraintes et Domaines
- **PRIMARY KEY**: La colonne "id" sert de clé primaire.
- **UNIQUE**: La contrainte d'unicité sur la colonne "condition\_name" garantit que chaque état a un nom unique.
### Opérations possibles
## 1 **Récupérer tous les états:**

- Endpoint: `GET /condition`
- Fonctionnalité: Récupère la liste de tous les états présents dans la base de données.

## 2 **Créer un nouvel état:**

- Endpoint: `POST /condition`
- Fonctionnalité: Permet la création d'un nouvel état avec un nom spécifié.
- Format de la requête :
  ~~~ json
  {
  "condition_name": "Neuf"
  }
  ~~~

## 3 **Récupérer un état spécifique:**

- Endpoint: `GET /condition/:id`
- Fonctionnalité: Récupère les détails d'un état spécifique en utilisant son identifiant unique.

## 4 **Modifier un état:**

- Endpoint: `PATCH /condition/:id`
- Fonctionnalité: Modifie le nom d'un état spécifique en utilisant son identifiant unique.
- Format de la requête :
  ~~~ json
  {
  "condition_name": "Comme neuf"
  }
  ~~~

## 5 **Supprimer un état:**

- Endpoint: `DELETE /condition/:id`
- Fonctionnalité: Supprime un état spécifique en utilisant son identifiant unique.
### Exemples d'utilisation
- **Récupérer tous les états:**
  ~~~ http
  GET /condition
  ~~~
- **Créer un nouvel état:**
  ~~~ http
  POST /condition
  Content-Type: application/json

  {
  "condition_name": "Neuf"
  }
  ~~~
- **Récupérer un état spécifique:**
  ~~~ http
  GET /condition/1
  ~~~
- **Modifier un état:**
  ~~~ http
  PATCH /condition/1
  Content-Type: application/json

  {
  "condition_name": "Comme neuf"
  }
  ~~~
- **Supprimer un état:**
  ~~~ http
  DELETE /condition/1
  ~~~
-----
# Images
Le router "images" gère les différentes opérations liées aux images, notamment les couvertures de mangas, les images de profil utilisateur, et les photos d'articles.
## 1\. Récupérer une Cover de Manga par son ID
- **Endpoint:** `/images/:id`
- **Méthode:** `GET`
- **Description:** Récupère et renvoie la couverture d'un manga spécifié par son ID.
- **Paramètres URL:**
  - `id` (integer): ID unique de la couverture du manga.
- **Réponses:**
  - Code 200: Succès, renvoie la couverture du manga.
  - Code 404: Aucune couverture trouvée pour l'ID spécifié.
## 2\. Récupérer une Image de Profil Utilisateur par son ID
- **Endpoint:** `/images/uploads/user/:id`
- **Méthode:** `GET`
- **Description:** Récupère et renvoie l'image de profil d'un utilisateur spécifié par son ID.
- **Paramètres URL:**
  - `id` (integer): ID unique de l'utilisateur.
- **Réponses:**
  - Code 200: Succès, renvoie l'image de profil de l'utilisateur.
  - Code 404: Aucune image trouvée pour l'utilisateur spécifié.
## 3\. Télécharger une Image de Profil Utilisateur
- **Endpoint:** `/images/uploads/user/:id`
- **Méthode:** `POST`
- **Description:** Télécharge une nouvelle image de profil pour un utilisateur spécifié par son ID.
- **Paramètres URL:**
  - `id` (integer): ID unique de l'utilisateur.
- **Paramètres de la Requête:**
  - `file` (multipart/form-data): Fichier image à télécharger.
- **Réponses:**
  - Code 202: Succès, l'image de profil a été téléchargée avec succès.
  - Code 404: Aucun utilisateur trouvé pour l'ID spécifié.
  - Code 500: Erreur lors de l'upload de l'image.
## 4\. Récupérer une Photo d'Article par son ID
- **Endpoint:** `/images/uploads/article/:id`
- **Méthode:** `GET`
- **Description:** Récupère et renvoie la photo d'un article spécifié par son ID.
- **Paramètres URL:**
  - `id` (integer): ID unique de l'article.
- **Réponses:**
  - Code 200: Succès, renvoie la photo de l'article.
  - Code 404: Aucune photo trouvée pour l'article spécifié.
## 5\. Télécharger une Photo d'Article
- **Endpoint:** `/images/uploads/article/:id`
- **Méthode:** `POST`
- **Description:** Télécharge une nouvelle photo pour un article spécifié par son ID.
- **Paramètres URL:**
  - `id` (integer): ID unique de l'article.
- **Paramètres de la Requête:**
  - `file` (multipart/form-data): Fichier image à télécharger.
- **Réponses:**
  - Code 202: Succès, la photo de l'article a été téléchargée avec succès.
  - Code 404: Aucun article trouvé pour l'ID spécifié.
  - Code 500: Erreur lors de l'upload de l'image.

**Note:** Les réponses JSON contiennent des informations détaillées sur le succès ou l'échec de l'opération, notamment les URLs des images mises à jour, les messages des erreurs, etc.
# Mangas
## 1\. Récupérer tous les Mangas
- **URL:** `/manga/`
- **Méthode:** `GET`
- **Description:** Récupère la liste de tous les mangas présents dans la base de données.
- **Exemple de Réponse:**
  ~~~ json
  [
  {
      "code_isbn": "1234567890123",
      "title": "Titre du Manga",
      "volume": 1,
      "year_publication": 2020,
      "author": "Auteur du Manga",
      "description": "Description du Manga",
      "cover_url": "http://localhost:3000/images/1234567890123",
      "category_id": 1,
      "created_at": "2023-01-01T12:00:00Z",
      "updated_at": "2023-01-02T15:30:00Z"
  },
  // ...
  ]
  ~~~
## 2\. Créer un Nouveau Manga
- **URL:** `/manga/`
- **Méthode:** `POST`
- **Description:** Crée un nouveau manga dans la base de données.
- **Paramètres Requis dans le Corps de la Requête:**
  - `code_isbn` (string): Code ISBN unique du manga.
  - `title` (string): Titre du manga.
  - `volume` (integer): Numéro du volume du manga.
  - `year_publication` (integer): Année de publication du manga.
  - `author` (string): Auteur du manga.
  - `description` (string): Description du manga.
  - `cover_url` (string): URL de la couverture du manga.
  - `category_id` (integer): Identifiant de la catégorie du manga.
- **Exemple de Corps de Requête:**
  ~~~ json
  {
  "code_isbn": "1234567890123",
  "title": "Nouveau Manga",
  "volume": 2,
  "year_publication": 2021,
  "author": "Nouvel Auteur",
  "description": "Description du Nouveau Manga",
  "cover_url": "http://localhost:3000/images/1234567890123",
  "category_id": 2
  }
  ~~~
- **Exemple de Réponse en Cas de Succès:**
  ~~~ json
  {
  "status": 201,
  "success": true,
  "message": "Le manga a été créé avec succès",
  "manga": {
      "code_isbn": "1234567890123",
      "title": "Nouveau Manga",
      // ...
  }
  }
  ~~~
## 3\. Récupérer un Manga par Code ISBN
- **URL:** `/manga/:isbn`
- **Méthode:** `GET`
- **Description:** Récupère les informations d'un manga spécifique par son code ISBN.
- **Paramètres Requis dans l'URL:**
  - `isbn` (string): Code ISBN unique du manga.
- **Exemple de Réponse en Cas de Succès:**
  ~~~ json
  {
  "code_isbn": "1234567890123",
  "title": "Titre du Manga",
  // ...
  }
  ~~~
## 4\. Mettre à Jour un Manga par Code ISBN
- **URL:** `/manga/:isbn`
- **Méthode:** `PUT`
- **Description:** Met à jour les informations d'un manga spécifique par son code ISBN.
- **Paramètres Requis dans l'URL:**
  - `isbn` (string): Code ISBN unique du manga.
- **Paramètres Requis dans le Corps de la Requête:**
  - Les mêmes que ceux nécessaires pour la création d'un nouveau manga.
- **Exemple de Corps de Requête:**
  ~~~ json
  {
  "title": "Nouveau Titre",
  "volume": 3,
  // ...
  }
  ~~~
- **Exemple de Réponse en Cas de Succès:**
  ~~~ json
  {
  "status": 201,
  "success": true,
  "message": "Le manga a été modifié avec succès",
  "manga": {
      "code_isbn": "1234567890123",
      "title": "Nouveau Titre",
      // ...
  }
  }
  ~~~
## 5\. Supprimer un Manga par Code ISBN
- **URL:** `/manga/:isbn`
- **Méthode:** `DELETE`
- **Description:** Supprime un manga spécifique par son code ISBN.
- **Paramètres Requis dans l'URL:**
  - `isbn` (string): Code ISBN unique du manga.
- **Exemple de Réponse en Cas de Succès:**
  ~~~ json
  {
  "status": 200,
  "success": true,
  "message": "Manga supprimé avec succès"
  }
  ~~~
# Rôles Utilisateur
## 1\. Récupérer tous les Rôles Utilisateur
- **URL:** `/role/`
- **Méthode:** `GET`
- **Description:** Récupère la liste de tous les rôles utilisateur présents dans la base de données.
- **Exemple de Réponse:**
  ~~~ json
  [
  {
      "id": 1,
      "role_name": "Utilisateur standard",
      "created_at": "2023-01-01T12:00:00Z",
      "updated_at": "2023-01-02T15:30:00Z"
  },
  // ...
  ]
  ~~~
## 2\. Créer un Nouveau Rôle Utilisateur
- **URL:** `/role/`
- **Méthode:** `POST`
- **Description:** Crée un nouveau rôle utilisateur dans la base de données.
- **Paramètres Requis dans le Corps de la Requête:**
  - `role_name` (string): Nom du nouveau rôle utilisateur.
- **Exemple de Corps de Requête:**
  ~~~ json
  {
  "role_name": "Nouveau Rôle"
  }
  ~~~
- **Exemple de Réponse en Cas de Succès:**
  ~~~ json
  {
  "status": 201,
  "success": true,
  "message": "Le rôle a été créé avec succès",
  "role": {
      "id": 2,
      "role_name": "Nouveau Rôle",
      // ...
  }
  }
  ~~~
## 3\. Récupérer un Rôle Utilisateur par ID
- **URL:** `/role/:id`
- **Méthode:** `GET`
- **Description:** Récupère les informations d'un rôle utilisateur spécifique par son ID.
- **Paramètres Requis dans l'URL:**
  - `id` (integer): Identifiant du rôle utilisateur.
- **Exemple de Réponse en Cas de Succès:**
  ~~~ json
  {
  "id": 2,
  "role_name": "Nouveau Rôle",
  // ...
  }
  ~~~
## 4\. Mettre à Jour un Rôle Utilisateur par ID
- **URL:** `/role/:id`
- **Méthode:** `PATCH`
- **Description:** Met à jour le nom d'un rôle utilisateur spécifique par son ID.
- **Paramètres Requis dans l'URL:**
  - `id` (integer): Identifiant du rôle utilisateur.
- **Paramètres Requis dans le Corps de la Requête:**
  - `role_name` (string): Nouveau nom du rôle utilisateur.
- **Exemple de Corps de Requête:**
  ~~~ json
  {
  "role_name": "Rôle Modifié"
  }
  ~~~
- **Exemple de Réponse en Cas de Succès:**
  ~~~ json
  {
  "status": 201,
  "success": true,
  "message": "Le rôle a été modifié avec succès",
  "role": {
      "id": 2,
      "role_name": "Rôle Modifié",
      // ...
  }
  }
  ~~~
## 5\. Supprimer un Rôle Utilisateur par ID
- **URL:** `/role/:id`
- **Méthode:** `DELETE`
- **Description:** Supprime un rôle utilisateur spécifique par son ID.
- **Paramètres Requis dans l'URL:**
  - `id` (integer): Identifiant du rôle utilisateur.
- **Exemple de Réponse en Cas de Succès:**
  ~~~ json
  {
  "status": 200,
  "success": true,
  "message": "Rôle supprimé avec succès"
  }
  ~~~
# Transactions
## 1\. Initier une Transaction
- **URL:** `/transaction/`
- **Méthode:** `POST`
- **Description:** Démarre une nouvelle transaction entre un acheteur et un vendeur.
- **Paramètres Requis dans le Corps de la Requête:**
  - `buyerID` (string): ID de l'acheteur.
  - `sellerID` (string): ID du vendeur.
  - `articleID` (string): ID de l'article lié à la transaction.
- **Exemple de Corps de Requête:**
  ~~~ json
  {
  "buyerID": "abc123",
  "sellerID": "xyz789",
  "articleID": "article456"
  }
  ~~~
- **Exemple de Réponse en Cas de Succès:**
  ~~~ json
  {
  "status": 200,
  "success": true,
  "message": "Transaction effectuée avec succès",
  "transaction": {
      "transaction_id": "unique_id",
      "date_transaction": "2023-01-15T14:30:00Z",
      "state_completion": 1,
      // ...
  }
  }
  ~~~
# Utilisateurs
## 1\. Récupérer tous les Utilisateurs
- **URL:** `/user/`
- **Méthode:** `GET`
- **Description:** Récupère la liste de tous les utilisateurs enregistrés dans la base de données.
- **Exemple de Réponse en Cas de Succès:**
  ~~~ json
  {
  "status": 200,
  "success": true,
  "users": [
      {
        "id": "abc123",
        "pseudo": "john_doe",
        "email": "john@example.com",
        // ...
      },
      // ...
  ]
  }
  ~~~
## 2\. Créer un Nouvel Utilisateur
- **URL:** `/user/`
- **Méthode:** `POST`
- **Description:** Crée un nouvel utilisateur dans la base de données.
- **Paramètres Requis dans le Corps de la Requête:**
  - `pseudo` (string): Pseudo de l'utilisateur.
  - `email` (string): Adresse e-mail de l'utilisateur.
  - `password` (string): Mot de passe de l'utilisateur.
  - `passwordConfirmation` (string): Confirmation du mot de passe.
- **Exemple de Corps de Requête:**
  ~~~ json
  {
  "pseudo": "john_doe",
  "email": "john@example.com",
  "password": "MotDePasse123",
  "passwordConfirmation": "MotDePasse123"
  }
  ~~~
- **Exemple de Réponse en Cas de Succès:**
  ~~~ json
  {
  "status": 201,
  "success": true,
  "message": "Inscription réussie. Email de confirmation envoyé.",
  "user": {
      "id": "abc123",
      "pseudo": "john_doe",
      "email": "john@example.com",
      // ...
  },
  "token": "jsonwebtoken"
  }
  ~~~
## 3\. Récupérer un Utilisateur par son ID
- **URL:** `/user/:id`
- **Méthode:** `GET`
- **Description:** Récupère les détails d'un utilisateur spécifique en fonction de son ID.
- **Paramètres Requis dans l'URL:**
  - `id` (string): ID de l'utilisateur.
- **Exemple de Réponse en Cas de Succès:**
  ~~~ json
  {
  "status": 200,
  "success": true,
  "user": {
      "id": "abc123",
      "pseudo": "john_doe",
      "email": "john@example.com",
      // ...
  }
  }
  ~~~
## 4\. Modifier un Utilisateur par son ID
- **URL:** `/user/:id`
- **Méthode:** `PUT`
- **Description:** Modifie les informations d'un utilisateur spécifique en fonction de son ID.
- **Paramètres Requis dans l'URL:**
  - `id` (string): ID de l'utilisateur.
- **Paramètres Requis dans le Corps de la Requête:**
  - `lastname` (string): Nom de l'utilisateur.
  - `firstname` (string): Prénom de l'utilisateur.
  - `pseudo` (string): Pseudo de l'utilisateur.
  - `birthdate` (string): Date de naissance de l'utilisateur.
  - `address` (string): Adresse de l'utilisateur.
  - `zip_code` (string): Code postal de l'utilisateur.
  - `city` (string): Ville de l'utilisateur.
  - `phone_number` (string): Numéro de téléphone de l'utilisateur.
- **Exemple de Corps de Requête:**
  ~~~ json
  {
  "lastname": "Doe",
  "firstname": "John",
  "pseudo": "john_doe",
  "birthdate": "1990-01-01",
  "address": "123 Main St",
  "zip_code": "12345",
  "city": "Cityville",
  "phone_number": "555-1234"
  }
  ~~~
- **Exemple de Réponse en Cas de Succès:**
  ~~~ json
  {
  "status": 201,
  "success": true,
  "message": "L'utilisateur a été modifié avec succès",
  "user": {
      "id": "abc123",
      "lastname": "Doe",
      "firstname": "John",
      "pseudo": "john_doe",
      // ...
  }
  }
  ~~~
## 5\. Modifier l'Adresse E-mail d'un Utilisateur par son ID
- **URL:** `/user/:id`
- **Méthode:** `PATCH`
- **Description:** Modifie l'adresse e-mail d'un utilisateur spécifique en fonction de son ID.
- **Paramètres Requis dans l'URL:**
  - `id` (string): ID de l'utilisateur.
- **Paramètres Requis dans le Corps de la Requête:**
  - `email` (string): Nouvelle adresse e-mail de l'utilisateur.
- **Exemple de Corps de Requête:**
  ~~~ json
  {
  "email": "new_email@example.com"
  }
  ~~~
- **Exemple de Réponse en Cas de Succès:**
  ~~~ json
  {
  "status": 201,
  "success": true,
  "message": "L'email a été modifié avec succès",
  "user": {
      "id": "abc123",
      "pseudo": "john_doe",
      "email": "new_email@example.com",
      // ...
  }
  }
  ~~~
## 6\. Supprimer un Utilisateur par son ID
- **URL:** `/user/:id`
- **Méthode:** `DELETE`
- **Description:** Supprime un utilisateur spécifique en fonction de son ID.
- **Paramètres Requis dans l'URL:**
  - `id` (string): ID de l'utilisateur.
- **Exemple de Réponse en Cas de Succès:**
  ~~~ json
  {
  "status": 200,
  "success": true,
  "message": "Utilisateur supprimé avec succès"
  }
  ~~~
-----
