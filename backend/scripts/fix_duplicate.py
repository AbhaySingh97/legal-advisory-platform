import json

# Load the data
with open('data/constitution_data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Remove the shorter Article 370 (keep the detailed one)
articles = []
for article in data['articles']:
    if article['number'] == '370' and len(article['description']) < 200:
        print(f"Removing short Article 370: {article['title']}")
        continue
    articles.append(article)

data['articles'] = articles

# Save back
with open('data/constitution_data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f"Fixed! Total articles: {len(articles)}")
