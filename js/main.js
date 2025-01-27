document.addEventListener('DOMContentLoaded', async () => {
  const loader = new ProductLoader();
  const products = await loader.loadProducts('women');
  loader.renderProducts(products, 'productGrid');
});
