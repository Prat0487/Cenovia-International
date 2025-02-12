// Optimize Largest Contentful Paint (LCP)
document.addEventListener('DOMContentLoaded', () => {
    // Preload hero image
    const preloadLink = document.createElement('link');
    preloadLink.rel = 'preload';
    preloadLink.as = 'image';
    preloadLink.href = '/Assets/hero-image.jpg';
    document.head.appendChild(preloadLink);
});
