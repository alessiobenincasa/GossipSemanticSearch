from flask import Flask, request, jsonify
from flask_cors import CORS  # Importer Flask-CORS
from sentence_transformers import SentenceTransformer
import pandas as pd
import numpy as np
from scipy.spatial.distance import cosine

app = Flask(__name__)

# Appliquer CORS à toute l'application
CORS(app)

model = SentenceTransformer('all-MiniLM-L6-v2')

articles_df = pd.read_csv('../../data/articles_with_embeddings.csv')
articles_df['embedding'] = articles_df['embedding'].apply(eval)

@app.route('/search', methods=['POST'])
def search():
    # Get the user's query
    data = request.json
    query = data.get('query', '')

    if not query:
        return jsonify({"error": "Query is required"}), 400

    query_embedding = model.encode(query)

    results = []
    for _, row in articles_df.iterrows():
        article_embedding = np.array(row['embedding'])
        similarity = 1 - cosine(query_embedding, article_embedding)  
        results.append((row['title'], row['link'], similarity))

    results = sorted(results, key=lambda x: x[2], reverse=True)

    response = [
        {"title": title, "link": link, "similarity": similarity}
        for title, link, similarity in results[:5]
    ]
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
