const populateDB = async (db) => {
  const products = [
    // Your existing product data
    {
      id: 1,
      name: "Vintage Silver Tea Set",
      description: "Traditional Craftsmanship",
      price: "$299.99",
      image: "Assets/Images/Silver/silver_craft_1.png",
      category: "tableware"
    },
    // ... more products
  ];
  
  const transaction = db.transaction(['products'], 'readwrite');
  const store = transaction.objectStore('products');
  
  products.forEach(product => {
    store.put(product);
  });
};
