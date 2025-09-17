/*
 * RMIT University Vietnam
 * Course: COSC2769 - Full Stack Development
 * Semester: 2025B
 * Assessment: Assignment 02
 * Author: Nguyen Pham Tien Hai, Nguyen Thach Khanh Dzi
 * ID: s3979239, s3980883
 */

const Order = require('../../models/Order');
const User = require('../../models/User');
const Product = require('../../models/Product');
const CustomerProfile = require('../../models/CustomerProfile');

exports.createOrder = async (req, res) => {
  try {
    const { customerId: customerUsername, items, totalPrice, distributionHub } = req.body;

    console.log('Order creation request:', {
      customerUsername,
      itemsCount: items?.length,
      totalPrice,
      distributionHub
    });

    // Validate required fields
    if (!customerUsername || !items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Customer username and items are required' });
    }

    if (!totalPrice || totalPrice <= 0) {
      return res.status(400).json({ error: 'Valid total price is required' });
    }

    if (!distributionHub || !['danang', 'hochiminh', 'hanoi'].includes(distributionHub)) {
      return res.status(400).json({ error: 'Valid distribution hub is required (danang, hochiminh, hanoi)' });
    }

    // Verify customer exists by username
    const customer = await User.findOne({ username: customerUsername });
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    // Get customer profile to fetch address
    const customerProfile = await CustomerProfile.findOne({ username: customerUsername });
    if (!customerProfile) {
      return res.status(404).json({ error: 'Customer profile not found' });
    }

    console.log('Customer profile found:', {
      username: customerProfile.username,
      name: customerProfile.name,
      address: customerProfile.address
    });

    // Check if address is valid, provide fallback for testing
    let customerAddress = customerProfile.address;
    if (!customerAddress || customerAddress.trim() === '') {
      console.log('Customer address is missing or empty, using fallback:', {
        username: customerUsername,
        originalAddress: customerProfile.address
      });
      customerAddress = 'Address not provided - please update profile';
    }

    // Verify all products exist and get their details
    const productIds = items.map(item => item.productId);
    const products = await Product.find({ _id: { $in: productIds }, isDeleted: false });
    
    if (products.length !== productIds.length) {
      return res.status(400).json({ error: 'One or more products not found or deleted' });
    }

    // Create products array with price validation
    const orderProducts = items.map(item => {
      const product = products.find(p => p._id.toString() === item.productId);
      return {
        productId: item.productId,
        quantity: item.quantity,
        price: product.price // Use current product price
      };
    });

    // Create the order
    const order = new Order({
      customerId: customer._id, // Use the actual ObjectId from the found customer
      customerAddress: customerAddress, // Store customer's address (with fallback if needed)
      products: orderProducts,
      totalPrice,
      distributionHub,
      status: 'active'
    });

    console.log('Creating order with address:', customerAddress);
    await order.save();

    // Populate the order with product details for response
    const populatedOrder = await Order.findById(order._id)
      .populate('customerId', 'username name')
      .populate('products.productId', 'name image price');

    res.status(201).json({
      message: 'Order created successfully',
      order: populatedOrder
    });

  } catch (err) {
    console.error('Error creating order:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};