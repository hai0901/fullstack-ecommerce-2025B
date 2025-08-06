const Order = require('../../models/Order');

exports.cancelOrder = async (req, res) => {
  try {
    await Order.findByIdAndUpdate(req.params.id, { isCanceled: true });
    res.json({ message: 'Order canceled' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};