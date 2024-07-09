const category_model = require("../models/category.model");

exports.createNewCategory = async (req, res) => {
  // Read the req body
  // Create the category object
  const cat_data = {
    name: req.body.name,
    description: req.body.description,
  };
  try {
    // Insert into mongodb
    const existingCategory = await category_model.findOne({
      name: req.body.name,
    });
    if (existingCategory) {
      return res.status(400).send({
        message: "Category with the same name already exists",
      });
    }
    const category = await category_model.create(cat_data);
    return res.status(201).send(category);
  } catch (err) {
    console.log("Error while creating the category", err);
    return res.status(500).send({
      message: "Error while creating the category",
    });
  }
  // return the response of the created category
};
