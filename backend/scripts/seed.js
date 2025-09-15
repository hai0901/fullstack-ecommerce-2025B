// scripts/seed.js
// RMIT University Vietnam | COSC2769 | 2025B | Assignment 02
// Run: node scripts/seed.js

require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('../models/User');
const Admin = require('../models/Admin');
const CustomerProfile = require('../models/CustomerProfile');
const VendorProfile = require('../models/VendorProfile');
const ShipperProfile = require('../models/ShipperProfile');
const DistributionHub = require('../models/DistributionHub');
const Product = require('../models/Product');
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Review = require('../models/Review');
const ChatLog = require('../models/ChatLog');

let Genre = null;
try { Genre = require('../models/Genre'); } catch (_) {}

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/fullstack2025B';

async function main() {
  console.log('Connecting to', MONGO_URI);
  await mongoose.connect(MONGO_URI);

  console.log('🧹 Wiping collections...');
  await Promise.allSettled([
    User.deleteMany({}),
    Admin.deleteMany({}),
    CustomerProfile.deleteMany({}),
    VendorProfile.deleteMany({}),
    ShipperProfile.deleteMany({}),
    DistributionHub.deleteMany({}),
    Product.deleteMany({}),
    Order.deleteMany({}),
    Cart.deleteMany({}),
    Review.deleteMany({}),
    ChatLog.deleteMany({}),
    Genre ? Genre.deleteMany({}) : Promise.resolve(),
  ]);

  console.log('🌐 Seeding Distribution Hubs...');
  const hubs = await DistributionHub.insertMany([
    { name: 'Ho Chi Minh Hub', address: 'District 1' },
    { name: 'Ha Noi Hub', address: 'Ba Dinh' },
    { name: 'Da Nang Hub', address: 'Hai Chau' },
  ]);

  console.log('📚 Seeding Genres...');
  let genres = [];
  if (Genre) {
    genres = await Genre.insertMany([
      { name: 'Electronics' },
      { name: 'Home' },
      { name: 'Fashion' },
    ]);
  }

  const passwordHash = await bcrypt.hash('Abc12345!', 12);

  console.log('👤 Seeding Vendor...');
  const vendorUser = await User.create({
    email: 'vendor@test.com',
    passwordHash,
    role: 'vendor',
    isVerified: true,
  });

  const vendorProfile = await VendorProfile.create({
    userId: vendorUser._id,
    businessName: 'Seeded Biz',
    businessAddress: '123 Vendor St',
    profileImage: null,
  });

  vendorUser.roleProfileId = vendorProfile._id;
  await vendorUser.save();

  console.log('🧍 Seeding Customer...');
  const customerUser = await User.create({
    email: 'customer@test.com',
    passwordHash,
    role: 'customer',
    isVerified: true,
  });

  const customerProfile = await CustomerProfile.create({
    userId: customerUser._id,
    name: 'Seeded Customer',
    address: '456 Test Ave',
    profileImage: null,
  });

  customerUser.roleProfileId = customerProfile._id;
  await customerUser.save();

  console.log('🚚 Seeding Shipper...');
  const shipperUser = await User.create({
    email: 'shipper@test.com',
    passwordHash,
    role: 'shipper',
    isVerified: true,
  });

  const shipperProfile = await ShipperProfile.create({
    userId: shipperUser._id,
    distributionHubId: hubs[0]._id,
    profileImage: null,
  });

  shipperUser.roleProfileId = shipperProfile._id;
  await shipperUser.save();

  console.log('🛒 Seeding Products...');
  const products = await Product.insertMany([
    {
      name: 'Seeded Keyboard',
      price: 49.99,
      description: 'A nice seeded keyboard',
      image: null,
      genreId: genres[0]?._id,
      availableStock: 50,
      vendorId: vendorUser._id,
    },
    {
      name: 'Seeded Headphones',
      price: 89.9,
      description: 'Cushioned over-ear headphones',
      image: null,
      genreId: genres[0]?._id,
      availableStock: 30,
      vendorId: vendorUser._id,
    },
  ]);

  console.log('🛒 Seeding Cart...');
  await Cart.create({
    customerId: customerUser._id,
    items: [
      { productId: products[0]._id, qty: 2, vendorId: vendorUser._id, price: products[0].price },
      { productId: products[1]._id, qty: 1, vendorId: vendorUser._id, price: products[1].price },
    ],
  });

  console.log('📦 Seeding Order...');
  const hubIdx = Math.floor(Math.random() * hubs.length);
  await Order.create({
    customerId: customerUser._id,
    items: [
      { productId: products[0]._id, qty: 1, vendorId: vendorUser._id, price: products[0].price },
    ],
    total: products[0].price * 1,
    status: 'active',
    distributionHubId: hubs[hubIdx]._id,
  });

  console.log('⭐ Seeding Review...');
  await Review.create({
    user: customerUser._id,
    product: products[0]._id,
    rating: 5,
    comment: 'Excellent product!',
  });

  console.log('💬 Seeding ChatLog...');
  await ChatLog.create({
    sender: customerUser._id,
    message: 'Is this keyboard mechanical?',
  });

  console.log('🔐 Seeding Admin...');
  await Admin.create({
    email: 'admin@test.com',
    password: await bcrypt.hash('Admin123!', 12),
  });

  console.log('\n✅ Seeding complete.');
  console.log('- Admin: admin@test.com / Admin123!');
  console.log('- Vendor: vendor@test.com / Abc12345!');
  console.log('- Customer: customer@test.com / Abc12345!');
  console.log('- Shipper: shipper@test.com / Abc12345!');
  console.log('- Products:', products.map(p => p.name).join(', '));
  console.log('- Hubs:', hubs.map(h => h.name).join(', '));

  await mongoose.disconnect();
}

main().catch(err => {
  console.error('❌ Error during seeding:', err);
  process.exit(1);
});
