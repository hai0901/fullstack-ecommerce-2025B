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