const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();

const mongoose = require('mongoose');
const { db } = require('./config/config');
const middlewares = require('./middlewares');
// const isAuthenticated = require('./middlewares/isAuthenticated');
const api = require('./api');

const app = express();

const whitelist = [
  'http://localhost:3000',
  '*'
];
const options = {
  origin(origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('No no no no. You can\'t do that dear'));
    }
  }
};

app.use(cors(options));
require('./services/passport');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet());
app.use(express.json());
mongoose.connect(db.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.get('/', (req, res) => {
  res.json({
    message: '💻'
  });
});

app.use('/api/v1', api);
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);
app.use(middlewares.register);
app.use(middlewares.isAuthenticated);


// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => {
//   /* eslint-disable no-console */
//   console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
//   /* eslint-enable no-console */
// });

module.exports = app;
