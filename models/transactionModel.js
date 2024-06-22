const pool = require('../config/database');

const getUserBalance = async (email) => {
  const result = await pool.query('SELECT balance FROM users WHERE email = $1', [email]);
  return result.rows[0].balance;
};

const updateUserBalance = async (email, amount) => {
  const result = await pool.query(
    'UPDATE users SET balance = balance + $1 WHERE email = $2 RETURNING balance',
    [amount, email]
  );
  return result.rows[0].balance;
};

const createTransaction = async (transaction) => {
  const { email, type, amount, description } = transaction;
  const result = await pool.query(
    'INSERT INTO transactions (email, transaction_type, amount, description, created_on) VALUES ($1, $2, $3, $4, NOW()) RETURNING *',
    [email, type, amount, description]
  );
  return result.rows[0];
};

const getTransactionHistory = async (email, limit, offset) => {
  const result = await pool.query(
    `SELECT * FROM transactions 
     WHERE email = $1 
     ORDER BY created_on DESC 
     LIMIT $2 OFFSET $3`,
    [email, limit, offset]
  );
  return result.rows;
};

const getServiceByCode = async (serviceCode) => {
  const result = await pool.query(
    'SELECT * FROM services WHERE service_code = $1',
    [serviceCode]
  );
  return result.rows[0];
};

module.exports = {
  getUserBalance,
  updateUserBalance,
  createTransaction,
  getTransactionHistory,
  getServiceByCode
};
