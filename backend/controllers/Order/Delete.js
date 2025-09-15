// RMIT University Vietnam...
const Order = require('../../models/Order');
const { getShipperHubId } = require('./_helpers');

/**
 * DELETE /api/orders/:id
 * - customer: can cancel their OWN order only if status is 'active'
 * - shipper: can cancel order at their hub only if status is 'active'
 * Effect: set status -> 'canceled'
 */
exports.cancelOrder = async (req, res) => {
  try {
    const { role, uid } = req.auth;
    const { id } = req.params;

    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ error: 'Order not found' });

    if (order.status !== 'active') {
      return res.status(409).json({ error: 'Order is not active' });
    }

    if (role === 'customer') {
      if (order.customerId.toString() !== uid) {
        return res.status(403).json({ error: 'Forbidden' });
      }
    } else if (role === 'shipper') {
      const hubId = await getShipperHubId(uid);
      if (!hubId) return res.status(403).json({ error: 'No hub assigned' });
      if (order.distributionHubId.toString() !== hubId) {
        return res.status(403).json({ error: 'Forbidden' });
      }
    } else {
      return res.status(403).json({ error: 'Forbidden' });
    }

    order.status = 'canceled';
    await order.save();

    return res.json({ message: 'Order canceled', order });
  } catch (err) {
    console.error('cancelOrder error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
