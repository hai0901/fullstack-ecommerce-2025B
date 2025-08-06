const mongoose = require('mongoose');
const { Schema } = mongoose;

const genreSchema = new Schema({
  name: { type: String },
  description: { type: String },
  parentGenreId: { type: Schema.Types.ObjectId, ref: 'Genre' },
  createdAt: { type: Date, default: Date.now },
  isDeleted: { type: Boolean, default: false },
});

module.exports = mongoose.model('Genre', genreSchema);
