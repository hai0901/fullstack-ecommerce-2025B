const Genre = require('../../models/Genre');

exports.getGenre = async (req, res) => {
  try {
    const genre = await Genre.findById(req.params.id);
    res.json(genre);
  } catch (err) {
    res.status(404).json({ error: 'Genre not found' });
  }
};

exports.getAllGenres = async (req, res) => {
  try {
    const genres = await Genre.find({ isDeleted: false });
    res.json(genres);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};