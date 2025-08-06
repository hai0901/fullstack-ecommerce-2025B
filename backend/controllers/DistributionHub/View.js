const DistributionHub = require('../../models/DistributionHub');

exports.getDistributionHub = async (req, res) => {
  try {
    const hub = await DistributionHub.findById(req.params.id);
    res.json(hub);
  } catch (err) {
    res.status(404).json({ error: 'DistributionHub not found' });
  }
};

exports.getAllDistributionHubs = async (req, res) => {
  try {
    const hubs = await DistributionHub.find();
    res.json(hubs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};