/*
 * RMIT University Vietnam
 * Course: COSC2769 - Full Stack Development
 * Semester: 2025B
 * Assessment: Assignment 02
 * Author: Nguyen Pham Tien Hai, Nguyen Thach Khanh Dzi
 * ID: s3979239, s3980883
 */

const Order = require('../../models/Order');

exports.updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate status
    if (!status || !['active', 'delivered', 'cancelled'].includes(status)) {
      return res.status(400).json({ error: 'Valid status is required (active, delivered, cancelled)' });
    }

    // Find the order
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Update the order
    const updatedOrder = await Order.findByIdAndUpdate(
      id, 
      { 
        status,
        updatedAt: new Date()
      }, 
      { new: true }
    )
      .populate('customerId', 'username name')
      .populate('products.productId', 'name image price vendorId')
      .populate('products.productId.vendorId', 'username');

    res.json({
      message: 'Order updated successfully',
      order: updatedOrder
    });

  } catch (err) {
    console.error('Error updating order:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};