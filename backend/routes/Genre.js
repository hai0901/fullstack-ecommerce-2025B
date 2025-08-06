const express = require('express');
const router = express.Router();

const { createGenre } = require('../controllers/Genre/Create');
const { updateGenre } = require('../controllers/Genre/Update');
const { deleteGenre } = require('../controllers/Genre/Delete');
const { getGenre, getAllGenres } = require('../controllers/Genre/View');

router.post('/', createGenre);
router.get('/', getAllGenres);
router.get('/:id', getGenre);
router.put('/:id', updateGenre);
router.delete('/:id', deleteGenre);

module.exports = router;
