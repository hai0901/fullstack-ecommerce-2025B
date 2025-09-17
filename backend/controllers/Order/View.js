/*
 * RMIT University Vietnam
 * Course: COSC2769 - Full Stack Development
 * Semester: 2025B
 * Assessment: Assignment 02
 * Author: Nguyen Pham Tien Hai, Nguyen Thach Khanh Dzi
 * ID: s3979239, s3980883
 */

const Order = require('../../models/Order');
const CustomerProfile = require('../../models/CustomerProfile');

exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('customerId', 'username')
      .populate('products.productId', 'name image price vendorId')
      .populate('products.productId.vendorId', 'username');

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Convert to object and fetch customer name
    const transformedOrder = order.toObject();
    
    // Get customer name from CustomerProfile
    if (transformedOrder.customerId && transformedOrder.customerId.username) {
      const customerProfile = await CustomerProfile.findOne({ 
        username: transformedOrder.customerId.username 
      });
      if (customerProfile) {
        transformedOrder.customerId.name = customerProfile.name;
      }
    }
    
    // Convert relative image paths to absolute URLs
    transformedOrder.products = transformedOrder.products.map(product => {
      if (product.productId && product.productId.image && product.productId.image.startsWith('/uploads/')) {
        product.productId.image = `${req.protocol}://${req.get('host')}${product.productId.image}`;
      }
      return product;
    });

    res.json(transformedOrder);
  } catch (err) {
    console.error('Error fetching order:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('customerId', 'username')
      .populate('products.productId', 'name image price')
      .sort({ createdAt: -1 });

    // Fetch customer names and convert relative image paths to absolute URLs
    const transformedOrders = await Promise.all(orders.map(async (order) => {
      const transformedOrder = order.toObject();
      
      // Get customer name from CustomerProfile
      if (transformedOrder.customerId && transformedOrder.customerId.username) {
        const customerProfile = await CustomerProfile.findOne({ 
          username: transformedOrder.customerId.username 
        });
        if (customerProfile) {
          transformedOrder.customerId.name = customerProfile.name;
        }
      }
      
      // Convert relative image paths to absolute URLs
      transformedOrder.products = transformedOrder.products.map(product => {
        if (product.productId && product.productId.image && product.productId.image.startsWith('/uploads/')) {
          product.productId.image = `${req.protocol}://${req.get('host')}${product.productId.image}`;
        }
        return product;
      });
      
      return transformedOrder;
    }));

    res.json(transformedOrders);
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getOrdersByDistributionHub = async (req, res) => {
  try {
    const { hub } = req.params;
    const { status } = req.query;
    
    console.log('Fetching orders for distribution hub:', hub, 'with status filter:', status);
    
    // Validate hub parameter
    if (!['danang', 'hochiminh', 'hanoi'].includes(hub)) {
      console.log('Invalid hub parameter:', hub);
      return res.status(400).json({ error: 'Invalid distribution hub' });
    }
    
    // Build filter object
    const filter = {
      distributionHub: hub,
      isCanceled: false
    };
    
    // Add status filter if provided
    if (status && ['active', 'delivered', 'cancelled'].includes(status)) {
      filter.status = status;
    } else {
      // Default to active orders if no status specified
      filter.status = 'active';
    }
    
    console.log('Filter object:', filter);
    
    const orders = await Order.find(filter)
      .populate('customerId', 'username')
      .populate('products.productId', 'name image price vendorId')
      .populate('products.productId.vendorId', 'username')
      .sort({ createdAt: -1 });

    console.log(`Found ${orders.length} orders for hub ${hub}`);
    
    // Debug: Log customer data for first order
    if (orders.length > 0) {
      console.log('Sample order customer data:', {
        orderId: orders[0]._id,
        customerId: orders[0].customerId,
        customerName: orders[0].customerId?.name,
        customerUsername: orders[0].customerId?.username
      });
    }

    // Fetch customer names from CustomerProfile and convert relative image paths to absolute URLs
    let transformedOrders = await Promise.all(orders.map(async (order) => {
      const transformedOrder = order.toObject();
      
      // Get customer name from CustomerProfile
      if (transformedOrder.customerId && transformedOrder.customerId.username) {
        const customerProfile = await CustomerProfile.findOne({ 
          username: transformedOrder.customerId.username 
        });
        if (customerProfile) {
          transformedOrder.customerId.name = customerProfile.name;
        }
      }
      
      // Convert relative image paths to absolute URLs
      transformedOrder.products = transformedOrder.products.map(product => {
        if (product.productId && product.productId.image && product.productId.image.startsWith('/uploads/')) {
          product.productId.image = `${req.protocol}://${req.get('host')}${product.productId.image}`;
        }
        return product;
      });
      
      return transformedOrder;
    }));

    res.json(transformedOrders);
  } catch (err) {
    console.error('Error fetching orders by distribution hub:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};