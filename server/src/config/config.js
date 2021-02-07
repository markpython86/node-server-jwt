module.exports = {
  /*
  port: process.env.PORT || 8081,
    db: {
        database: process.env.DB_NAME || 'tabtracker',
        user: process.env.DB_USER_NAME || 'root',
        password: process.env.DB_PASS || '',
        options: {
            dialect: process.env.DIALECT || 'mysql',
            port: process.env.DB_PORT || '3306',
            host: process.env.HOST || '127.0.0.1'
            // storage: path.resolve(__dirname, '../../tabtracker.sql')
        }
    },
    */
  db: {
    mongoURI: process.env.MONGODB_URI || 'mongodb://localhost:27017/node-jwt-auth'
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'secret'
  }
};
