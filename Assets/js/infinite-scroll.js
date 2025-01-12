class InfiniteScroll {
  constructor(productType) {
      this.productType = productType;
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
      try {
          const products = await this.productLoader.loadProducts(this.productType);
          const startIndex = (this.page - 1) * 8;
          const endIndex = startIndex + 8;
          const pageProducts = products.slice(startIndex, endIndex);

          if (pageProducts.length === 0) {
              this.hasMore = false;
              this.loadingIndicator.remove();
              return;
          }

          pageProducts.forEach(product => {
              const template = this.productType === 'sports' ? this.getSportsTemplate(product) : this.getSilvercraftTemplate(product);
              this.container.insertAdjacentHTML('beforeend', template);
          });

          this.page++;
      } finally {
          this.loading = false;
      }
  }

  getSportsTemplate(product) {
      return `
          <article class="product-card" data-product-id="${product.id}">
              <div class="product-image">
                  <img src="${product.image}" alt="${product.name}" class="w-full h-64 object-cover">
              </div>
              <div class="p-4">
                  <div class="flex justify-between items-start mb-2">
                      <div>
                          <h2 class="text-xl font-semibold mb-1">${product.name}</h2>
                          <p class="text-gray-600">${product.description}</p>
                      </div>
                      <button class="text-gray-400 hover:text-red-500" aria-label="Add to wishlist">
                          <i class="far fa-heart text-xl"></i>
                      </button>
                  </div>
                  <div class="specifications text-sm text-gray-600 mt-2">
                      <p>Sport Type: ${product.attributes.sportType}</p>
                      <p>Age Group: ${product.attributes.ageGroup}</p>
                      <p>Skill Level: ${product.attributes.skill_level}</p>
                      <p>Warranty: ${product.attributes.warranty}</p>
                  </div>
                  <div class="flex justify-between items-center mt-4">
                      <span class="text-lg font-bold text-gray-900">${product.price}</span>
                      <a href="contact-us.html" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                          Enquire now
                      </a>
                  </div>
              </div>
          </article>
      `;
  }

  getSilvercraftTemplate(product) {
      return `
          <article class="product-card" data-product-id="${product.id}">
              <div class="product-image">
                  <img src="${product.image}" alt="${product.name}" class="w-full h-64 object-cover">
              </div>
              <div class="p-4">
                  <div class="flex justify-between items-start mb-2">
                      <div>
                          <h2 class="text-xl font-semibold mb-1">${product.name}</h2>
                          <p class="text-gray-600">${product.description}</p>
                      </div>
                      <button class="text-gray-400 hover:text-red-500" aria-label="Add to wishlist">
                          <i class="far fa-heart text-xl"></i>
                      </button>
                  </div>
                  <div class="specifications text-sm text-gray-600 mt-2">
                      <p>Material: ${product.attributes.material}</p>
                      <p>Weight: ${product.attributes.weight}g</p>
                      <p>Purity: ${product.attributes.purity}</p>
                  </div>
                  <div class="flex justify-between items-center mt-4">
                      <span class="text-lg font-bold text-gray-900">${product.price}</span>
                      <a href="contact-us.html" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                          Enquire now
                      </a>
                  </div>
              </div>
          </article>
      `;
  }
}

// Initialize infinite scroll
document.addEventListener('DOMContentLoaded', () => {
  const infiniteScroll = new InfiniteScroll();
  infiniteScroll.init();
});