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


