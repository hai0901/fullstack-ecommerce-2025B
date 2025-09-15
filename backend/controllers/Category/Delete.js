const Category = require('../../models/Category');

exports.deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndUpdate(req.params.id, { isDeleted: true });
    res.json({ message: 'Category soft-deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
