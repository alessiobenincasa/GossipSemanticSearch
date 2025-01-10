import feedparser
import pandas as pd
import os

def get_articles_from_rss(url):
    feed = feedparser.parse(url)
    articles = []

    for entry in feed.entries:
        articles.append({
            'title': entry.title,
            'link': entry.link,
            'summary': entry.summary,
            'published': entry.published
        })

    return articles


vsd_rss_url = 'https://www.vsd.fr/feed'
public_rss_url = 'https://www.public.fr/feed'


vsd_articles = get_articles_from_rss(vsd_rss_url)
public_articles = get_articles_from_rss(public_rss_url)


all_articles = vsd_articles + public_articles

print(f"Total articles scraped: {len(all_articles)}")
for article in all_articles[:5]:  # Affiche les 5 premiers articles pour vérification
    print(article)

os.makedirs('../../data', exist_ok=True)

df = pd.DataFrame(all_articles)
df.to_csv('../../data/articles.csv', index=False)

if os.path.exists('../../data/articles.csv'):
    print("Articles successfully saved to ../../data/articles.csv")
else:
    print("Failed to save articles to CSV")