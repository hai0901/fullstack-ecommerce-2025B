/*
 * RMIT University Vietnam
 * Course: COSC2769 - Full Stack Development
 * Semester: 2025B
 * Assessment: Assignment 02
 * Author: Nguyen Pham Tien Hai, Nguyen Thach Khanh Dzi
 * ID: s3979239, s3980883
 */

const Product = require('../../models/Product');
const Category = require('../../models/Category');

exports.getVendorProducts = async (req, res) => {
  try {
    const { username } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';
    const category = req.query.category || '';

    if (!username) {
      return res.status(400).json({ error: 'Username is required' });
    }

    // Find user by username to get the ObjectId
    const User = require('../../models/User');
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Build filter object
    const filter = {
      vendorId: user._id,
      isDeleted: false
    };

    // Add search filter
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Add category filter
    if (category) {
      const categoryDoc = await Category.findOne({ name: category, isDeleted: false });
      if (categoryDoc) {
        filter.categoryId = categoryDoc._id;
      } else {
        // If category doesn't exist, return empty results
        return res.json({
          products: [],
          pagination: {
            currentPage: page,
            totalPages: 0,
            totalProducts: 0,
            hasNext: false,
            hasPrev: false
          }
        });
      }
    }

    // Calculate skip value for pagination
    const skip = (page - 1) * limit;

    // Get total count for pagination
    const totalProducts = await Product.countDocuments(filter);

    // Get products with pagination
    const products = await Product.find(filter)
      .populate('categoryId', 'name')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Transform products to include category name
    const transformedProducts = products.map(product => {
      // Convert relative image path to absolute URL
      let imageUrl = product.image;
      if (imageUrl && imageUrl.startsWith('/uploads/')) {
        imageUrl = `${req.protocol}://${req.get('host')}${imageUrl}`;
      }
      
      return {
        id: product._id.toString(),
        name: product.name,
        category: product.categoryId.name,
        description: product.description,
        price: product.price,
        image: imageUrl,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt
      };
    });

    // Calculate pagination info
    const totalPages = Math.ceil(totalProducts / limit);
    const hasNext = page < totalPages;
    const hasPrev = page > 1;

    res.json({
      products: transformedProducts,
      pagination: {
        currentPage: page,
        totalPages,
        totalProducts,
        hasNext,
        hasPrev
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
