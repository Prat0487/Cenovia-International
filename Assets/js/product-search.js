const productDB = new ProductDatabase();
productDB.init().then(() => {
  productDB.search({
    category: 'tableware',
    priceRange: [0, 500],
    searchTerm: 'vintage'
  });
});
