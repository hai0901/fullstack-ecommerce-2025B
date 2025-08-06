const express = require('express');
const router = express.Router();

const { createDistributionHub } = require('../controllers/DistributionHub/Create');
const { updateDistributionHub } = require('../controllers/DistributionHub/Update');
const { deleteDistributionHub } = require('../controllers/DistributionHub/Delete');
const { getDistributionHub, getAllDistributionHubs } = require('../controllers/DistributionHub/View');

router.post('/', createDistributionHub);
router.get('/', getAllDistributionHubs);
router.get('/:id', getDistributionHub);
router.put('/:id', updateDistributionHub);
router.delete('/:id', deleteDistributionHub);

module.exports = router;
