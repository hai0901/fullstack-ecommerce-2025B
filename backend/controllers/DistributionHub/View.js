/*
 * RMIT University Vietnam
 * Course: COSC2769 - Full Stack Development
 * Semester: 2025B
 * Assessment: Assignment 02
 * Author: Nguyen Pham Tien Hai, Nguyen Thach Khanh Dzi
 * ID: s3979239, s3980883
 */

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