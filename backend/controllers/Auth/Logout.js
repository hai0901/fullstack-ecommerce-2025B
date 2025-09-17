/*
 * RMIT University Vietnam
 * Course: COSC2769 - Full Stack Development
 * Semester: 2025B
 * Assessment: Assignment 02
 * Author: Nguyen Pham Tien Hai, Nguyen Thach Khanh Dzi
 * ID: s3979239, s3980883
 */

exports.logout = async (req, res) => {
  try {
    // If sessions are used, destroy session
    if (req.session) {
      req.session.destroy(() => {});
    }
    // Advise client to drop token; also attempt to clear common auth cookies
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


