const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const ErrorHandler = require('./utils/ErrorHandler');
const user = require('./controller/user');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: true }));

/* CONFIG */
if (process.env.NODE_ENV !== 'PRODUCTION') {
  require('dotenv').config({
    path: 'backend/config/.env',
  });
}

/* Import Routes */
app.use('/api/v2/user', user);

/* catch error */
app.use(ErrorHandler);

module.exports = app;
