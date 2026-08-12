class SavedProducts {
    constructor() {
        this.grid = document.getElementById('savedProductsGrid');
        this.actionsBar = document.getElementById('savedActionsBar');
        this.loader = new ProductLoader();
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

        const params = new URLSearchParams(window.location.search);
        const sharedKeys = BuyerUtils.decodeShortlist(params.get('shortlist'));
        if (sharedKeys.length) {
            BuyerUtils.saveWishlist(sharedKeys);
        }

        this.render();
        this.bindActions();
    }

    getWishlist() {
        return BuyerUtils.getWishlist();
    }

    saveWishlist(wishlist) {
        BuyerUtils.saveWishlist(wishlist);
    }

    getSavedProducts() {
        const wishlist = this.getWishlist();
        return this.products.filter(product => wishlist.includes(`${product.productType}:${product.id}`));
    }

    render() {
        const savedProducts = this.getSavedProducts();

        if (!savedProducts.length) {
            if (this.actionsBar) this.actionsBar.classList.add('hidden');
            this.grid.innerHTML = `
                <div class="col-span-full ui-card ui-empty">
                    <i data-lucide="heart" class="mx-auto mb-3"></i>
                    <h2 class="text-2xl font-semibold mb-3">No saved products yet</h2>
                    <p class="text-[hsl(var(--muted-foreground))] mb-6">Use the heart on catalog cards to build a buyer shortlist.</p>
                    <div class="flex flex-wrap justify-center gap-3">
                        <a href="product-menswear.html" class="ui-btn-primary">Browse menswear</a>
                        <a href="product-womenswear.html" class="ui-btn-success">Browse womenswear</a>
                    </div>
                </div>
            `;
            window.CenoviaUI?.refreshIcons(this.grid);
            return;
        }

        if (this.actionsBar) {
            this.actionsBar.classList.remove('hidden');
            this.actionsBar.querySelector('#savedCount').textContent = `${savedProducts.length} product${savedProducts.length === 1 ? '' : 's'} shortlisted`;
        }

        this.grid.innerHTML = savedProducts.map(product => this.getCard(product)).join('');
        window.CenoviaUI?.refreshIcons(this.grid);
        window.CenoviaUI?.animateCards(this.grid);
        this.grid.querySelectorAll('.remove-saved').forEach(button => {
            button.addEventListener('click', () => {
                const key = `${button.dataset.productType}:${button.dataset.productId}`;
                this.saveWishlist(this.getWishlist().filter(item => item !== key));
                this.render();
            });
        });
    }

    bindActions() {
        document.getElementById('sendInquiryBtn')?.addEventListener('click', () => {
            const keys = this.getWishlist();
            window.location.href = BuyerUtils.buildInquiryUrl(keys);
        });

        document.getElementById('shareShortlistBtn')?.addEventListener('click', async () => {
            const keys = this.getWishlist();
            const url = BuyerUtils.buildShortlistUrl(keys);
            try {
                await navigator.clipboard.writeText(url);
                this.showActionStatus('Shortlist link copied to clipboard.');
            } catch {
                prompt('Copy this shortlist link:', url);
            }
        });

        document.getElementById('exportCsvBtn')?.addEventListener('click', () => {
            BuyerUtils.exportCsv(this.getSavedProducts());
            this.showActionStatus('Shortlist exported as CSV.');
        });
    }

    showActionStatus(message) {
        const status = document.getElementById('savedActionStatus');
        if (!status) return;
        status.textContent = message;
        status.classList.remove('hidden');
        window.setTimeout(() => status.classList.add('hidden'), 2500);
    }

    getCard(product) {
        const params = new URLSearchParams({
            product: product.name,
            type: product.productType,
            category: product.attributes.category || ''
        });

        return `
            <div class="product-card">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" loading="lazy" decoding="async">
                    <div class="product-card__overlay">
                        <button class="wishlist-btn is-saved remove-saved" data-product-id="${product.id}" data-product-type="${product.productType}" aria-label="Remove ${product.name}">
                            <i data-lucide="heart"></i>
                        </button>
                    </div>
                </div>
                <div class="p-4">
                    <p class="ui-badge mb-2">${product.productType === 'women' ? 'Womenswear' : 'Menswear'}</p>
                    <h2 class="text-lg font-semibold">${product.name}</h2>
                    <div class="specifications text-sm text-[hsl(var(--muted-foreground))] mt-3 space-y-1">
                        <p><span class="attribute-key">Category:</span> <span class="attribute-value">${product.attributes.category}</span></p>
                        <p><span class="attribute-key">Size:</span> <span class="attribute-value">${product.attributes.size}</span></p>
                        <p><span class="attribute-key">Grammage:</span> <span class="attribute-value">${product.attributes.grammage}</span></p>
                        <p><span class="attribute-key">Composition:</span> <span class="attribute-value">${product.attributes.composition}</span></p>
                    </div>
                    <div class="product-card__actions mt-4">
                        <a href="product-detail.html?id=${product.id}&type=${product.productType}" class="ui-btn-outline ui-btn-sm">Details</a>
                        <a href="contact-us.html?${params.toString()}" class="ui-btn-success ui-btn-sm">Enquire</a>
                    </div>
                </div>
            </div>
        `;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new SavedProducts();
});
