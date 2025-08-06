const DistributionHub = require('../../models/DistributionHub');

exports.deleteDistributionHub = async (req, res) => {
  try {
    await DistributionHub.findByIdAndDelete(req.params.id);
    res.json({ message: 'DistributionHub deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};