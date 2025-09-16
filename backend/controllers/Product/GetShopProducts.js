const Product = require('../../models/Product');
const Category = require('../../models/Category');

exports.getShopProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;
    const search = req.query.search || '';
    const category = req.query.category || '';
    const minPrice = parseFloat(req.query.minPrice) || 0;
    const maxPrice = parseFloat(req.query.maxPrice) || Infinity;

    // Build filter object
    const filter = {
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

    // Add price range filter
    if (minPrice > 0 || maxPrice < Infinity) {
      filter.price = {};
      if (minPrice > 0) filter.price.$gte = minPrice;
      if (maxPrice < Infinity) filter.price.$lte = maxPrice;
    }

    // Calculate skip value for pagination
    const skip = (page - 1) * limit;

    // Get total count for pagination
    const totalProducts = await Product.countDocuments(filter);

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
      }
    });

  } catch (error) {
    console.error('Error fetching shop products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
