class ProductSearch {
    constructor(productType = 'silvercraft') {
        this.productType = productType;
        this.productLoader = new ProductLoader();
        this.searchInput = document.querySelector('input[type="search"]');
        this.categoryFilter = document.getElementById('categoryFilter');
        this.productGrid = document.getElementById('productGrid');
        this.initializeSearch();
        this.initializeCategoryFilter();
    }

    initializeSearch() {
        this.searchInput.addEventListener('input', this.debounce(async (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const products = await this.productLoader.loadProducts(this.productType);
            const filteredProducts = this.filterProducts(products, searchTerm);
            this.renderSearchResults(filteredProducts);
        }, 300));
    }

    initializeCategoryFilter() {
        if (this.categoryFilter) {
            this.categoryFilter.addEventListener('change', async () => {
                const products = await this.productLoader.loadProducts(this.productType);
                const filteredProducts = this.filterByCategory(products);
                this.renderSearchResults(filteredProducts);
            });
        }
    }

    filterByCategory(products) {
        const category = this.categoryFilter?.value;
        if (!category) return products;
        
        return products.filter(product => {
            if (category === 'fine') {
                return product.attributes.material === 'Fine Silver';
            }
            if (category === 'sterling') {
                return product.attributes.material === 'Sterling Silver';
            }
            return true;
        });
    }

    filterProducts(products, searchTerm) {
        const categoryFiltered = this.filterByCategory(products);
        if (!searchTerm) return categoryFiltered;

        return categoryFiltered.filter(product => 
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
                        ${this.getSpecificationsTemplate(product)}
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

    getSpecificationsTemplate(product) {
        if (this.productType === 'silvercraft') {
            return `
                <div class="specifications text-sm text-gray-600 mt-2">
                    <p>Material: ${product.attributes.material}</p>
                    <p>Weight: ${product.attributes.weight}g</p>
                    <p>Purity: ${product.attributes.purity}</p>
                </div>
            `;
        } else {
            return `
                <div class="specifications text-sm text-gray-600 mt-2">
                    <p>Sport Type: ${product.attributes.sportType}</p>
                    <p>Age Group: ${product.attributes.ageGroup}</p>
                    <p>Skill Level: ${product.attributes.skill_level}</p>
                    <p>Warranty: ${product.attributes.warranty}</p>
                </div>
            `;
        }
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