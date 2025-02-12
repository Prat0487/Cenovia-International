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
    renderProductImage(product) {
        return ImageOptimizer.processImage(product.image, {
            width: 400,
            quality: 85,
            alt: product.name,
            className: 'product-image rounded-lg shadow-md'
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
