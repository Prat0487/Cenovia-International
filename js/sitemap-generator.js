class ImageSitemapGenerator {
    static generateImageSitemap(products) {
        let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
        sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
        sitemap += 'xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n';

        products.forEach(product => {
            sitemap += `
                <url>
                    <loc>https://cenovia-international.com/product-detail.html?id=${product.id}</loc>
                    <image:image>
                        <image:loc>${product.image}</image:loc>
                        <image:title>${product.name}</image:title>
                        <image:caption>${product.description}</image:caption>
                    </image:image>
                </url>
            `;
        });

        sitemap += '</urlset>';
        return sitemap;
    }
}
