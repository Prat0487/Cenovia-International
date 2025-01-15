class InfiniteScroll {
  constructor() {
    this.productLoader = new ProductLoader();
    this.container = document.getElementById('productGrid');
    this.loading = false;
    this.page = 1;
    this.hasMore = true;
    
    this.observer = new IntersectionObserver(this.handleIntersect.bind(this), {
      rootMargin: '100px'
    });
    
    this.loadingIndicator = document.createElement('div');
    this.loadingIndicator.className = 'loading-indicator flex justify-center p-8';
    this.loadingIndicator.innerHTML = `
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    `;
  }

  async init() {
    // Clear existing content
    this.container.innerHTML = '';
    await this.loadMoreProducts();
    this.observer.observe(this.loadingIndicator);
    this.container.appendChild(this.loadingIndicator);
  }

  async handleIntersect(entries) {
    const entry = entries[0];
    if (entry.isIntersecting && !this.loading && this.hasMore) {
      await this.loadMoreProducts();
    }
  }

  async loadMoreProducts() {
    this.loading = true;
    const products = await this.productLoader.loadProducts('silvercraft');
    const startIndex = (this.page - 1) * 8;
    const endIndex = startIndex + 8;
    const pageProducts = products.slice(startIndex, endIndex);

    if (pageProducts.length === 0) {
      this.hasMore = false;
      this.loadingIndicator.remove();
      return;
    }

    pageProducts.forEach(product => {
      const productHTML = productTemplates.silvercraft(product);
      this.container.insertAdjacentHTML('beforeend', productHTML);
    });

    this.page++;
    this.loading = false;
  }
}

// Initialize infinite scroll
document.addEventListener('DOMContentLoaded', () => {
  const infiniteScroll = new InfiniteScroll();
  infiniteScroll.init();
});