const Product = require('../../models/Product');

exports.createProduct = async (req, res) => {
  try {
    if (req.auth.role !== 'vendor') {
      return res.status(403).json({ error: 'Only vendors can create products' });
    }

    const vendorId = req.auth.uid;
    const { name, price, description, genreId, availableStock } = req.body;
    const image = req.file?.filename || null;

    const newProduct = await Product.create({
      name,
      price,
      description,
      image,
      genreId,
      availableStock,
      vendorId,
    });

    return res.status(201).json({ message: 'Product created', product: newProduct });
  } catch (err) {
    console.error('Create product error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
