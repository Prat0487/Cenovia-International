class ResponsiveImageLoader {
    static getSrcSet(imagePath) {
        const sizes = [320, 640, 1024, 1920];
        return sizes.map(size => 
            `${imagePath}-${size}.webp ${size}w`
        ).join(', ');
    }

    static getImageSizes() {
        return `
            (max-width: 320px) 320px,
            (max-width: 640px) 640px,
            (max-width: 1024px) 1024px,
            1920px
        `;
    }
}
