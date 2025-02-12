class ImageOptimizer {
    static processImage(imagePath, options = {}) {
        const baseUrl = '/Assets/';
        const defaultOptions = {
            width: 800,
            quality: 80,
            format: 'webp'
        };
        
        const settings = { ...defaultOptions, ...options };
        
        return `
            <picture>
                <!-- WebP format -->
                <source
                    srcset="${baseUrl}${imagePath}-${settings.width}.webp"
                    type="image/webp"
                >
                <!-- Fallback JPG -->
                <source
                    srcset="${baseUrl}${imagePath}-${settings.width}.jpg"
                    type="image/jpeg"
                >
                <!-- Default image -->
                <img 
                    src="${baseUrl}${imagePath}-${settings.width}.jpg"
                    width="${settings.width}"
                    loading="lazy"
                    alt="${options.alt || ''}"
                    class="${options.className || ''}"
                >
            </picture>
        `;
    }
}
