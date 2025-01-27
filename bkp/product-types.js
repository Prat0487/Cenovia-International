const productStructures = {
  women: {
    baseFields: ['id', 'name', 'price', 'image'],
    specificAttributes: {
      material: String,
      weight: Number,
      dimensions: {
        length: Number,
        width: Number,
        height: Number
      },
      purity: String,
      hallmark: String
    }
  },
  
  sports: {
    baseFields: ['id', 'name', 'price', 'image'],
    specificAttributes: {
      sportType: String,
      ageGroup: String,
      skill_level: String,
      equipment_type: String,
      warranty: String
    }
  }
};
