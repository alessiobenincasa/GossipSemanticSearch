# GOSSIP SEMANTIC SEARCH

## **Description**

Ce projet implémente un moteur de recherche **sémantique** permettant de rechercher des **articles** en utilisant des **embeddings** générés par un modèle de langage de type **Sentence-BERT**. Il permet de rechercher des articles en fonction de leur **similarité** avec une requête utilisateur, en comparant les embeddings des articles avec celui de la requête.

## **Fonctionnalités**
- Calcul des **embeddings** des articles via un modèle de langage de type **Sentence-BERT**.
- Recherche **sémantique** des articles en fonction de leur **similarité** avec une requête donnée.
- **API backend** construite avec **Flask** pour effectuer la recherche.
- **Frontend** développé avec **React** pour l'interface utilisateur.

## **Architecture**
Le projet est divisé en deux parties principales :
- **Backend (Flask)** : L'**API** qui gère le calcul des **embeddings** des articles et la recherche de **similarité**.
- **Frontend (React)** : L'interface utilisateur qui permet à l'utilisateur de soumettre une requête et d'afficher les résultats de recherche.
### Description des fichiers

#### `import_data.py`

Ce script récupère des articles à partir de deux flux RSS (VSD et Public) en utilisant la bibliothèque **feedparser**. Il extrait des informations clés comme le titre, le résumé, le lien, et la date de publication des articles. Une fois les articles récupérés, ils sont stockés sous forme de dictionnaires, combinés dans une liste, et sauvegardés dans un fichier CSV nommé **articles.csv**.

Les étapes principales du script :
1. **Récupération** des articles à partir de deux flux RSS (VSD et Public).
2. **Création d'un DataFrame** avec les articles récupérés.
3. **Sauvegarde** du DataFrame dans un fichier **articles.csv**.

#### `generate_embeddings.py`

Ce script utilise le modèle **all-MiniLM-L6-v2** de la bibliothèque **sentence-transformers** pour générer des embeddings à partir des résumés des articles présents dans le fichier **articles.csv**. Chaque résumé est encodé en un vecteur d'embeddings, qui est ensuite ajouté comme une nouvelle colonne dans le DataFrame. Le fichier modifié est sauvegardé sous le nom **articles_with_embeddings.csv**.

Les étapes principales du script :
1. **Chargement des articles** depuis **articles.csv**.
2. **Génération des embeddings** des résumés des articles.
3. **Sauvegarde** du DataFrame avec les embeddings dans **articles_with_embeddings.csv**.

Ces deux fichiers sont nécessaires pour récupérer les articles à partir des flux RSS, puis générer et sauvegarder les embeddings pour chaque résumé.


## **Prérequis**
Avant de commencer, assurez-vous d'avoir installé les éléments suivants sur votre machine :
- **Python 3.x**
- **Node.js** (pour React)
- **Pip** (gestionnaire de paquets Python)

### **Backend**
- **Flask**
- **Flask-CORS**
- **pandas**
- **numpy**
- **scipy**
- **sentence-transformers**

### **Frontend**
- **React**
- **Axios** (ou **Fetch** pour les requêtes HTTP)

## **Installation**

### **Backend**
1. Clonez le repository.
2. Allez dans le répertoire du backend (**src/backend/**).
4. Installez les dépendances :
    ```bash
    pip install -r requirements.txt
    ```
5. Importez les données et générez les embeddings avant de démarrer le backend. Exécutez les deux scripts suivants :

- **Importation des données** :
  ```bash
  python import_data.py

- **Génération des embeddings** :
  ```bash
  python generate_embeddings.py

6. Lancez l'API **Flask** :
    ```bash
    python app.py
    ```
    L'**API** sera accessible à l'adresse `http://127.0.0.1:5000`.

### **Frontend**
1. Allez dans le répertoire du frontend (**src/frontend/**).
2. Installez les dépendances :
    ```bash
    npm install
    ```
3. Lancez l'application **React** :
    ```bash
    npm start
    ```
    L'application sera accessible à l'adresse `http://localhost:3000`.

## **Utilisation**

### **Frontend** :
Ouvrez l'application **React** dans votre navigateur. Entrez une requête dans la barre de recherche et cliquez sur **"Search"**. Les résultats les plus pertinents seront affichés sous la forme d'articles avec leur titre, lien et score de similarité.

### **Backend** :
L'**API Flask** accepte des requêtes **POST** à l'endpoint `/search` avec un corps JSON contenant la clé **query** (la requête de recherche). L'**API** renverra les résultats de la recherche sous forme de JSON.

#### Exemple de requête

**Requête POST** (vers `http://127.0.0.1:5000/search`):

```json
{
  "query": "Développement web"
}

