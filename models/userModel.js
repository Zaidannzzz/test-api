const pool = require('../config/database');

const createUser = async (user) => {
  const { email, first_name, last_name, password } = user;
  const result = await pool.query(
    'INSERT INTO users (email, first_name, last_name, password) VALUES ($1, $2, $3, $4) RETURNING *',
    [email, first_name, last_name, password]
  );
  return result.rows[0];
};

const getUserByEmail = async (email) => {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
};

const updateUserProfile = async (email, first_name, last_name) => {
  const result = await pool.query(
    'UPDATE users SET first_name = $1, last_name = $2 WHERE email = $3 RETURNING *',
    [first_name, last_name, email]
  );
  return result.rows[0];
};

const updateUserImage = async (email, imagePath) => {
  const result = await pool.query(
    'UPDATE users SET profile_image = $1 WHERE email = $2 RETURNING *',
    [imagePath, email]
  );
  return result.rows[0];
};


module.exports = {
  createUser,
  getUserByEmail,
  updateUserProfile,
  updateUserImage,
};
