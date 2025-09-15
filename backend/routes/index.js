// routes/index.js
const express = require('express');
const router = express.Router();

router.use('/auth', require('./Auth'));
router.use('/categories', require('./Category'));
router.use('/products', require('./Product'));
router.use('/reviews', require('./Review'));
router.use('/orders', require('./Order'));
router.use('/carts', require('./Cart'));
router.use('/chatlogs', require('./ChatLog'));
router.use('/distributionhubs', require('./DistributionHub'));
router.use('/admins', require('./Admin'));

module.exports = router;
