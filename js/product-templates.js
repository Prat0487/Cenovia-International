const productTemplates = {
  women: (product) => `
    <article class="product-card">
      <!-- Common product info -->
      <div class="product-details">
        <div class="specifications">
          <p>Material: ${product.attributes.material}</p>
          <p>Weight: ${product.attributes.weight}g</p>
          <p>Dimensions: ${product.attributes.dimensions.length}x${product.attributes.dimensions.width}x${product.attributes.dimensions.height}cm</p>
          <p>Purity: ${product.attributes.purity}</p>
        </div>
      </div>
    </article>
  `,
  
  sports: (product) => `
    <article class="product-card">
      <!-- Common product info -->
      <div class="product-details">
        <div class="specifications">
          <p>Size: ${product.attributes.size}</p>
          <p>Grammage: ${product.attributes.grammage}</p>
          <p>Fabric: ${product.attributes.fabric}</p>
           <p>Composition: ${product.attributes.composition}</p>
        </div>
      </div>
    </article>
  `
};
