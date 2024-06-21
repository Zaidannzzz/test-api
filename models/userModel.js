const pool = require('../config/database');

const createUser = async (user) => {
  const { email, first_name, last_name, password } = user;
  const result = await pool.query(
    'INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *',
    [email, first_name, last_name, password]
  );
  return result.rows[0];
};

const getUserByEmail = async (email) => {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
};

module.exports = {
  createUser,
  getUserByEmail
};
