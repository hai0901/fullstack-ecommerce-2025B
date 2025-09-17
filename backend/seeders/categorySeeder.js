/*
 * RMIT University Vietnam
 * Course: COSC2769 - Full Stack Development
 * Semester: 2025B
 * Assessment: Assignment 02
 * Author: Nguyen Pham Tien Hai, Nguyen Thach Khanh Dzi
 * ID: s3979239, s3980883
 */

const mongoose = require('mongoose');
const Category = require('../models/Category');

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

const seedCategories = async () => {
  try {
    // Clear existing categories
    await Category.deleteMany({});
    console.log('Cleared existing categories');

    // Insert new categories
    const insertedCategories = await Category.insertMany(categories);
    console.log(`Seeded ${insertedCategories.length} categories`);

    return insertedCategories;
  } catch (error) {
    console.error('Error seeding categories:', error);
    throw error;
  }
};

// Run seeder if called directly
if (require.main === module) {
  mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/neomall')
    .then(() => {
      console.log('Connected to MongoDB');
      return seedCategories();
    })
    .then(() => {
      console.log('Category seeding completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Seeding failed:', error);
      process.exit(1);
    });
}

module.exports = { seedCategories };
