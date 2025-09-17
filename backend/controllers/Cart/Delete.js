/*
 * RMIT University Vietnam
 * Course: COSC2769 - Full Stack Development
 * Semester: 2025B
 * Assessment: Assignment 02
 * Author: Nguyen Pham Tien Hai, Nguyen Thach Khanh Dzi
 * ID: s3979239, s3980883
 */

const Cart = require('../../models/Cart');

exports.deleteCart = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.json({ message: 'Cart deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};