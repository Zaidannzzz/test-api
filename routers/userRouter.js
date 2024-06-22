const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../config/storage');

const router = express.Router();

router.get('/profile', authMiddleware, userController.getProfile);
router.put('/profile', authMiddleware, userController.updateProfile);
router.put('/profile/image', authMiddleware, upload.single(), userController.updateImage);

module.exports = router;
