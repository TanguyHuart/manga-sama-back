BEGIN;


-- Suppression des tables si elles existaient déjà

DROP TABLE IF EXISTS "user", "role", "manga", "category", "article", "condition", "user_has_article", "manga_has_article" CASCADE;
DROP DOMAIN IF EXISTS email_domain;
DROP DOMAIN IF EXISTS birthdate_domain;

-- Création des tables

-- Création du domaine email afin de valider la structure d'un email 
CREATE DOMAIN email_domain AS VARCHAR(255);
-- Création du domaine birthdate afin de valider d'une date de naissance
CREATE DOMAIN birthdate_domain AS VARCHAR(15);

-- -----------------------------------------------------
--             Table des utilisateurs                 --
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "user" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY NOT NULL PRIMARY KEY,
  "lastname" VARCHAR(30),
  "firstname" VARCHAR(30),
  "pseudo" VARCHAR(30) UNIQUE NOT NULL,
  "birthdate" birthdate_domain CHECK (
      (birthdate IS NULL OR birthdate = '') OR 
      (birthdate ~* '^[0-9]{4}-[0-9]{2}-[0-9]{2}$')),
  "address" TEXT,
  "zip_code" TEXT,
  "city" TEXT,
  "phone_number" VARCHAR(15),
  "email" email_domain CHECK (email ~* '^[A-Za-z0-9._+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$') UNIQUE NOT NULL,
  "password" VARCHAR(255) NOT NULL,
  "role_id" INTEGER NOT NULL DEFAULT 1, -- L'utilisateur est par défaut limité -- on ne peut pas tout de suite indiquer que cette clé est une clé étrangère qui fait référence à la table role, puisque la table role n'existe pas encore ! (on le fera plus tard)
  "image_profile_url" TEXT, 
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);

-- -----------------------------------------------------
--     Table des rôles associés aux utilisateurs      --
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "role" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY NOT NULL PRIMARY KEY,
  "role_name" VARCHAR(30) NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);

-- -----------------------------------------------------
--                  Table de mangas                   --
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "manga" (
  "code_isbn" VARCHAR(30) NOT NULL PRIMARY KEY,
  "title" VARCHAR(255) NOT NULL,
  "volume" INTEGER NULL,
  "year_publication" INTEGER NOT NULL ,
  "author" VARCHAR(60) NOT NULL,
  "description" TEXT,
  "cover_url" TEXT,
  "category_id" INTEGER NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);

-- -----------------------------------------------------
--                  Table de catégories               --
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "category" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "category_name" VARCHAR(30) NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);


-- Création de l'extension uuid-ossp
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- -----------------------------------------------------
--                 Table des annonces                 --
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "article" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY NOT NULL PRIMARY KEY,
  "title" VARCHAR(255) NOT NULL,
  "description" TEXT,
  "price" INT,
  "transaction_id" VARCHAR(36),
  "date_transaction" DATE,
  "state_completion" VARCHAR(20) DEFAULT 'En ligne',
  "photo_url" TEXT,
  "image_url" TEXT,
  "condition_id" INTEGER NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ   
);

-- -----------------------------------------------------
--         Table d'état des mangas mis en vente       --
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "condition" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY NOT NULL PRIMARY KEY, 
  "condition_name" VARCHAR(30) NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);

-- -----------------------------------------------------
--               Ajout des clés étrangères            --
-- -----------------------------------------------------
-- Maintenant on peut créer la référence vers la table question pour le champ "role_id" dans la table "user" afin de réprésenter notre clé étrangère.
-- On remarquera ici la présence de l'instruction FOREIGN KEY qui dit explicitement que cette colonne sert de clé étrangère faisaint référence à la table question
-- Lors de la création d'une table ce détail est implicite.
ALTER TABLE "user"
  ADD FOREIGN KEY ("role_id") REFERENCES "role" ("id") ON DELETE CASCADE;

ALTER TABLE "manga"
  ADD FOREIGN KEY ("category_id") REFERENCES "category" ("id") ON DELETE CASCADE;

ALTER TABLE "article"
  ADD FOREIGN KEY ("condition_id") REFERENCES "condition" ("id") ON DELETE CASCADE;

-- -----------------------------------------------------
--                 Tables d'association               --
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "user_has_article" (
  "user_id" INTEGER NOT NULL REFERENCES "user" ("id") ON DELETE CASCADE,
  "article_id" INTEGER NOT NULL REFERENCES "article" ("id") ON DELETE CASCADE,
  PRIMARY KEY ("user_id", "article_id")
);

CREATE TABLE IF NOT EXISTS "manga_has_article" (
  "manga_code_isbn" VARCHAR(16) NOT NULL REFERENCES "manga" ("code_isbn") ON DELETE CASCADE,
  "article_id" INTEGER NOT NULL REFERENCES "article" ("id") ON DELETE CASCADE,
  PRIMARY KEY ("manga_code_isbn", "article_id")
);

-- Création de la fonction de déclencheur pour la mise à jour de la colonne updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql; -- Ajout de cette ligne pour terminer le bloc


-- Création du déclencheur pour la table "user"
CREATE TRIGGER user_updated_at_trigger
BEFORE UPDATE ON "user"
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

-- Création du déclencheur pour la table "article"
CREATE TRIGGER article_updated_at_trigger
BEFORE UPDATE ON "article"
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

-- Pour mettre fin au bloc de transaction et l'exécuter
COMMIT;