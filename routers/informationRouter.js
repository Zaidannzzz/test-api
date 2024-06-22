const express = require('express');
const informationController = require('../controllers/informationController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/banner', informationController.getBanners);
router.get('/services', authMiddleware, informationController.getServices);

module.exports = router;
