# FrontEnd

Ce répertoire contient l'interface utilisateur du projet d'analyse d'appels d'offres pour Cofomo. Ce dernier est hébergé dans un bucket S3.

## Scripts

### Démarrer le serveur de développement

Lance l'application en mode développement avec Vite.
Accessible par défaut sur http://localhost:5173

```bash
npm run dev
```

### Construire l'application

Compile les fichiers TypeScript, puis génère les fichiers de production avec Vite.

```bash
npm run build
```

### Linter le projet

Analyse le code source avec ESLint pour détecter les erreurs et les problèmes de style.

```bash
npm run lint
```

### Prévisualiser la version de production

Lance un serveur local sur le port 8080 pour tester la build finale.

```bash
npm run preview
```

## Déploiement continu

Le déploiement de l'application sur S3 s'effectue automatiquement à chaque push sur la branche `main` grâce à **GitHub Actions**.

### Secrets requis

Le dépôt doit contenir les **secrets GitHub** suivants (dans `Settings > Secrets and variables > Actions` > `Secrets`) :

| Nom du secret           | Description                                  |
| ----------------------- | -------------------------------------------- |
| `AWS_S3_BUCKET`         | Nom du bucket S3 de destination              |
| `AWS_ACCESS_KEY_ID`     | Identifiant d'accès AWS                      |
| `AWS_SECRET_ACCESS_KEY` | Clé secrète AWS associée à l'identifiant     |
| `AWS_REGION`            | Région AWS du bucket (ex. `us-east-2`)       |
