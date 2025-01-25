document.addEventListener('DOMContentLoaded', async () => {
    try {
        const loader = new ProductLoader();
        const products = await loader.loadProducts('sportgoods');

        const productContainer = document.getElementById('product-container');

        if (!productContainer) {
            console.error("Error: product-container element not found in HTML.");
            return;
        }

        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');

            productCard.innerHTML = `
                <img src="${product.cardImage}" alt="${product.name}" class="card-image">
                <h3 class="card-title">${product.name}</h3>
                <button class="view-details-btn" data-product-id="${product.id}">View Details</button>
            `;
            productContainer.appendChild(productCard);
        });

        // Event listener for view details button
        productContainer.addEventListener('click', (event) => {
            if (event.target.classList.contains('view-details-btn')) {
                const productId = event.target.getAttribute('data-product-id');
                window.location.href = `product-detail.html?id=${productId}`;
            }
        });
    } catch (error) {
        console.error("Error loading or rendering products:", error);
    }
});