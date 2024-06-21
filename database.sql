CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  balance NUMERIC DEFAULT 0,
  image VARCHAR(255)
);

CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  type VARCHAR(50),
  amount NUMERIC,
  details TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);