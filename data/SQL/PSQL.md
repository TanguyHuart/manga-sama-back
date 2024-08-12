## Instructions PostgreSQL pour la gestion de la base de données

## Pour tout bruler : 

```bash
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
SET search_path TO public;
```

### Cas Local

### Création des tables

Pour créer les tables dans la base de données locale, utilisez la commande suivante :

```bash
psql -U <utilisateur_local> -d <nom_base_de_données_local> -f data/create_tables.sql
```

### Remplissage des tables

Pour ajouter des données aux tables locales, exécutez la commande :

```bash
psql -U <utilisateur_local> -d <nom_base_de_données_local> -f data/populate_tables.sql
```

### Sauvegarde de la base de données

Si tu souhaites sauvegarder la base de données locale, utilise la commande :

```bash
pg_dump -U <utilisateur_local> -d <nom_base_de_données_local> > backup.sql
```

Si tu souhaites sauvegarder toutes les bases de données utilise la commande :

```bash
pg_dumpall -U postgres -f /chemin/vers/ma_sauvegarde.sql
```

### Restauration de la base de données depuis une sauvegarde

Pour restaurer la base de données locale depuis une sauvegarde, utilisez la commande :

```bash
psql -U <utilisateur_local> -d <nom_base_de_données_local> < backup.sql
```

### Cas Distant

### Création des tables

Pour créer les tables dans la base de données à distance, utilisez la commande suivante :

```bash
psql "postgresql://Amine03824:L2uwqH1ovtpG@ep-noisy-butterfly-47808311-pooler.eu-central-1.aws.neon.tech/mangadb?sslmode=require" -f data/create_tables.sql
```

### Remplissage des tables

Pour ajouter des données aux tables à distance, exécutez la commande :

```bash
psql "postgresql://Amine03824:L2uwqH1ovtpG@ep-noisy-butterfly-47808311-pooler.eu-central-1.aws.neon.tech/mangadb?sslmode=require" -f data/populate_tables.sql
```

### Sauvegarde de la base de données

Si tu souhaites sauvegarder la base de données à distance, utilise la commande :

```bash
pg_dump "postgresql://Amine03824:L2uwqH1ovtpG@ep-noisy-butterfly-47808311-pooler.eu-central-1.aws.neon.tech/mangadb?sslmode=require" > backup.sql
```

Si tu souhaites sauvegarder une table spécifique de la base données à distance, utilise la commande :

```bash
pg_dump "postgresql://Amine03824:L2uwqH1ovtpG@ep-noisy-butterfly-47808311-pooler.eu-central-1.aws.neon.tech/mangadb?sslmode=require" --table=manga --file=table_backup.sql --format=plain --no-owner --no-acl
```

// Pour la table des utilisateurs
```bash
pg_dump "postgresql://Amine03824:L2uwqH1ovtpG@ep-noisy-butterfly-47808311-pooler.eu-central-1.aws.neon.tech/mangadb?sslmode=require" -t "public.\"user\"" --column-inserts --exclude-table-data=public."user"(id, created_at, updated_at) > /path/to/backup/user_backup.sql
```


### Restauration de la base de données depuis une sauvegarde

Pour restaurer la base de données à distance depuis une sauvegarde, utilisez la commande :

```bash
psql "postgresql://Amine03824:L2uwqH1ovtpG@ep-noisy-butterfly-47808311-pooler.eu-central-1.aws.neon.tech/mangadb?sslmode=require" < backup.sql
```

Pour restaurer la sauvegarde d'une table spécifique, utilisez la commande :

```bash
psql "postgresql://Amine03824:L2uwqH1ovtpG@ep-noisy-butterfly-47808311-pooler.eu-central-1.aws.neon.tech/mangadb?sslmode=require" -f table_backup.sql
```

### Réinitialisation du schéma (optionnel)

Pour réinitialiser le schéma dans la base de données à distance, utilisez les commandes suivantes :

```bash
psql "postgresql://Amine03824:L2uwqH1ovtpG@ep-noisy-butterfly-47808311-pooler.eu-central-1.aws.neon.tech/mangadb?sslmode=require" -c "DROP SCHEMA public CASCADE;"
psql "postgresql://Amine03824:L2uwqH1ovtpG@ep-noisy-butterfly-47808311-pooler.eu-central-1.aws.neon.tech/mangadb?sslmode=require" -c "CREATE SCHEMA public;"
```
