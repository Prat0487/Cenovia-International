const productTemplates = {
  silvercraft: (product) => `
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
          <p>Sport: ${product.attributes.sportType}</p>
          <p>Age Group: ${product.attributes.ageGroup}</p>
          <p>Skill Level: ${product.attributes.skill_level}</p>
          <p>Warranty: ${product.attributes.warranty}</p>
        </div>
      </div>
    </article>
  `
};
