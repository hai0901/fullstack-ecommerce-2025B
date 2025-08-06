const Cart = require('../../models/Cart');

exports.deleteCart = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.json({ message: 'Cart deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};