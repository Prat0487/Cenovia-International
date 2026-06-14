class InfiniteScroll {
    constructor(productType) {
        this.productType = productType;
        this.productLoader = new ProductLoader();
        this.container = document.getElementById('productGrid');
        this.loading = false;
        this.page = 1;
        this.hasMore = true;

        this.observer = new IntersectionObserver(this.handleIntersect.bind(this), {
            rootMargin: '200px' // Increased rootMargin
        });

        this.loadingIndicator = document.createElement('div');
        this.loadingIndicator.className = 'loading-indicator flex justify-center p-8';
        this.loadingIndicator.innerHTML = `
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        `;
    }

    async init() {
        if (!this.productType || !this.container) {
            return;
        }

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
                const template = this.productType === 'men' ? this.getMensWearTemplate(product) : this.getWomensWearTemplate(product);
                this.container.insertAdjacentHTML('beforeend', template);
            });

            this.page++;
            this.loading = false;
        } catch (error) {
            console.error("Error loading products:", error);
            this.loading = false;
        }
    }
    getWomensWearTemplate(product) {
        return `
            <div class="product-card" data-product-id="${product.id}" data-product-type="women">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" loading="lazy" decoding="async">
                </div>
                <div class="p-4">
                    <div class="flex justify-between items-start gap-3 mb-2">
                        <h3 class="font-bold text-lg">${product.name}</h3>
                        <button class="wishlist-btn text-gray-400 hover:text-red-500" data-product-id="${product.id}" data-product-type="women" aria-label="Add ${product.name} to wishlist">
                            <i class="far fa-heart text-xl"></i>
                        </button>
                    </div>
                 <div class="specifications text-sm text-gray-600 mt-2">
                        <p><span class="attribute-key">Category:</span> <span class="attribute-value">${product.attributes.category}</span></p>
                        <p><span class="attribute-key">Size:</span> <span class="attribute-value">${product.attributes.size}</span></p>
                        <p><span class="attribute-key">Grammage:</span> <span class="attribute-value">${product.attributes.grammage}</span></p>
                        <p><span class="attribute-key">Composition:</span> <span class="attribute-value">${product.attributes.composition}</span></p>
                    </div>
                    <div class="mt-4 flex justify-between items-center">
                        <a href="product-detail.html?id=${product.id}&type=women" 
                       class="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                            More Details
                        </a>
                        <a href="${this.getInquiryUrl(product, 'women')}" 
                       class="inline-block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                            Enquire Now
                        </a>
                    </div>
                    <label class="mt-4 flex items-center gap-2 text-sm text-gray-700">
                        <input type="checkbox" class="compare-product rounded border-gray-300" data-product-id="${product.id}" data-product-type="women">
                        Compare
                    </label>
                </div>
            </div>
        `;
    }
    getMensWearTemplate(product) {
        return `
            <div class="product-card" data-product-id="${product.id}" data-product-type="men">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" loading="lazy" decoding="async">
                </div>
                <div class="p-4">
                    <div class="flex justify-between items-start gap-3 mb-2">
                        <h3 class="font-bold text-lg">${product.name}</h3>
                        <button class="wishlist-btn text-gray-400 hover:text-red-500" data-product-id="${product.id}" data-product-type="men" aria-label="Add ${product.name} to wishlist">
                            <i class="far fa-heart text-xl"></i>
                        </button>
                    </div>
                    <div class="specifications text-sm text-gray-600 mt-2">
                        <p><span class="attribute-key">Category:</span> <span class="attribute-value">${product.attributes.category}</span></p>
                        <p><span class="attribute-key">Size:</span> <span class="attribute-value">${product.attributes.size}</span></p>
                        <p><span class="attribute-key">Grammage:</span> <span class="attribute-value">${product.attributes.grammage}</span></p>
                        <p><span class="attribute-key">Composition:</span> <span class="attribute-value">${product.attributes.composition}</span></p>
                    </div>
                    <div class="mt-4 flex justify-between items-center">
                        <a href="product-detail.html?id=${product.id}&type=men" 
                        class="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                            More Details
                        </a>
                        <a href="${this.getInquiryUrl(product, 'men')}" 
                        class="inline-block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                            Enquire Now
                        </a>
                    </div>
                    <label class="mt-4 flex items-center gap-2 text-sm text-gray-700">
                        <input type="checkbox" class="compare-product rounded border-gray-300" data-product-id="${product.id}" data-product-type="men">
                        Compare
                    </label>
                </div>
            </div>
        `;
    }

    getInquiryUrl(product, productType) {
        const params = new URLSearchParams({
            product: product.name,
            type: productType,
            category: product.attributes.category || ''
        });

        return `contact-us.html?${params.toString()}`;
    }
}
