class ProductSearch {
    constructor(productType) {
        this.productType = productType;
        this.productLoader = new ProductLoader();
        this.productGrid = document.getElementById('productGrid');
        this.searchBox = document.querySelector('input[type="search"]');
        this.categoryFilter = document.getElementById('categoryFilter');
        this.sortFilter = document.getElementById('sortFilter');

        this.initializeSearch();
        this.initializeCategoryFilter();
        this.initializeSortFilter();
    }

    initializeSearch() {
        if (this.searchBox) {
            this.searchBox.addEventListener('input', async () => {
                const products = await this.productLoader.loadProducts(this.productType);
                const filteredProducts = this.filterBySearch(products);
                const sortedProducts = this.sortProducts(filteredProducts);
                this.renderSearchResults(sortedProducts);
            });
        }
    }

    filterBySearch(products) {
        const searchTerm = this.searchBox?.value?.toLowerCase() || '';
        if (!searchTerm) return products;

        return products.filter(product => {
            if (product.name.toLowerCase().includes(searchTerm)) {
                return true; // Match found in product name
            }

            for (const key in product.attributes) {
                if (product.attributes.hasOwnProperty(key)) {
                    const attributeValue = String(product.attributes[key]).toLowerCase();
                    if (attributeValue.includes(searchTerm)) {
                        return true; // Match found in attribute value
                    }
                }
            }
            return false; // No match found
        });
    }

    sortProducts(products) {
        if (!this.sortFilter?.value) return products;
        const sortValue = this.sortFilter.value;
         return [...products].sort((a, b) => {
            if (sortValue === 'name-asc') {
                return a.name.localeCompare(b.name);
            } else if (sortValue === 'name-desc') {
                return b.name.localeCompare(a.name);
            } else if (sortValue === 'grammage-high') {
                return parseFloat(b.attributes.grammage) - parseFloat(a.attributes.grammage);
            } else if (sortValue === 'grammage-low') {
                 return parseFloat(a.attributes.grammage) - parseFloat(b.attributes.grammage);
            }
            return 0;
        });
    }
    filterByCategory(products) {
        const category = this.categoryFilter?.value;
        if (!category) return products;
        
        return products.filter(product => {
            if (category === 'Short Sleeve') {
                return product.attributes.category === 'Short Sleeve';
            }
            if (category === 'Undershirt') {
                return product.attributes.category === 'Undershirt';
            }
            return true;
        });
    }
    initializeCategoryFilter() {
        if (this.categoryFilter) {
            this.categoryFilter.addEventListener('change', async () => {
                const products = await this.productLoader.loadProducts(this.productType);
                const filteredProducts = this.filterByCategory(products);
                const sortedProducts = this.sortProducts(filteredProducts);
                this.renderSearchResults(sortedProducts);
            });
        }
    }

    getMensWearTemplate(product) {
        return `
            <div class="product-card">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" class="w-full h-64 object-cover">
                </div>
                <div class="p-4">
                    <div class="flex justify-between items-start mb-2">
                        <div>
                            <h2 class="text-xl font-semibold mb-1">${product.name}</h2>
                        </div>
                        <button class="text-gray-400 hover:text-red-500" aria-label="Add to wishlist">
                            <i class="far fa-heart text-xl"></i>
                        </button>
                    </div>
                    <div class="specifications text-sm text-gray-600 mt-2">
                        <p><span class="attribute-key">Category:</span> <span class="attribute-value">${product.attributes.category}</span></p>
                        <p><span class="attribute-key">Size:</span> <span class="attribute-value">${product.attributes.size}</span></p>
                        <p><span class="attribute-key">Grammage:</span> <span class="attribute-value">${product.attributes.grammage}</span></p>
                        <p><span class="attribute-key">Composition:</span> <span class="attribute-value">${product.attributes.composition}</span></p>
                    </div>
                    <div class="flex justify-between items-center mt-4">
                         <a href="product-detail.html?id=${product.id}&type=men" 
                           class="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                            More Details
                        </a>
                         <a href="contact-us.html" 
                           class="inline-block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                            Enquire Now
                        </a>
                    </div>
                </div>
            </div>
        `;
    }
    getWomensWearTemplate(product) {
        return `
            <div class="product-card">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" class="w-full h-64 object-cover">
                </div>
                <div class="p-4">
                    <div class="flex justify-between items-start mb-2">
                        <div>
                            <h2 class="text-xl font-semibold mb-1">${product.name}</h2>
                        </div>
                        <button class="text-gray-400 hover:text-red-500" aria-label="Add to wishlist">
                            <i class="far fa-heart text-xl"></i>
                        </button>
                    </div>
                    <div class="specifications text-sm text-gray-600 mt-2">
                        <p><span class="attribute-key">Category:</span> <span class="attribute-value">${product.attributes.category}</span></p>
                        <p><span class="attribute-key">Size:</span> <span class="attribute-value">${product.attributes.size}</span></p>
                        <p><span class="attribute-key">Grammage:</span> <span class="attribute-value">${product.attributes.grammage}</span></p>
                        <p><span class="attribute-key">Composition:</span> <span class="attribute-value">${product.attributes.composition}</span></p>
                    </div>
                    <div class="flex justify-between items-center mt-4">
                        <a href="product-detail.html?id=${product.id}&type=women" 
                           class="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                            More Details
                        </a>
                        <a href="contact-us.html" 
                           class="inline-block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                            Enquire Now
                        </a>
                    </div>
                </div>
            </div>
        `;
    }
    renderSearchResults(products) {
        this.productGrid.innerHTML = '';
        products.forEach(product => {
            const productHTML = this.productType === 'women' 
                ? this.getWomensWearTemplate(product)
                : this.getMensWearTemplate(product);
            this.productGrid.insertAdjacentHTML('beforeend', productHTML);
        });
    }

    initializeSortFilter() {
        if (this.sortFilter) {
            this.sortFilter.addEventListener('change', async () => {
                const products = await this.productLoader.loadProducts(this.productType);
                 const filteredProducts = this.filterByCategory(products);
                const sortedProducts = this.sortProducts(filteredProducts);
                this.renderSearchResults(sortedProducts);
            });
        }

    }
}