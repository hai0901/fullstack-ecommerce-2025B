/*
 * RMIT University Vietnam
 * Course: COSC2769 - Full Stack Development
 * Semester: 2025B
 * Assessment: Assignment 02
 * Author: Nguyen Pham Tien Hai, Nguyen Thach Khanh Dzi
 * ID: s3979239, s3980883
 */

const Order = require('../../models/Order');

exports.cancelOrder = async (req, res) => {
  try {
    await Order.findByIdAndUpdate(req.params.id, { isCanceled: true });
    res.json({ message: 'Order canceled' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};