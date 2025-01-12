const initProductDB = () => {
  const dbName = 'cenoviaProducts';
  const request = indexedDB.open(dbName, 1);
  
  request.onupgradeneeded = (event) => {
    const db = event.target.result;
    const productStore = db.createObjectStore('products', { keyPath: 'id' });
    // Common indexes
    productStore.createIndex('type', 'type');
    productStore.createIndex('name', 'name');
    productStore.createIndex('price', 'price');
    // Type-specific indexes
    productStore.createIndex('material', 'attributes.material'); // for silvercraft
    productStore.createIndex('sport_type', 'attributes.sportType'); // for sports
  };
};
