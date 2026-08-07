const BuyerUtils = {
    wishlistKey: 'cenoviaWishlist',
    recentKey: 'cenoviaRecentlyViewed',
    maxRecent: 8,

    getWishlist() {
        try {
            return JSON.parse(localStorage.getItem(this.wishlistKey)) || [];
        } catch {
            return [];
        }
    },

    saveWishlist(wishlist) {
        localStorage.setItem(this.wishlistKey, JSON.stringify(wishlist));
        window.dispatchEvent(new CustomEvent('cenovia:wishlist-changed', { detail: { count: wishlist.length } }));
    },

    getWishlistCount() {
        return this.getWishlist().length;
    },

    encodeShortlist(keys) {
        return keys.join(',');
    },

    decodeShortlist(value) {
        if (!value) return [];
        return value.split(',').map(item => item.trim()).filter(Boolean);
    },

    buildShortlistUrl(keys) {
        const params = new URLSearchParams({ shortlist: this.encodeShortlist(keys) });
        return `${window.location.origin}${window.location.pathname.replace(/[^/]+$/, '')}saved-products.html?${params.toString()}`;
    },

    buildInquiryUrl(keys) {
        const params = new URLSearchParams({ shortlist: this.encodeShortlist(keys) });
        return `contact-us.html?${params.toString()}`;
    },

    exportCsv(products) {
        const headers = ['SKU', 'Type', 'Category', 'Size', 'Grammage', 'Composition'];
        const rows = products.map(product => [
            product.name,
            product.productType === 'women' ? 'Womenswear' : 'Menswear',
            product.attributes?.category || '',
            product.attributes?.size || '',
            product.attributes?.grammage || '',
            product.attributes?.composition || ''
        ]);

        const escape = value => `"${String(value).replace(/"/g, '""')}"`;
        const csv = [headers, ...rows].map(row => row.map(escape).join(',')).join('\n');
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'cenovia-shortlist.csv';
        link.click();
        URL.revokeObjectURL(link.href);
    },

    addRecentlyViewed(productType, productId, name) {
        const key = `${productType}:${productId}`;
        const recent = this.getRecentlyViewed().filter(item => item.key !== key);
        recent.unshift({ key, productType, productId, name, viewedAt: Date.now() });
        localStorage.setItem(this.recentKey, JSON.stringify(recent.slice(0, this.maxRecent)));
    },

    getRecentlyViewed() {
        try {
            return JSON.parse(localStorage.getItem(this.recentKey)) || [];
        } catch {
            return [];
        }
    },

    async resolveProducts(keys, loader = new ProductLoader()) {
        const [menProducts, womenProducts] = await Promise.all([
            loader.loadProducts('men'),
            loader.loadProducts('women')
        ]);
        const catalog = [
            ...menProducts.map(product => ({ ...product, productType: 'men' })),
            ...womenProducts.map(product => ({ ...product, productType: 'women' }))
        ];
        return keys
            .map(key => catalog.find(product => `${product.productType}:${product.id}` === key))
            .filter(Boolean);
    }
};
