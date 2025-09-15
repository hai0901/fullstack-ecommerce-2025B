const Order = require('../../models/Order');
const { getShipperHubId } = require('./_helpers');

/**
 * GET /api/orders
 * - customer: returns all orders that belong to the logged-in customer
 * - shipper: returns only ACTIVE orders for the shipper's distribution hub
 */
exports.getAllOrders = async (req, res) => {
  try {
    const { role, uid } = req.auth;

    if (role === 'customer') {
      const orders = await Order.find({ customerId: uid }).sort({ createdAt: -1 });
      return res.json({ orders });
    }

    if (role === 'shipper') {
      const hubId = await getShipperHubId(uid);
      if (!hubId) return res.status(403).json({ error: 'No hub assigned' });

      const orders = await Order.find({
        distributionHubId: hubId,
        status: 'active',
      }).sort({ createdAt: -1 });

      return res.json({ orders });
    }

    return res.status(403).json({ error: 'Forbidden' });
  } catch (err) {
    console.error('getAllOrders error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * GET /api/orders/:id
 * - customer: can view only own order
 * - shipper: can view order if order.distributionHubId == shipper's hub
 */
exports.getOrder = async (req, res) => {
  try {
    const { role, uid } = req.auth;
    const { id } = req.params;

    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ error: 'Order not found' });

    if (role === 'customer') {
      if (order.customerId.toString() !== uid) {
        return res.status(403).json({ error: 'Forbidden' });
      }
      return res.json({ order });
    }

    if (role === 'shipper') {
      const hubId = await getShipperHubId(uid);
      if (!hubId) return res.status(403).json({ error: 'No hub assigned' });

      if (order.distributionHubId.toString() !== hubId) {
        return res.status(403).json({ error: 'Forbidden' });
      }
      return res.json({ order });
    }

    return res.status(403).json({ error: 'Forbidden' });
  } catch (err) {
    console.error('getOrder error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};