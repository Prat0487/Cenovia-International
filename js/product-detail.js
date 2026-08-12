
class ProductDetail {
    constructor() {
        this.productImage = document.getElementById('productImage');
        this.productName = document.getElementById('productName');
        this.productAttributes = document.getElementById('productAttributes');
        this.productInquiryLink = document.getElementById('productInquiryLink');
        this.productSaveButton = document.getElementById('productSaveButton');
        this.productBreadcrumb = document.getElementById('productBreadcrumb');
        this.similarProducts = document.getElementById('similarProducts');
        this.recentlyViewed = document.getElementById('recentlyViewed');
        this.urlParams = new URLSearchParams(window.location.search);
        this.productId = parseInt(this.urlParams.get('id'));
        this.productType = this.urlParams.get('type');
        this.productLoader = new ProductLoader();
        this.init();
    }

    async init() {
        if (!this.productId || !this.productType) {
            console.error("Product ID or type missing in URL.");
            return;
        }
        try {
            const products = await this.productLoader.loadProducts(this.productType);
            const product = products.find(p => p.id === this.productId);
            if (product) {
                this.renderProductDetails(product);
                this.bindSaveButton(product);
                BuyerUtils.addRecentlyViewed(this.productType, this.productId, product.name);
                this.renderSimilarProducts(products, product);
                await this.renderRecentlyViewed();
            } else {
                console.error("Product not found.");
            }
        } catch (error) {
            console.error("Error loading product details:", error);
        }
    }

    renderProductDetails(product) {
        this.productImage.src = product.detailImage;
        this.productImage.alt = product.name;
        this.productName.textContent = product.name;
        if (this.productBreadcrumb) {
            const typeLabel = this.productType === 'women' ? 'Womenswear' : 'Menswear';
            const catalogHref = this.productType === 'women' ? 'product-womenswear.html' : 'product-menswear.html';
            this.productBreadcrumb.innerHTML = `
                <a href="index.html">Home</a>
                <i data-lucide="chevron-right"></i>
                <a href="${catalogHref}">${typeLabel}</a>
                <i data-lucide="chevron-right"></i>
                <span>${product.name}</span>
            `;
            window.CenoviaUI?.refreshIcons(this.productBreadcrumb);
        }
        this.renderAttributes(product.attributes);
        if (this.productInquiryLink) {
            const params = new URLSearchParams({
                product: product.name,
                type: this.productType,
                category: product.attributes.category || ''
            });
            this.productInquiryLink.href = `contact-us.html?${params.toString()}`;
        }
    }

    renderAttributes(attributes) {
        this.productAttributes.innerHTML = `
            <div class="ui-spec-grid">
                <div class="ui-spec-row"><span class="detail-attribute-key">Category</span><span class="detail-attribute-value">${attributes.category}</span></div>
                <div class="ui-spec-row"><span class="detail-attribute-key">Size</span><span class="detail-attribute-value">${attributes.size}</span></div>
                <div class="ui-spec-row"><span class="detail-attribute-key">Grammage</span><span class="detail-attribute-value">${attributes.grammage}</span></div>
                <div class="ui-spec-row"><span class="detail-attribute-key">Composition</span><span class="detail-attribute-value">${attributes.composition}</span></div>
            </div>
        `;
    }

    bindSaveButton(product) {
        if (!this.productSaveButton) return;
        const key = `${this.productType}:${product.id}`;
        const sync = () => {
            const saved = BuyerUtils.getWishlist().includes(key);
            this.productSaveButton.classList.toggle('is-saved', saved);
            this.productSaveButton.setAttribute('aria-pressed', String(saved));
            this.productSaveButton.querySelector('span').textContent = saved ? 'Saved to shortlist' : 'Save to shortlist';
        };
        this.productSaveButton.addEventListener('click', () => {
            const wishlist = BuyerUtils.getWishlist();
            if (wishlist.includes(key)) {
                BuyerUtils.saveWishlist(wishlist.filter(item => item !== key));
                window.CenoviaUI?.toast('Removed from shortlist');
            } else {
                BuyerUtils.saveWishlist([...wishlist, key]);
                window.CenoviaUI?.toast('Saved to shortlist');
            }
            sync();
        });
        sync();
        window.CenoviaUI?.refreshIcons(this.productSaveButton);
    }

    renderSimilarProducts(products, currentProduct) {
        if (!this.similarProducts) return;

        const similar = products
            .filter(product => product.id !== currentProduct.id)
            .filter(product => product.attributes.category === currentProduct.attributes.category
                || product.attributes.composition === currentProduct.attributes.composition)
            .slice(0, 4);

        if (!similar.length) {
            this.similarProducts.classList.add('hidden');
            return;
        }

        this.similarProducts.classList.remove('hidden');
        this.similarProducts.querySelector('#similarProductsGrid').innerHTML = similar.map(product => `
            <a href="product-detail.html?id=${product.id}&type=${this.productType}" class="similar-product-card ui-reveal">
                <img src="${product.image}" alt="${product.name}" loading="lazy" decoding="async">
                <div class="p-3">
                    <p class="font-semibold">${product.name}</p>
                    <p class="text-sm text-[hsl(var(--muted-foreground))]">${product.attributes.category}</p>
                </div>
            </a>
        `).join('');
        window.CenoviaUI?.refreshIcons(this.similarProducts);
    }

    async renderRecentlyViewed() {
        if (!this.recentlyViewed) return;

        const recentKeys = BuyerUtils.getRecentlyViewed()
            .filter(item => item.key !== `${this.productType}:${this.productId}`)
            .slice(0, 4);

        if (!recentKeys.length) {
            this.recentlyViewed.classList.add('hidden');
            return;
        }

        const products = await BuyerUtils.resolveProducts(recentKeys.map(item => item.key), this.productLoader);
        if (!products.length) {
            this.recentlyViewed.classList.add('hidden');
            return;
        }

        this.recentlyViewed.classList.remove('hidden');
        this.recentlyViewed.querySelector('#recentlyViewedGrid').innerHTML = products.map(product => `
            <a href="product-detail.html?id=${product.id}&type=${product.productType}" class="similar-product-card ui-reveal">
                <img src="${product.image}" alt="${product.name}" loading="lazy" decoding="async">
                <div class="p-3">
                    <p class="font-semibold">${product.name}</p>
                    <p class="text-sm text-[hsl(var(--muted-foreground))]">${product.productType === 'women' ? 'Womenswear' : 'Menswear'}</p>
                </div>
            </a>
        `).join('');
        window.CenoviaUI?.refreshIcons(this.recentlyViewed);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ProductDetail();
});
