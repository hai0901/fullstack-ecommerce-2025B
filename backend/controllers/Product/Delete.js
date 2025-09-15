const Product = require('../../models/Product');

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    if (req.auth.role !== 'vendor' || product.vendorId.toString() !== req.auth.uid) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    await product.deleteOne();
    res.json({ message: 'Product deleted' });
  } catch (err) {
    console.error('Delete product error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
