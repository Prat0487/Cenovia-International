class RelatedProducts {
    generateRelatedLinks(product) {
        const category = product.attributes.category;
        return this.products
            .filter(p => p.attributes.category === category && p.id !== product.id)
            .slice(0, 4)
            .map(p => `
                <a href="/product-detail.html?id=${p.id}&type=${p.type}" 
                   class="related-product"
                   data-category="${p.attributes.category}">
                    ${p.name}
                </a>
            `).join('');
    }
}
