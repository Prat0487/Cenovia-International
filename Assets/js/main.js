document.addEventListener('DOMContentLoaded', async () => {
  const loader = new ProductLoader();
  const products = await loader.loadProducts('silvercraft');
  loader.renderProducts(products, 'productGrid');
});
