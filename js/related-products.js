class RelatedProducts {
    constructor() {
        this.viewHistory = new Set();
        this.productScores = new Map();
    }

    trackProductView(productId) {
        this.viewHistory.add(productId);
        this.updateLocalStorage();
    }

    async getRelatedProducts(currentProduct, limit = 4) {
        const relatedProducts = await this.fetchRelatedProducts(
            currentProduct.category,
            currentProduct.id
        );

        // Score products based on attributes match
        return this.rankProducts(relatedProducts, currentProduct)
            .slice(0, limit);
    }

    rankProducts(products, currentProduct) {
        return products.sort((a, b) => {
            const scoreA = this.calculateRelevanceScore(a, currentProduct);
            const scoreB = this.calculateRelevanceScore(b, currentProduct);
            return scoreB - scoreA;
        });
    }

    calculateRelevanceScore(product, currentProduct) {
        let score = 0;
        // Category match
        if (product.category === currentProduct.category) score += 5;
        // Price range match
        if (Math.abs(product.price - currentProduct.price) < 50) score += 3;
        // Style match
        if (product.style === currentProduct.style) score += 4;
        return score;
    }
}