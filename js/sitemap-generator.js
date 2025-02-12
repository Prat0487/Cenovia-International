class SitemapGenerator {
    constructor() {
        this.baseUrl = 'https://cenovia-international.com';
    }

    async generateSitemap() {
        const productLoader = new ProductLoader();
        const menProducts = await productLoader.loadProducts('men');
        const womenProducts = await productLoader.loadProducts('women');

        let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
        sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

        // Add static pages
        ['', 'about', 'contact', 'products'].forEach(page => {
            sitemap += this.createUrlEntry(`${this.baseUrl}/${page}`);
        });

        // Add product pages
        [...menProducts, ...womenProducts].forEach(product => {
            sitemap += this.createUrlEntry(
                `${this.baseUrl}/product-detail.html?id=${product.id}&type=${product.type}`
            );
        });

        sitemap += '</urlset>';
        return sitemap;
    }

    createUrlEntry(url) {
        return `
            <url>
                <loc>${url}</loc>
                <lastmod>${new Date().toISOString()}</lastmod>
                <changefreq>weekly</changefreq>
                <priority>0.8</priority>
            </url>
        `;
    }
}
