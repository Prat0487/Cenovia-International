class ProductLoader {
  constructor(pageSize = 12) {
    this.pageSize = pageSize;
    this.currentPage = 1;
  }

  async loadProducts(page) {
    const response = await fetch('/assets/data/silvercraft-products.json');
    const data = await response.json();
    const start = (page - 1) * this.pageSize;
    return data.products.slice(start, start + this.pageSize);
  }
}
