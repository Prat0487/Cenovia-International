class ProductLoader {
  constructor(pageSize = 12) {
    this.pageSize = pageSize;
    this.currentPage = 1;
  }

  async loadProducts(category) {
    const productFiles = {
      'silvercraft': 'products-silvercraft.json',
      'sports': 'products-sportgoods.json'
    };
    
    const filename = productFiles[category];
    const response = await fetch(`/Assets/data/${filename}`);
    const data = await response.json();
    return data.products;
  }

  renderProducts(products, targetElement) {
    const productGrid = document.getElementById(targetElement);
    products.forEach(product => {
      productGrid.innerHTML += productTemplates[product.category](product);
    });
  }
}