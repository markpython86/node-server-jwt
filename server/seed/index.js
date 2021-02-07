const mongoose = require('mongoose');
const { db } = require('../src/config/config');
const {
  User
} = require('../src/models');
const users = require('./users.json');

mongoose.connect(db.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}, async () => {
  await mongoose.connection.db.dropDatabase(
    console.log(`"${mongoose.connection.db.databaseName}" database dropped.`)
  );
  await Promise.all(
    users.map((user) => User.create(user))
  );
  console.log(`${users.length} user records inserted!`);
  process.exit(0);
});
