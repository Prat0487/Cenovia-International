async function loadProductDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    const productType = urlParams.get('type');

    const loader = new ProductLoader();
    const products = await loader.loadProducts(productType);

    // Convert productId to a number
    const numericProductId = parseInt(productId, 10);

    const product = products.find(p => p.id === numericProductId);

    if (product) {
        renderProductDetail(product);
    } else {
        document.getElementById('productDetail').innerHTML = '<p>Product not found.</p>';
    }
}
function renderProductDetail(product) {
    const detailHTML = `
        <div class="max-w-5xl mx-auto py-8 px-4">
            <h1 class="text-3xl font-bold mb-4">${product.name}</h1>
            <div class="flex flex-col md:flex-row gap-4">
                <div class="flex-1">
                    <img src="${product.image}" alt="${product.name}" class="w-full h-96 object-cover">
                </div>
                <div class="flex-1">
                    <p class="text-gray-600 mb-4">${product.description}</p>
                    ${renderSpecifications(product)}
                    <div class="mt-4">
                        <span class="text-2xl font-bold text-gray-900">${product.price}</span>
                        <a href="contact-us.html" class="ml-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                            Enquire now
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.getElementById('productDetail').innerHTML = detailHTML;
}

function renderSpecifications(product) {
    if (product.specifications && Object.keys(product.specifications).length > 0) {
        let specsHTML = '<h4 class="text-xl font-semibold mb-2">Specifications</h4><ul class="list-disc list-inside">';
        for (const key in product.specifications) {
            specsHTML += `<li><strong>${key}:</strong> ${product.specifications[key]}</li>`;
        }
        specsHTML += '</ul>';
        return specsHTML;
    } else {
        return '';
    }
}