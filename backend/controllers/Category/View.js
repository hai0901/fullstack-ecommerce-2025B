const Category = require('../../models/Category');

exports.getCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    res.json(category);
  } catch (err) {
    res.status(404).json({ error: 'Category not found' });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({ isDeleted: false });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
