class ImageOptimizer {
    static processImage(imagePath, options = {}) {
        const pathParts = imagePath.split('/');
        const fileName = pathParts.pop();
        const dirPath = pathParts.join('/');
        const baseName = fileName.replace(/\.[^/.]+$/, '');
        
        return `
            <picture>
                <source
                    media="(max-width: 640px)"
                    srcset="${dirPath}/processed/${baseName}-320.webp"
                    type="image/webp"
                    fetchpriority="high">
                <source
                    media="(max-width: 1024px)"
                    srcset="${dirPath}/processed/${baseName}-640.webp"
                    type="image/webp">
                <source
                    srcset="${dirPath}/processed/${baseName}-1024.webp"
                    type="image/webp">
                <img 
                    src="${dirPath}/processed/${baseName}-640.jpg"
                    alt="${options.alt || ''}"
                    class="${options.className || ''}"
                    loading="lazy"
                    width="${options.width || ''}"
                    height="${options.height || ''}"
                    title="${options.title || options.alt || ''}"
                    decoding="async">
            </picture>
        `;
    }
}