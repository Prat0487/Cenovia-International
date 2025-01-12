class ProductSearch {
  constructor() {
    this.productLoader = new ProductLoader();
    this.searchInput = document.querySelector('input[type="search"]');
    this.productGrid = document.getElementById('productGrid');
    this.initializeSearch();
  }

  initializeSearch() {
    this.searchInput.addEventListener('input', this.debounce(async (e) => {
      const searchTerm = e.target.value.toLowerCase();
      const products = await this.productLoader.loadProducts('silvercraft');
      const filteredProducts = this.filterProducts(products, searchTerm);
      this.renderSearchResults(filteredProducts);
    }, 300));
  }

  filterProducts(products, searchTerm) {
    return products.filter(product => 
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm)
    );
  }

  renderSearchResults(products) {
    this.productGrid.innerHTML = '';
    products.forEach(product => {
      const productHTML = `
        <article class="product-card">
          <div class="product-image">
            <img src="${product.image}" alt="${product.name}" class="w-full h-64 object-cover">
            <div class="quick-view">
              <button class="bg-white text-gray-900 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100">
                Quick View
              </button>
            </div>
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
            <div class="flex justify-between items-center mt-4">
              <span class="text-lg font-bold text-gray-900">${product.price}</span>
              <a href="contact-us.html" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Enquire now
              </a>
            </div>
          </div>
        </article>
      `;
      this.productGrid.insertAdjacentHTML('beforeend', productHTML);
    });
  }

  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
}
