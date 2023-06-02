const app = require('./app');
const connectDB = require('./db/database');

/* Handeling uncaught exceptions */
process.on('uncaughtException', error => console.log(`Error :- ${error.message}`));

/* CONFIG */
if (process.env.NODE_ENV !== 'PRODUCTION') {
  require('dotenv').config({
    path: 'backend/config/.env',
  });
}

/* connect database */
connectDB();

/* Create Server */
const server = app.listen(process.env.PORT, () => {
  console.log(`Server started on http://localhost/${process.env.PORT}`);
});

/* Unhandled promise rejection */
process.on('unhandledRejection', error => {
  console.log(`Error :- ${error.message}`);

  /* close server */
  server.close(() => {
    console.log('Shutting down the server');
    process.exit(1);
  });
});
