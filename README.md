Semantic Search
Description
Ce projet implémente un moteur de recherche sémantique permettant de rechercher des articles en utilisant des embeddings générés par un modèle de langage de type Sentence-BERT. Il permet de rechercher des articles en fonction de leur similarité avec une requête utilisateur, en comparant les embeddings des articles avec celui de la requête.

Fonctionnalités
Calcul des embeddings des articles via un modèle de langage de type Sentence-BERT.
Recherche sémantique des articles en fonction de leur similarité avec une requête donnée.
API backend construite avec Flask pour effectuer la recherche.
Frontend développé avec React pour l'interface utilisateur.
Architecture
Le projet est divisé en deux parties principales :

Backend (Flask) : L'API qui gère le calcul des embeddings des articles et la recherche de similarité.
Frontend (React) : L'interface utilisateur qui permet à l'utilisateur de soumettre une requête et d'afficher les résultats de recherche.
Prérequis
Avant de commencer, assurez-vous d'avoir installé les éléments suivants sur votre machine :

Python 3.x
Node.js (pour React)
Pip (gestionnaire de paquets Python)
Backend
Flask
Flask-CORS
pandas
numpy
scipy
sentence-transformers
Frontend
React
Axios (ou Fetch pour les requêtes HTTP)
Installation
Backend
Clonez le repository.
Allez dans le répertoire du backend (backend/).
Créez un environnement virtuel (optionnel mais recommandé) :
bash
Copier le code
python3 -m venv venv
source venv/bin/activate  # Sur Windows utilisez `venv\Scripts\activate`
Installez les dépendances :
bash
Copier le code
pip install -r requirements.txt
Téléchargez le modèle Sentence-BERT en exécutant :
bash
Copier le code
from sentence_transformers import SentenceTransformer
model = SentenceTransformer('all-MiniLM-L6-v2')
Lancez l'API Flask :
bash
Copier le code
python app.py
L'API sera accessible à l'adresse http://127.0.0.1:5000.
Frontend
Allez dans le répertoire du frontend (frontend/).
Installez les dépendances :
bash
Copier le code
npm install
Lancez l'application React :
bash
Copier le code
npm start
L'application sera accessible à l'adresse http://localhost:3000.
Utilisation
Frontend : Ouvrez l'application React dans votre navigateur. Entrez une requête dans la barre de recherche et cliquez sur "Search". Les résultats les plus pertinents seront affichés sous la forme d'articles avec leur titre, lien et score de similarité.

Backend : L'API Flask accepte des requêtes POST à l'endpoint /search avec un corps JSON contenant la clé query (la requête de recherche). L'API renverra les résultats de la recherche sous forme de JSON.

Exemple de requête
Requête POST (vers http://127.0.0.1:5000/search):

json
Copier le code
{
  "query": "Développement web"
}
Réponse JSON :

json
Copier le code
[
  {
    "title": "Introduction au développement web",
    "link": "https://example.com/article1",
    "similarity": 0.92
  },
  {
    "title": "Les bases du JavaScript",
    "link": "https://example.com/article2",
    "similarity": 0.89
  }
]
Structure du Code
Backend
app.py : Fichier principal du serveur Flask, qui gère les requêtes et effectue la recherche.
data/articles_with_embeddings.csv : Contient les articles avec leurs embeddings calculés.
Frontend
App.js : Composant principal React qui gère la recherche et l'affichage des résultats.
App.css : Styles pour l'interface utilisateur.
public/index.html : Structure HTML de base pour l'application React.
Améliorations possibles
Ajouter un traitement des erreurs plus robuste côté frontend et backend.
Implémenter une pagination ou un chargement infini des résultats.
Optimiser les performances pour des datasets plus volumineux en utilisant des techniques comme l'indexation d'ANN (Approximate Nearest Neighbor).
Contribuer
Forkez le projet.
Créez une branche (git checkout -b feature-xyz).
Effectuez vos modifications.
Soumettez une Pull Request avec une description de vos changements.
Auteurs
Alessio Benincasa - Développeur principal et concepteur de ce moteur de recherche sémantique.


