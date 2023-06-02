const express = require('express');
const path = require('path');
const User = require('../model/user');
const router = express.Router();
const { upload } = require('../../multer');
const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const fs = require('fs');
const jwt = require('jsonwebtoken');

router.post('/create-user', upload.single('file'), async (req, res, next) => {
  const { name, email, password } = req.body;

  const userEmail = await User.findOne({ email });

  if (userEmail) {
    const filename = req.file.filename;
    const filePath = `uploads/${filename}`;

    fs.unlink(filePath, error => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error deleting file' });
      }

      return res.json({ message: 'File deleted successfully' });
    });
    return next(new ErrorHandler('User already exist', 400));
  }

  const filename = req.file.filename;
  const fileUrl = path.join(filename);
  const avatar = fileUrl;

  const user = { name, email, password, avatar };

  const newUser = await User.create(user);

  res.status(201).json({
    success: true,
    user: newUser,
  });
});

module.exports = router;
