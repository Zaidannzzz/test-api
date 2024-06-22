const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadsDir = 'uploads';
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /jpeg|jpg|png/;
  const isMimeTypeValid = allowedFileTypes.test(file.mimetype);
  const isExtNameValid = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());

  if (isMimeTypeValid && isExtNameValid) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG and PNG are allowed.'));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

module.exports = upload;
