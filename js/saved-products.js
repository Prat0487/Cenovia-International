class SavedProducts {
    constructor() {
        this.grid = document.getElementById('savedProductsGrid');
        this.loader = new ProductLoader();
        this.wishlistKey = 'cenoviaWishlist';
        this.init();
    }

    async init() {
        const [menProducts, womenProducts] = await Promise.all([
            this.loader.loadProducts('men'),
            this.loader.loadProducts('women')
        ]);
        this.products = [
            ...menProducts.map(product => ({ ...product, productType: 'men' })),
            ...womenProducts.map(product => ({ ...product, productType: 'women' }))
        ];
        this.render();
    }

    getWishlist() {
        try {
            return JSON.parse(localStorage.getItem(this.wishlistKey)) || [];
        } catch (error) {
            return [];
        }
    }

    saveWishlist(wishlist) {
        localStorage.setItem(this.wishlistKey, JSON.stringify(wishlist));
    }

    render() {
        const wishlist = this.getWishlist();
        const savedProducts = this.products.filter(product => wishlist.includes(`${product.productType}:${product.id}`));

        if (!savedProducts.length) {
            this.grid.innerHTML = `
                <div class="col-span-full bg-white border border-gray-200 rounded-lg p-8 text-center">
                    <h2 class="text-2xl font-semibold text-gray-800 mb-3">No saved products yet</h2>
                    <p class="text-gray-600 mb-6">Use the heart button on catalog cards to build a shortlist.</p>
                    <div class="flex flex-wrap justify-center gap-3">
                        <a href="product-menswear.html" class="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors">Browse Menswear</a>
                        <a href="product-womenswear.html" class="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition-colors">Browse Womenswear</a>
                    </div>
                </div>
            `;
            return;
        }

        this.grid.innerHTML = savedProducts.map(product => this.getCard(product)).join('');
        this.grid.querySelectorAll('.remove-saved').forEach(button => {
            button.addEventListener('click', () => {
                const key = `${button.dataset.productType}:${button.dataset.productId}`;
                this.saveWishlist(this.getWishlist().filter(item => item !== key));
                this.render();
            });
        });
    }

    getCard(product) {
        const params = new URLSearchParams({
            product: product.name,
            type: product.productType,
            category: product.attributes.category || ''
        });

        return `
            <div class="product-card bg-white">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" loading="lazy" decoding="async">
                </div>
                <div class="p-4">
                    <div class="flex justify-between items-start gap-3 mb-2">
                        <div>
                            <p class="text-xs uppercase tracking-wide text-gray-500">${product.productType === 'women' ? 'Womenswear' : 'Menswear'}</p>
                            <h2 class="text-xl font-semibold">${product.name}</h2>
                        </div>
                        <button class="remove-saved text-red-500 hover:text-red-600" data-product-id="${product.id}" data-product-type="${product.productType}" aria-label="Remove ${product.name}">
                            <i class="fas fa-heart text-xl"></i>
                        </button>
                    </div>
                    <div class="specifications text-sm text-gray-600 mt-2">
                        <p><span class="attribute-key">Category:</span> <span class="attribute-value">${product.attributes.category}</span></p>
                        <p><span class="attribute-key">Size:</span> <span class="attribute-value">${product.attributes.size}</span></p>
                        <p><span class="attribute-key">Grammage:</span> <span class="attribute-value">${product.attributes.grammage}</span></p>
                        <p><span class="attribute-key">Composition:</span> <span class="attribute-value">${product.attributes.composition}</span></p>
                    </div>
                    <div class="flex flex-wrap gap-3 mt-4">
                        <a href="product-detail.html?id=${product.id}&type=${product.productType}" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">More Details</a>
                        <a href="contact-us.html?${params.toString()}" class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">Enquire Now</a>
                    </div>
                </div>
            </div>
        `;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new SavedProducts();
});
