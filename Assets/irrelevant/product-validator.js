const validateProduct = (product, type) => {
  const schema = productStructures[type];
  return new Validator(schema).validate(product);
};
