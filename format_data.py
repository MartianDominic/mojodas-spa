import json
import os
from datetime import datetime

# Load consolidated products
with open('/tmp/consolidated_products.json', 'r') as f:
    products = json.load(f)

# Prepare directory structure
os.makedirs('data/scraped', exist_ok=True)

# Format for data/scraped/products.json
final_products = []
for p in products:
    # Need to adapt to the schema in SCRAPING_TASK.md
    slug = p['name'].lower().replace(' ', '-').replace('„', '').replace('“', '').replace('*', '').replace('(', '').replace(')', '').replace('š', 's').replace('č', 'c').replace('ė', 'e').replace('ų', 'u').replace('ū', 'u').replace('į', 'i').strip('-')
    
    # Clean up name from taglines if they got mixed
    name = p['name'].replace(' kubilas', '')
    
    # Process images for local paths
    hero_imgs = []
    for i, url in enumerate(p.get('images', {}).get('hero', [])):
        ext = url.split('.')[-1].split('?')[0] # handle query params
        local_path = f"images/products/{slug}/hero-{i+1}.{ext}"
        hero_imgs.append({"url": url, "localPath": local_path})
        
    gallery_imgs = []
    for i, url in enumerate(p.get('images', {}).get('gallery', [])):
        ext = url.split('.')[-1].split('?')[0]
        local_path = f"images/products/{slug}/gallery-{i+1}.{ext}"
        gallery_imgs.append({"url": url, "localPath": local_path})

    # Prepare specs with local icon paths
    final_specs = []
    for s in p.get('specs', []):
        spec_copy = dict(s)
        icon_url = s.get('iconUrl')
        if icon_url:
            icon_name = icon_url.split('/')[-1].split('?')[0]
            spec_copy['localIcon'] = f"images/icons/{icon_name}"
        final_specs.append(spec_copy)

    final_product = {
        "id": slug,
        "name": name,
        "url": f"https://mojodasspa.com/katalogo-vidinis/{slug}/",
        "tagline": p.get('tagline', ''),
        "shortDescription": p.get('shortDescription', ''),
        "longDescription": p.get('longDescription', ''),
        "specs": final_specs,
        "images": {
            "hero": hero_imgs,
            "gallery": gallery_imgs
        },
        "relatedProducts": p.get('relatedProducts', []),
        "configurableOptions": ["acrylicColor", "woodFinish", "thermoCover", "accessories"]
    }
    final_products.append(final_product)

products_data = {
    "scrapedAt": datetime.utcnow().isoformat() + "Z",
    "sourceUrl": "https://mojodasspa.com",
    "totalProducts": len(final_products),
    "products": final_products
}

with open('data/scraped/products.json', 'w', encoding='utf-8') as f:
    json.dump(products_data, f, indent=2, ensure_ascii=False)

# Build config-options.json
reference_config = products[0].get('configOptions', {})
acrylic_options = []
for i, c in enumerate(reference_config.get('acrylicColors', [])):
    url = c.get('imageUrl')
    if url:
        ext = url.split('.')[-1].split('?')[0]
        local_img = f"images/config/acrylic/acrylic-{i+1}.{ext}"
        acrylic_options.append({
            "id": c['name'].lower().replace(' ', '-'),
            "name": c['name'],
            "image": local_img,
            "originalUrl": url
        })

wood_options = []
for i, w in enumerate(reference_config.get('woodFinishes', [])):
    url = w.get('imageUrl')
    if url:
        ext = url.split('.')[-1].split('?')[0]
        local_img = f"images/config/wood/wood-{i+1}.{ext}"
        wood_options.append({
            "id": w['name'].lower().replace(' ', '-'),
            "name": w['name'],
            "image": local_img,
            "originalUrl": url
        })

config_data = {
    "scrapedAt": datetime.utcnow().isoformat() + "Z",
    "acrylicColors": {
        "title": "Akrilo įdėklo spalvos pasirinkimas",
        "options": acrylic_options
    },
    "woodFinishes": {
        "title": "Kubilo apdailos pasirinkimas",
        "options": wood_options
    }
}

with open('data/scraped/config-options.json', 'w', encoding='utf-8') as f:
    json.dump(config_data, f, indent=2, ensure_ascii=False)

with open('data/scraped/metadata.json', 'w', encoding='utf-8') as f:
    json.dump({"status": "completed", "scrapedAt": datetime.utcnow().isoformat() + "Z", "productsCount": len(final_products)}, f, indent=2)

print("JSON files successfully saved to data/scraped/")

# Generate image download bash script
with open('download_images.sh', 'w') as f:
    f.write("#!/bin/bash\n\n")
    # Download product images
    for p in final_products:
        slug = p['id']
        f.write(f"mkdir -p data/images/products/{slug}\n")
        for img in p['images']['hero']:
            f.write(f"curl -s -L -o data/{img['localPath']} '{img['url']}' &\n")
        for img in p['images']['gallery']:
            f.write(f"curl -s -L -o data/{img['localPath']} '{img['url']}' &\n")
        
        # Download icons
        f.write('mkdir -p data/images/icons\n')
        for spec in p.get('specs', []):
            if 'iconUrl' in spec and 'localIcon' in spec:
                f.write(f"curl -s -L -o data/{spec['localIcon']} '{spec['iconUrl']}' &\n")

    # Download config images
    f.write('mkdir -p data/images/config/acrylic data/images/config/wood\n')
    for opt in acrylic_options:
        f.write(f"curl -s -L -o data/{opt['image']} '{opt['originalUrl']}' &\n")
    for opt in wood_options:
        f.write(f"curl -s -L -o data/{opt['image']} '{opt['originalUrl']}' &\n")
    
    f.write("wait\n")
    f.write("echo 'All images downloaded.'\n")

print("Generated download_images.sh")
