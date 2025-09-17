/*
 * RMIT University Vietnam
 * Course: COSC2769 - Full Stack Development
 * Semester: 2025B
 * Assessment: Assignment 02
 * Author: Nguyen Pham Tien Hai, Nguyen Thach Khanh Dzi
 * ID: s3979239, s3980883
 */

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