const Product = require('../../models/Product');

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    if (req.auth.role !== 'vendor' || product.vendorId.toString() !== req.auth.uid) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    Object.assign(product, req.body);
    if (req.file?.filename) product.image = req.file.filename;

    await product.save();

    res.json({ message: 'Product updated', product });
  } catch (err) {
    console.error('Update product error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
