from sentence_transformers import SentenceTransformer
import pandas as pd

model = SentenceTransformer('all-MiniLM-L6-v2')

df = pd.read_csv('../../data/articles.csv')

embeddings = model.encode(df['summary'].tolist()) 

df['embedding'] = embeddings.tolist()

df.to_csv('../../data/articles_with_embeddings.csv', index=False)

print("Embeddings successfully created and saved.")
