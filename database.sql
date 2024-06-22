CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  balance NUMERIC DEFAULT 0,
  profile_image VARCHAR(255)
);

CREATE TABLE banners (
  id SERIAL PRIMARY KEY,
  banner_name VARCHAR(255) NOT NULL,
  banner_image VARCHAR(255) NOT NULL,
  description TEXT NOT NULL
);

CREATE TABLE services (
  id SERIAL PRIMARY KEY,
  service_code VARCHAR(50) NOT NULL,
  service_name VARCHAR(255) NOT NULL,
  service_icon VARCHAR(255) NOT NULL,
  service_tariff INT NOT NULL
);

CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  email VARCHAR(100) NOT NULL,
  transaction_type VARCHAR(50) NOT NULL,
  amount INT NOT NULL,
  description TEXT NOT NULL,
  created_on TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (email) REFERENCES users (email)
);
