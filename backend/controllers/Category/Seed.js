const Category = require('../../models/Category');

const categories = [
  { name: 'Electronics' },
  { name: 'Clothing' },
  { name: 'Books' },
  { name: 'Home & Garden' },
  { name: 'Sports' },
  { name: 'Beauty & Personal Care' },
  { name: 'Automotive' },
  { name: 'Baby Products' },
  { name: 'Health & Household' },
  { name: 'Office Products' },
  { name: 'Pet Supplies' },
  { name: 'Toys & Games' },
  { name: 'Jewelry' },
  { name: 'Musical Instruments' },
  { name: 'Software' },
  { name: 'Video Games' },
  { name: 'Movies & TV' },
  { name: 'Tools & Home Improvement' },
  { name: 'Industrial & Scientific' },
  { name: 'Grocery & Gourmet Food' },
  { name: 'Arts, Crafts & Sewing' },
  { name: 'Patio, Lawn & Garden' },
  { name: 'Appliances' },
  { name: 'Cell Phones & Accessories' }
];

exports.seedCategories = async (req, res) => {
  try {
    // Check if categories already exist
    const existingCategories = await Category.countDocuments();
    if (existingCategories > 0) {
      return res.json({ 
        message: 'Categories already exist', 
        count: existingCategories 
      });
    }

    // Insert new categories
    const insertedCategories = await Category.insertMany(categories);
    res.json({ 
      message: `Successfully seeded ${insertedCategories.length} categories`,
      categories: insertedCategories
    });
  } catch (error) {
    console.error('Error seeding categories:', error);
    res.status(500).json({ error: 'Failed to seed categories' });
  }
};
