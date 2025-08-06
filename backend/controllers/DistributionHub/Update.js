const DistributionHub = require('../../models/DistributionHub');

exports.updateDistributionHub = async (req, res) => {
  try {
    const updated = await DistributionHub.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};