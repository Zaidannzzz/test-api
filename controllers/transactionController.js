const transactionModel = require('../models/transactionModel');

const getBalance = async (req, res) => {
  const balance = await transactionModel.getUserBalance(req.user.email);
  res.status(200).json({
    status: 0,
    message: "Get Balance Berhasil",
    data: {balance: balance},
  });
};

const topUp = async (req, res) => {
  const { top_up_amount } = req.body;

  if (top_up_amount <= 0 || !top_up_amount) {
    return res.status(400).json({
      status: 1,
      message: "Jumlah top up tidak valid",
    });
  }

  try {
    const newBalance = await transactionModel.updateUserBalance(req.user.email, top_up_amount);
    await transactionModel.createTransaction({
      email: req.user.email,
      type: 'TOPUP',
      amount: top_up_amount,
      description: 'Top Up balance',
    });

    res.status(200).json({
      status: 0,
      message: "Top Up Balance berhasil",
      data: { balance: newBalance },
    });
  } catch (error) {
    res.status(500).json({
      status: 1,
      message: "Terjadi kesalahan pada server",
      error: error.message,
    });
  }
};

const createTransaction = async (req, res) => {
  const { service_code } = req.body;

  try {
    const service = await transactionModel.getServiceByCode(service_code);

    if (!service) {
      return res.status(404).json({
        status: 1,
        message: "Service atau Layanan tidak ditemukan",
      });
    }

    const { service_name, service_tariff } = service;

    const currentBalance = await transactionModel.updateUserBalance(req.user.email, 0);

    if (currentBalance < service_tariff) {
      return res.status(400).json({
        status: 1,
        message: "Saldo tidak mencukupi",
      });
    }

    await transactionModel.updateUserBalance(req.user.email, -service_tariff);

    const transaction = await transactionModel.createTransaction({
      email: req.user.email,
      type: 'PAYMENT',
      amount: service_tariff,
      description: service_name,
    });

    res.status(200).json({
      status: 0,
      message: "Transaksi berhasil",
      data: {
        invoice_number: `INV${new Date().toISOString().slice(0,10).replace(/-/g,"")}-${transaction.id}`,
        service_code,
        service_name,
        transaction_type: 'PAYMENT',
        total_amount: service_tariff,
        created_on: transaction.created_on,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 1,
      message: "Terjadi kesalahan pada server",
      error: error.message,
    });
  }
};

const getTransactionHistory = async (req, res) => {
  const { limit = 10, offset = 0 } = req.query;

  try {
    const transactions = await transactionModel.getTransactionHistory(req.user.email, limit, offset);

    res.status(200).json({
      status: 0,
      message: "Get History Berhasil",
      data: {
        offset: parseInt(offset),
        limit: parseInt(limit),
        records: transactions,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 1,
      message: "Terjadi kesalahan pada server",
      error: error.message,
    });
  }
};

module.exports = {
  getBalance,
  topUp,
  createTransaction,
  getTransactionHistory,
};
