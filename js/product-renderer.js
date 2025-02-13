class ProductRenderer {
  constructor() {
      this.cache = new Map();
      this.pageSize = 12;
  }

  async getProducts(page, category) {
      const cacheKey = `${category}-${page}`;
        
      // Check cache first
      if (this.cache.has(cacheKey)) {
          return this.cache.get(cacheKey);
      }

      const start = (page - 1) * this.pageSize;
      const products = await this.fetchProducts(category, start, this.pageSize);
        
      // Cache the results
      this.cache.set(cacheKey, products);
        
      // Clear old cache entries
      if (this.cache.size > 10) {
          const firstKey = this.cache.keys().next().value;
          this.cache.delete(firstKey);
      }

      return products;
  }

  renderProducts(products, container) {
      const fragment = document.createDocumentFragment();
        
      products.forEach(product => {
          const element = this.createProductElement(product);
          fragment.appendChild(element);
      });

      container.appendChild(fragment);
  }
}