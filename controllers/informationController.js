const informationModel = require('../models/informationModel');

const getBanners = async (req, res) => {
  try {
    const banners = await informationModel.getAllBanners();
    res.status(200).json({
      status: 0,
      message: "Sukses",
      data: banners
    });
  } catch (error) {
    res.status(500).json({
      status: 1,
      message: "Terjadi kesalahan pada server",
      error: error.message
    });
  }
};

const getServices = async (req, res) => {
  try {
    const services = await informationModel.getAllServices();
    res.status(200).json({
      status: 0,
      message: "Sukses",
      data: services
    });
  } catch (error) {
    res.status(500).json({
      status: 1,
      message: "Terjadi kesalahan pada server",
      error: error.message
    });
  }
};

module.exports = {
  getBanners,
  getServices,
};
