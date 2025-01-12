const handleProductError = (error, productId) => {
  console.error(`Product ${productId} failed to load`, error);
  return fallbackProductTemplate();
};
