
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
        if (this.productType === 'sports') {
            this.productAttributes.innerHTML = `
                <p>Size: ${attributes.size}</p>
                <p>Grammage: ${attributes.grammage}</p>
                <p>Fabric: ${attributes.fabric}</p>
                <p>Composition: ${attributes.composition}</p>
            `;
        } else if (this.productType === 'women') {
            this.productAttributes.innerHTML = `
                <p>Material: ${attributes.material}</p>
                <p>Weight: ${attributes.weight}g</p>
                <p>Purity: ${attributes.purity}</p>
            `;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ProductDetail();
});

