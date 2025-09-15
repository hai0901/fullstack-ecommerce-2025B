// routes/DistributionHub.js
const express = require('express');
const router = express.Router();

const { createDistributionHub } = require('../controllers/DistributionHub/Create');
const { updateDistributionHub } = require('../controllers/DistributionHub/Update');
const { deleteDistributionHub } = require('../controllers/DistributionHub/Delete');
const { getDistributionHub, getAllDistributionHubs } = require('../controllers/DistributionHub/View');

const requireAuth = require('../middleware/requireAuth');
const requireRole = require('../middleware/requireRole');
const { validateIdParam, validateHubCreate, validateHubUpdate, sendIfInvalid } = require('../middleware/validators');

// Create hub — admin only
router.post(
  '/',
  requireAuth,
  requireRole('admin'),
  validateHubCreate,
  sendIfInvalid,
  createDistributionHub
);

// Public: list hubs (shipper/customer/vendor can read)
router.get('/', getAllDistributionHubs);

// Public: get one hub
router.get('/:id', validateIdParam, sendIfInvalid, getDistributionHub);

// Update hub — admin only
router.put(
  '/:id',
  requireAuth,
  requireRole('admin'),
  validateIdParam,
  validateHubUpdate,
  sendIfInvalid,
  updateDistributionHub
);

// Delete hub — admin only
router.delete(
  '/:id',
  requireAuth,
  requireRole('admin'),
  validateIdParam,
  sendIfInvalid,
  deleteDistributionHub
);

module.exports = router;
