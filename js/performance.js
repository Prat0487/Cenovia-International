// Optimize Largest Contentful Paint (LCP)
document.addEventListener('DOMContentLoaded', () => {
    // Lazy load images
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));

    // Preload critical resources
    const preloadLinks = [
        {href: '/Assets/hero-image.jpg', as: 'image'},
        {href: '/fonts/main-font.woff2', as: 'font'}
    ];

    preloadLinks.forEach(link => {
        const preloadLink = document.createElement('link');
        preloadLink.rel = 'preload';
        preloadLink.as = link.as;
        preloadLink.href = link.href;
        document.head.appendChild(preloadLink);
    });
});
