/*
 * RMIT University Vietnam
 * Course: COSC2769 - Full Stack Development
 * Semester: 2025B
 * Assessment: Assignment 02
 * Author: Nguyen Pham Tien Hai, Nguyen Thach Khanh Dzi
 * ID: s3979239, s3980883
 */

const Cart = require('../../models/Cart');

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id);
    res.json(cart);
  } catch (err) {
    res.status(404).json({ error: 'Cart not found' });
  }
};

exports.getAllCarts = async (req, res) => {
  try {
    const carts = await Cart.find();
    res.json(carts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};