/*
 * RMIT University Vietnam
 * Course: COSC2769 - Full Stack Development
 * Semester: 2025B
 * Assessment: Assignment 02
 * Author: Nguyen Pham Tien Hai, Nguyen Thach Khanh Dzi
 * ID: s3979239, s3980883
 */

const Product = require('../../models/Product');

exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, { isDeleted: true });
    res.json({ message: 'Product soft-deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};