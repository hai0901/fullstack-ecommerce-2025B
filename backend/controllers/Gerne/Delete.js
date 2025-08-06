const Genre = require('../../models/Genre');

exports.deleteGenre = async (req, res) => {
  try {
    await Genre.findByIdAndUpdate(req.params.id, { isDeleted: true });
    res.json({ message: 'Genre soft-deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};