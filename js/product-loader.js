class ProductLoader {
    constructor(pageSize = 12) {
      this.pageSize = pageSize;
      this.currentPage = 1;
    }
  
    async loadProducts(productType) {
      console.log("Product type received:", productType);
      let filePath;
  
      if (productType === 'sports') {
        filePath = 'data/products-menswear.json';
      } else if (productType === 'silvercraft') {
        filePath = 'data/products-womenswear.json';
      } else {
        console.error("Invalid product type:", productType);
        return []; // Return an empty array for invalid types
      }
  
      console.log("File path being used:", filePath);
  
      try {
        const response = await fetch(filePath);
        if (!response.ok) {
          console.error("Error loading data:", response.status, response.statusText);
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Data loaded successfully:", data);
        return data.products; // Assuming your JSON has a "products" array
      } catch (error) {
        console.error("Error during fetch:", error);
        throw error;
      }
    }
  
    renderProducts(products, targetElement) {
      const productGrid = document.getElementById(targetElement);
      products.forEach(product => {
        productGrid.innerHTML += productTemplates[product.category](product);
      });
    }
  }

