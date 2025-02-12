const getProducts = (page, limit) => {
  return new Promise((resolve) => {
    const db = request.result;
    const transaction = db.transaction(['products'], 'readonly');
    const store = transaction.objectStore('products');
    
    const start = (page - 1) * limit;
    const end = start + limit;
    
    const products = [];
    store.openCursor().onsuccess = (event) => {
      const cursor = event.target.result;
      if (cursor && products.length < end) {
        if (products.length >= start) {
          products.push(cursor.value);
        }
        cursor.continue();
      } else {
        resolve(products);
      }
    };
  });
};

class ProductRenderer {
    renderProductImage(product, isDetail = false) {
        const structuredData = {
            "@context": "https://schema.org/",
            "@type": "ImageObject",
            "contentUrl": product.image,
            "name": product.name,
            "description": `Product image of ${product.name}`,
            "width": isDetail ? "1024" : "640",
            "height": isDetail ? "1024" : "640"
        };

        const scriptTag = `
            <script type="application/ld+json">
                ${JSON.stringify(structuredData)}
            </script>
        `;

        return scriptTag + ImageOptimizer.processImage(product.image, {
            width: isDetail ? 1024 : 640,
            height: isDetail ? 1024 : 640,
            alt: `${product.name} - ${product.attributes.category}`,
            title: product.name,
            className: isDetail ? 'product-detail-image' : 'product-grid-image'
        });
    }

    renderProductGrid(products) {
        return products.map(product => `
            <div class="product-card">
                ${this.renderProductImage(product)}
                <h3>${product.name}</h3>
            </div>
        `).join('');
    }
}