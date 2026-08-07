class GlobalSearch {
    constructor(root) {
        this.root = root;
        this.input = root.querySelector('input[type="search"]');
        this.results = root.querySelector('.global-search__results');
        this.loader = new ProductLoader();
        this.products = [];
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

        this.input.addEventListener('input', () => this.renderResults());
        this.input.addEventListener('focus', () => this.renderResults());
        document.addEventListener('click', event => {
            if (!this.root.contains(event.target)) {
                this.hideResults();
            }
        });
        this.input.addEventListener('keydown', event => {
            if (event.key === 'Escape') this.hideResults();
        });
    }

    renderResults() {
        const term = this.input.value.trim().toLowerCase();
        if (!term) {
            this.hideResults();
            return;
        }

        const matches = this.products
            .filter(product => [
                product.name,
                product.attributes?.category,
                product.attributes?.composition,
                product.attributes?.grammage
            ].some(value => String(value || '').toLowerCase().includes(term)))
            .slice(0, 8);

        if (!matches.length) {
            this.results.innerHTML = '<p class="global-search__empty">No products found</p>';
        } else {
            this.results.innerHTML = matches.map(product => {
                const typeLabel = product.productType === 'women' ? 'Womenswear' : 'Menswear';
                return `
                    <a href="product-detail.html?id=${product.id}&type=${product.productType}" class="global-search__item">
                        <img src="${product.image}" alt="" loading="lazy" decoding="async">
                        <div>
                            <p class="global-search__sku">${product.name}</p>
                            <p class="global-search__meta">${typeLabel} · ${product.attributes?.category || ''}</p>
                        </div>
                    </a>
                `;
            }).join('');
        }

        this.results.classList.remove('hidden');
    }

    hideResults() {
        this.results.classList.add('hidden');
        this.results.innerHTML = '';
    }
}

function initializeGlobalSearch() {
    document.querySelectorAll('.global-search').forEach(root => {
        if (!root.dataset.searchReady) {
            root.dataset.searchReady = 'true';
            new GlobalSearch(root);
        }
    });
}

document.addEventListener('DOMContentLoaded', initializeGlobalSearch);
document.addEventListener('cenovia:nav-ready', initializeGlobalSearch);
