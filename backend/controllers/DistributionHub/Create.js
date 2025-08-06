const DistributionHub = require('../../models/DistributionHub');

exports.createDistributionHub = async (req, res) => {
  try {
    const hub = new DistributionHub(req.body);
    await hub.save();
    res.status(201).json(hub);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};