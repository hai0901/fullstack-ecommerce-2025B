// RMIT University Vietnam...
const Order = require('../../models/Order');
const { getShipperHubId } = require('./_helpers');

/**
 * PUT /api/orders/:id
 * Body: { status: 'delivered' | 'canceled' }
 * Shipper-only (enforced by route):
 * - can update ONLY orders for their hub
 * - can update ONLY if status is currently 'active'
 */
exports.updateOrder = async (req, res) => {
  try {
    const { uid } = req.auth; // role already checked in route
    const { id } = req.params;
    const { status } = req.body || {};

    if (!['delivered', 'canceled'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status. Use delivered or canceled' });
    }

    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ error: 'Order not found' });

    if (order.status !== 'active') {
      return res.status(409).json({ error: 'Order is not active' });
    }

    const hubId = await getShipperHubId(uid);
    if (!hubId) return res.status(403).json({ error: 'No hub assigned' });

    if (order.distributionHubId.toString() !== hubId) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    order.status = status; // delivered | canceled
    await order.save();

    return res.json({ message: 'Order updated', order });
  } catch (err) {
    console.error('updateOrder error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
