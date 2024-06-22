const pool = require('../config/database');

const getAllBanners = async () => {
  const result = await pool.query('SELECT banner_name, banner_image, description FROM banners');
  return result.rows;
};

const getAllServices = async () => {
  const result = await pool.query('SELECT service_code, service_name, service_icon, service_tariff FROM services');
  return result.rows;
};

module.exports = {
  getAllServices,
  getAllBanners
};
