class ProductSearch {
    constructor(productType) {
        this.productType = productType;
        this.productLoader = new ProductLoader();
        this.productGrid = document.getElementById('productGrid');
        this.searchBox = document.querySelector('input[type="search"]');
        this.categoryFilter = document.getElementById('categoryFilter');
        this.sizeFilter = document.getElementById('sizeFilter');
        this.compositionFilter = document.getElementById('compositionFilter');
        this.grammageFilter = document.getElementById('grammageFilter');
        this.sortFilter = document.getElementById('sortFilter');
        this.clearFiltersButton = document.getElementById('clearFilters');
        this.filterSummary = document.getElementById('filterSummary');
        this.filterChips = document.getElementById('filterChips');
        this.compareTray = document.getElementById('compareTray');
        this.products = [];
        this.compareSelections = new Set();

        this.init();
    }

    async init() {
        this.products = await this.productLoader.loadProducts(this.productType);
        this.populateDynamicFilters();
        this.bindControls();
        this.bindProductActions();
        this.applyFilters();
        this.updateWishlistButtons();
        this.updateCompareState();
    }

    populateDynamicFilters() {
        this.populateSelect(this.sizeFilter, this.products.map(product => product.attributes.size));
        this.populateSelect(this.compositionFilter, this.products.map(product => product.attributes.composition));
        this.populateSelect(this.grammageFilter, this.products.map(product => product.attributes.grammage));
    }

    populateSelect(selectElement, values) {
        if (!selectElement) return;

        const firstOption = selectElement.querySelector('option');
        const uniqueValues = [...new Set(values.filter(Boolean))].sort((a, b) => String(a).localeCompare(String(b)));
        selectElement.innerHTML = '';
        if (firstOption) {
            selectElement.appendChild(firstOption);
        }

        uniqueValues.forEach(value => {
            const option = document.createElement('option');
            option.value = value;
            option.textContent = value;
            selectElement.appendChild(option);
        });
    }

    bindControls() {
        [this.searchBox, this.categoryFilter, this.sizeFilter, this.compositionFilter, this.grammageFilter, this.sortFilter]
            .filter(Boolean)
            .forEach(control => {
                const eventName = control === this.searchBox ? 'input' : 'change';
                control.addEventListener(eventName, () => this.applyFilters());
            });

        if (this.clearFiltersButton) {
            this.clearFiltersButton.addEventListener('click', () => {
                [this.searchBox, this.categoryFilter, this.sizeFilter, this.compositionFilter, this.grammageFilter, this.sortFilter]
                    .filter(Boolean)
                    .forEach(control => {
                        control.value = '';
                    });
                this.applyFilters();
            });
        }

        if (this.filterChips) {
            this.filterChips.addEventListener('click', event => {
                const chip = event.target.closest('[data-filter]');
                if (!chip) return;
                const control = document.getElementById(chip.dataset.filter);
                if (control) {
                    control.value = '';
                    this.applyFilters();
                }
            });
        }
    }

    bindProductActions() {
        if (!this.productGrid) return;

        this.productGrid.addEventListener('click', event => {
            const wishlistButton = event.target.closest('.wishlist-btn');
            if (!wishlistButton) return;

            const productKey = this.getProductKey(wishlistButton.dataset.productType, wishlistButton.dataset.productId);
            const wishlist = this.getWishlist();

            if (wishlist.includes(productKey)) {
                this.saveWishlist(wishlist.filter(item => item !== productKey));
                window.CenoviaUI?.toast('Removed from shortlist');
            } else {
                this.saveWishlist([...wishlist, productKey]);
                window.CenoviaUI?.toast('Saved to shortlist');
            }

            this.updateWishlistButtons();
        });

        this.productGrid.addEventListener('change', event => {
            const compareCheckbox = event.target.closest('.compare-product');
            if (!compareCheckbox) return;

            const productKey = this.getProductKey(compareCheckbox.dataset.productType, compareCheckbox.dataset.productId);
            if (compareCheckbox.checked) {
                if (this.compareSelections.size >= 3) {
                    compareCheckbox.checked = false;
                    this.showCompareLimit();
                    return;
                }
                this.compareSelections.add(productKey);
            } else {
                this.compareSelections.delete(productKey);
            }

            this.updateCompareState();
        });
    }

    applyFilters() {
        const filteredProducts = this.sortProducts(
            this.products
                .filter(product => this.matchesSearch(product))
                .filter(product => this.matchesSelectedValue(product, this.categoryFilter, 'category'))
                .filter(product => this.matchesSelectedValue(product, this.sizeFilter, 'size'))
                .filter(product => this.matchesSelectedValue(product, this.compositionFilter, 'composition'))
                .filter(product => this.matchesSelectedValue(product, this.grammageFilter, 'grammage'))
        );

        this.renderSearchResults(filteredProducts);
        this.updateSummary(filteredProducts.length);
        this.renderFilterChips();
    }

    matchesSearch(product) {
        const searchTerm = this.searchBox?.value?.trim().toLowerCase() || '';
        if (!searchTerm) return true;

        return [
            product.name,
            ...Object.values(product.attributes || {})
        ].some(value => String(value).toLowerCase().includes(searchTerm));
    }

    matchesSelectedValue(product, selectElement, attributeName) {
        const selectedValue = selectElement?.value;
        if (!selectedValue) return true;

        return product.attributes?.[attributeName] === selectedValue;
    }

    sortProducts(products) {
        if (!this.sortFilter?.value) return products;

        const sortValue = this.sortFilter.value;
        return [...products].sort((a, b) => {
            if (sortValue === 'name-asc') {
                return a.name.localeCompare(b.name);
            }
            if (sortValue === 'name-desc') {
                return b.name.localeCompare(a.name);
            }
            if (sortValue === 'grammage-high') {
                return this.getGrammage(b) - this.getGrammage(a);
            }
            if (sortValue === 'grammage-low') {
                return this.getGrammage(a) - this.getGrammage(b);
            }
            return 0;
        });
    }

    getGrammage(product) {
        return parseFloat(product.attributes?.grammage) || 0;
    }

    renderSearchResults(products) {
        this.productGrid.innerHTML = '';

        if (!products.length) {
            this.productGrid.innerHTML = `
                <div class="col-span-full ui-card ui-empty">
                    <i data-lucide="search-x" class="mx-auto mb-3"></i>
                    <h2 class="text-xl font-semibold mb-2">No matching products</h2>
                    <p class="text-[hsl(var(--muted-foreground))]">Try a different search term or clear one of the filters.</p>
                </div>
            `;
            window.CenoviaUI?.refreshIcons(this.productGrid);
            return;
        }

        products.forEach(product => {
            const productHTML = this.productType === 'women'
                ? this.getProductTemplate(product, 'women')
                : this.getProductTemplate(product, 'men');
            this.productGrid.insertAdjacentHTML('beforeend', productHTML);
        });

        this.updateWishlistButtons();
        this.updateCompareState();
        window.CenoviaUI?.refreshIcons(this.productGrid);
        window.CenoviaUI?.animateCards(this.productGrid);
    }

    getProductTemplate(product, productType) {
        const typeLabel = productType === 'women' ? 'Womenswear' : 'Menswear';
        return `
            <div class="product-card" data-product-id="${product.id}" data-product-type="${productType}">
                <div class="product-image">
                    <img src="${product.image}"
                         alt="Premium ${product.name} - ${product.attributes.category} - Export Quality ${typeLabel}"
                         class="w-full h-64 object-cover"
                         loading="lazy"
                         decoding="async">
                    <div class="product-card__overlay">
                        <button class="wishlist-btn" data-product-id="${product.id}" data-product-type="${productType}" aria-label="Add ${product.name} to wishlist">
                            <i data-lucide="heart"></i>
                        </button>
                    </div>
                </div>
                <div class="p-4">
                    <div class="flex items-start justify-between gap-3 mb-2">
                        <div>
                            <span class="ui-badge mb-2">${product.attributes.category}</span>
                            <h2 class="text-lg font-semibold mt-2">${product.name}</h2>
                        </div>
                    </div>
                    <div class="specifications text-sm text-[hsl(var(--muted-foreground))] mt-3 space-y-1">
                        <p><span class="attribute-key">Size:</span> <span class="attribute-value">${product.attributes.size}</span></p>
                        <p><span class="attribute-key">Grammage:</span> <span class="attribute-value">${product.attributes.grammage}</span></p>
                        <p><span class="attribute-key">Composition:</span> <span class="attribute-value">${product.attributes.composition}</span></p>
                    </div>
                    <div class="product-card__actions mt-4">
                         <a href="product-detail.html?id=${product.id}&type=${productType}" class="ui-btn-outline ui-btn-sm">
                            Details
                        </a>
                         <a href="${this.getInquiryUrl(product, productType)}" class="ui-btn-success ui-btn-sm">
                            Enquire
                        </a>
                    </div>
                    <label class="compare-check">
                        <input type="checkbox" class="compare-product rounded border-gray-300" data-product-id="${product.id}" data-product-type="${productType}">
                        Compare specs
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

    getWishlist() {
        return BuyerUtils.getWishlist();
    }

    saveWishlist(wishlist) {
        BuyerUtils.saveWishlist(wishlist);
    }

    updateWishlistButtons() {
        const wishlist = this.getWishlist();
        document.querySelectorAll('.wishlist-btn').forEach(button => {
            const productKey = this.getProductKey(button.dataset.productType, button.dataset.productId);
            const isSaved = wishlist.includes(productKey);

            button.classList.toggle('is-saved', isSaved);
            button.setAttribute('aria-pressed', String(isSaved));
            button.setAttribute('aria-label', isSaved ? 'Remove from wishlist' : 'Add to wishlist');
        });
    }

    updateCompareState() {
        document.querySelectorAll('.compare-product').forEach(checkbox => {
            const productKey = this.getProductKey(checkbox.dataset.productType, checkbox.dataset.productId);
            checkbox.checked = this.compareSelections.has(productKey);
            checkbox.disabled = !checkbox.checked && this.compareSelections.size >= 3;
        });

        this.renderCompareTray();
    }

    renderCompareTray() {
        if (!this.compareTray) return;

        const selectedProducts = [...this.compareSelections]
            .map(productKey => this.getProductByKey(productKey))
            .filter(Boolean);

        if (!selectedProducts.length) {
            this.compareTray.classList.add('hidden');
            this.compareTray.innerHTML = '';
            return;
        }

        this.compareTray.classList.remove('hidden');
        this.compareTray.innerHTML = `
            <div class="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div>
                    <h2 class="text-lg font-semibold">Compare products</h2>
                    <p class="text-sm text-[hsl(var(--muted-foreground))]">Selected ${selectedProducts.length} of 3 styles.</p>
                </div>
                <button id="clearCompare" class="ui-btn-outline ui-btn-sm self-start">
                    Clear compare
                </button>
            </div>
            <div class="mt-4 overflow-x-auto">
                <table class="min-w-full text-sm text-left">
                    <thead>
                        <tr class="border-b border-gray-200">
                            <th class="py-2 pr-4 font-semibold text-gray-700">Product</th>
                            ${selectedProducts.map(product => `<th class="py-2 px-4 font-semibold text-gray-700">${product.name}</th>`).join('')}
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100">
                        ${this.getCompareRow('Category', selectedProducts, 'category')}
                        ${this.getCompareRow('Size', selectedProducts, 'size')}
                        ${this.getCompareRow('Grammage', selectedProducts, 'grammage')}
                        ${this.getCompareRow('Composition', selectedProducts, 'composition')}
                    </tbody>
                </table>
            </div>
        `;

        this.compareTray.querySelector('#clearCompare')?.addEventListener('click', () => {
            this.compareSelections.clear();
            this.updateCompareState();
        });
    }

    getCompareRow(label, products, attributeName) {
        return `
            <tr>
                <td class="py-2 pr-4 font-semibold text-gray-700">${label}</td>
                ${products.map(product => `<td class="py-2 px-4 text-gray-600">${product.attributes?.[attributeName] || '-'}</td>`).join('')}
            </tr>
        `;
    }

    getProductByKey(productKey) {
        const [productType, productId] = productKey.split(':');
        if (productType !== this.productType) return null;

        return this.products.find(product => String(product.id) === productId);
    }

    getProductKey(productType, productId) {
        return `${productType}:${productId}`;
    }

    updateSummary(count) {
        if (!this.filterSummary) return;

        const label = this.productType === 'women' ? "women's" : "men's";
        this.filterSummary.textContent = `Showing ${count} of ${this.products.length} ${label} products.`;
    }

    renderFilterChips() {
        if (!this.filterChips) return;

        const chips = [
            { id: 'categoryFilter', label: 'Category', value: this.categoryFilter?.value },
            { id: 'sizeFilter', label: 'Size', value: this.sizeFilter?.value },
            { id: 'compositionFilter', label: 'Fabric', value: this.compositionFilter?.value },
            { id: 'grammageFilter', label: 'Grammage', value: this.grammageFilter?.value }
        ].filter(chip => chip.value);

        if (!chips.length) {
            this.filterChips.innerHTML = '';
            this.filterChips.classList.add('hidden');
            return;
        }

        this.filterChips.classList.remove('hidden');
        this.filterChips.innerHTML = chips.map(chip => `
            <button type="button" class="filter-chip" data-filter="${chip.id}" aria-label="Remove ${chip.label} filter ${chip.value}">
                ${chip.label}: ${chip.value}
                <i data-lucide="x" aria-hidden="true"></i>
            </button>
        `).join('');
        window.CenoviaUI?.refreshIcons(this.filterChips);
    }

    showCompareLimit() {
        if (!this.compareTray) return;

        this.compareTray.classList.remove('hidden');
        this.compareTray.innerHTML = `
            <div class="flex items-center justify-between gap-4">
                <p class="text-sm">You can compare up to 3 products at a time.</p>
                <button id="dismissCompareLimit" class="ui-btn-outline ui-btn-sm">Dismiss</button>
            </div>
        `;
        this.compareTray.querySelector('#dismissCompareLimit')?.addEventListener('click', () => {
            this.renderCompareTray();
        });
    }
}
