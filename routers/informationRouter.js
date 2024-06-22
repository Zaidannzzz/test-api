const express = require('express');
const informationController = require('../controllers/informationController');
const router = express.Router();

router.get('/banner', informationController.getBanners);
router.get('/services', informationController.getServices);

module.exports = router;
