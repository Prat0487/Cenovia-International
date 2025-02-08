
class ProductDetail {
    constructor() {
        this.productImage = document.getElementById('productImage');
        this.productName = document.getElementById('productName');
        this.productAttributes = document.getElementById('productAttributes');
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
        this.renderAttributes(product.attributes);
    }
    renderAttributes(attributes) {
        this.productAttributes.innerHTML = '';
        if (this.productType === 'men') {
            this.productAttributes.innerHTML = `
                <p><span class="detail-attribute-key">Category:</span> <span class="detail-attribute-value">${attributes.category}</span></p>
                <p><span class="detail-attribute-key">Size:</span> <span class="detail-attribute-value">${attributes.size}</span></p>
                <p><span class="detail-attribute-key">Grammage:</span> <span class="detail-attribute-value">${attributes.grammage}</span></p>
                <p><span class="detail-attribute-key">Composition:</span> <span class="detail-attribute-value">${attributes.composition}</span></p>
            `;
        } else if (this.productType === 'women') {
            this.productAttributes.innerHTML = `
                <p><span class="detail-attribute-key">Category:</span> <span class="detail-attribute-value">${attributes.category}</span></p>
                <p><span class="detail-attribute-key">Size:</span> <span class="detail-attribute-value">${attributes.size}</span></p>
                <p><span class="detail-attribute-key">Grammage:</span> <span class="detail-attribute-value">${attributes.grammage}</span></p>
                <p><span class="detail-attribute-key">Composition:</span> <span class="detail-attribute-value">${attributes.composition}</span></p>

            `;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ProductDetail();
});
