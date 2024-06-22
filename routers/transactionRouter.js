const express = require('express');
const transactionController = require('../controllers/transactionController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/balance', authMiddleware, transactionController.getBalance);
router.post('/topup', authMiddleware, transactionController.topUp);
router.post('/transaction', authMiddleware, transactionController.createTransaction);
router.get('/transaction/history', authMiddleware, transactionController.getTransactionHistory);

module.exports = router;
