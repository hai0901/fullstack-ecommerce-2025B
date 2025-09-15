const express = require('express');
const router = express.Router();

const { createAdmin } = require('../controllers/Admin/Create');
const { getAdmin, getAllAdmins } = require('../controllers/Admin/View');

const requireAuth = require('../middleware/requireAuth');
const requireRole = require('../middleware/requireRole');
const { validateIdParam, sendIfInvalid } = require('../middleware/validators');

router.post('/', requireAuth, requireRole('admin'), createAdmin);
router.get('/', requireAuth, requireRole('admin'), getAllAdmins);
router.get('/:id', requireAuth, requireRole('admin'), validateIdParam, sendIfInvalid, getAdmin);

module.exports = router;
