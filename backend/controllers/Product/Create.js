const Product = require('../../models/Product');
const Category = require('../../models/Category');
const fs = require('fs');
const path = require('path');

exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, category, imageDataUrl, username } = req.body;

    if (!name || !description || !price || !category || !username) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Validate name length (10-20 characters)
    if (name.length < 10 || name.length > 20) {
      return res.status(400).json({ error: 'Product name must be between 10 and 20 characters' });
    }

    // Validate price (positive number)
    const priceNum = parseFloat(price);
    if (isNaN(priceNum) || priceNum <= 0) {
      return res.status(400).json({ error: 'Price must be a positive number' });
    }

    // Validate description length (max 500 characters)
    if (description.length > 500) {
      return res.status(400).json({ error: 'Description must be at most 500 characters' });
    }

    // Find user by username to get the ObjectId
    const User = require('../../models/User');
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Find or create category by name
    let categoryDoc = await Category.findOne({ name: category, isDeleted: false });
    if (!categoryDoc) {
      categoryDoc = await Category.create({ name: category });
    }

    // Handle image upload if provided
    let imagePath = null;
    if (imageDataUrl && typeof imageDataUrl === 'string' && imageDataUrl.startsWith('data:image/')) {
      const matches = imageDataUrl.match(/^data:image\/(png|jpeg|jpg);base64,(.+)$/);
      if (matches && matches.length === 3) {
        const ext = matches[1] === 'jpeg' ? 'jpg' : matches[1];
        const buffer = Buffer.from(matches[2], 'base64');
        const fileName = `product-${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${ext}`;
        const uploadDir = path.join(__dirname, '../../uploads/products');
        fs.mkdirSync(uploadDir, { recursive: true });
        const filePath = path.join(uploadDir, fileName);
        fs.writeFileSync(filePath, buffer);
        imagePath = `/uploads/products/${fileName}`;
      }
    }

    const product = new Product({
      vendorId: user._id,
      categoryId: categoryDoc._id,
      name,
      description,
      price: priceNum,
      image: imagePath,
      updatedAt: new Date()
    });

    await product.save();
    
    // Populate category name for response
    const populatedProduct = await Product.findById(product._id).populate('categoryId', 'name');
    
    res.status(201).json({
      ...populatedProduct.toObject(),
      category: populatedProduct.categoryId.name
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};