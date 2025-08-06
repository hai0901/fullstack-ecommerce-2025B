const express = require('express');
const router = express.Router();

const { createAdmin } = require('../controllers/Admin/Create');
const { getAdmin, getAllAdmins } = require('../controllers/Admin/View');

router.post('/', createAdmin);
router.get('/', getAllAdmins);
router.get('/:id', getAdmin);

module.exports = router;
