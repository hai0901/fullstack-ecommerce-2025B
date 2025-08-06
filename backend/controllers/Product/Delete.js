const Product = require('../../models/Product');

exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, { isDeleted: true });
    res.json({ message: 'Product soft-deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};