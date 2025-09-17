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

exports.getShopProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;
    const search = req.query.search || '';
    const category = req.query.category || '';
    const categories = req.query.categories || ''; // Support multiple categories
    const minPrice = parseFloat(req.query.minPrice) || 0;
    const maxPrice = parseFloat(req.query.maxPrice) || 1000000;

    // Validate parameters
    if (page < 1) {
      return res.status(400).json({ error: 'Page must be greater than 0' });
    }
    if (limit < 1 || limit > 100) {
      return res.status(400).json({ error: 'Limit must be between 1 and 100' });
    }
    if (minPrice < 0) {
      return res.status(400).json({ error: 'Minimum price cannot be negative' });
    }
    if (maxPrice < minPrice) {
      return res.status(400).json({ error: 'Maximum price cannot be less than minimum price' });
    }

    // Log filter parameters for debugging
    console.log('Filter parameters:', { search, category, categories, minPrice, maxPrice, page, limit });

    // Build filter object - all conditions must be met (AND logic)
    const filter = {
      isDeleted: false
    };

    // Add search filter (case-insensitive search in name and description)
    if (search && search.trim()) {
      filter.$or = [
        { name: { $regex: search.trim(), $options: 'i' } },
        { description: { $regex: search.trim(), $options: 'i' } }
      ];
    }

    // Add category filter (support both single category and multiple categories)
    let categoryIds = [];
    
    // Handle single category (backward compatibility)
    if (category && category.trim()) {
      const categoryDoc = await Category.findOne({ 
        name: { $regex: new RegExp(`^${category.trim()}$`, 'i') }, 
        isDeleted: false 
      });
      if (categoryDoc) {
        categoryIds.push(categoryDoc._id);
      } else {
        console.log('Single category not found:', category);
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
    
    // Handle multiple categories (comma-separated or array)
    if (categories && categories.trim()) {
      let categoryNames = [];
      
      // Check if categories is a string (comma-separated) or array
      if (typeof categories === 'string') {
        categoryNames = categories.split(',').map(cat => cat.trim()).filter(cat => cat);
      } else if (Array.isArray(categories)) {
        categoryNames = categories.map(cat => cat.trim()).filter(cat => cat);
      }
      
      if (categoryNames.length > 0) {
        const categoryDocs = await Category.find({ 
          name: { $in: categoryNames.map(name => new RegExp(`^${name}$`, 'i')) }, 
          isDeleted: false 
        });
        
        if (categoryDocs.length > 0) {
          categoryIds = [...categoryIds, ...categoryDocs.map(doc => doc._id)];
        } else {
          console.log('Multiple categories not found:', categoryNames);
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
    }
    
    // Apply category filter if we have any category IDs
    if (categoryIds.length > 0) {
      // Remove duplicates
      categoryIds = [...new Set(categoryIds)];
      
      if (categoryIds.length === 1) {
        filter.categoryId = categoryIds[0];
      } else {
        filter.categoryId = { $in: categoryIds };
      }
    }

    // Add price range filter (inclusive range)
    if (minPrice > 0 || maxPrice < 1000000) {
      filter.price = {};
      if (minPrice > 0) {
        filter.price.$gte = minPrice;
      }
      if (maxPrice < 1000000) {
        filter.price.$lte = maxPrice;
      }
    }

    // Log final filter object for debugging
    console.log('Final filter object:', JSON.stringify(filter, null, 2));

    // Calculate skip value for pagination
    const skip = (page - 1) * limit;

    // Get total count for pagination
    const totalProducts = await Product.countDocuments(filter);
    console.log('Total products found:', totalProducts);

    // Get products with pagination
    const products = await Product.find(filter)
      .populate('categoryId', 'name')
      .populate('vendorId', 'username')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Transform products to include category name and vendor username
    const transformedProducts = products.map(product => {
      // Convert relative image path to absolute URL
      let imageUrl = product.image;
      if (imageUrl && imageUrl.startsWith('/uploads/')) {
        imageUrl = `${req.protocol}://${req.get('host')}${imageUrl}`;
      }
      
      return {
        id: product._id,
        name: product.name,
        description: product.description,
        price: product.price,
        image: imageUrl,
        category: product.categoryId?.name || 'Uncategorized',
        vendor: product.vendorId?.username || 'Unknown',
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
      },
      filters: {
        search: search || null,
        category: category || null,
        categories: categories || null,
        minPrice: minPrice > 0 ? minPrice : null,
        maxPrice: maxPrice < 1000000 ? maxPrice : null
      }
    });

  } catch (error) {
    console.error('Error fetching shop products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
