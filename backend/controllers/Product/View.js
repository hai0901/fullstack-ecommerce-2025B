/*
 * RMIT University Vietnam
 * Course: COSC2769 - Full Stack Development
 * Semester: 2025B
 * Assessment: Assignment 02
 * Author: Nguyen Pham Tien Hai, Nguyen Thach Khanh Dzi
 * ID: s3979239, s3980883
 */

const Product = require('../../models/Product');

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('vendorId', 'username')
      .populate('categoryId', 'name');
      
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    // Convert relative image path to absolute URL
    let imageUrl = product.image;
    if (imageUrl && imageUrl.startsWith('/uploads/')) {
      imageUrl = `${req.protocol}://${req.get('host')}${imageUrl}`;
      product.image = imageUrl;
    }
    
    res.json(product);
  } catch (err) {
    res.status(404).json({ error: 'Product not found' });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({ isDeleted: false });
    
    // Convert relative image paths to absolute URLs
    const productsWithAbsoluteUrls = products.map(product => {
      let imageUrl = product.image;
      if (imageUrl && imageUrl.startsWith('/uploads/')) {
        imageUrl = `${req.protocol}://${req.get('host')}${imageUrl}`;
        product.image = imageUrl;
      }
      return product;
    });
    
    res.json(productsWithAbsoluteUrls);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
