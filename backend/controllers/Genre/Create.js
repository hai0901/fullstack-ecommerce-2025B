const Genre = require('../../models/Genre');

exports.createGenre = async (req, res) => {
  try {
    const genre = new Genre(req.body);
    await genre.save();
    res.status(201).json(genre);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

