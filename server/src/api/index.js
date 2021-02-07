const express = require('express');

const user = require('./routes/user-route');

const router = express.Router();
// Matches with "/api/v1
router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});
// Matches with "/api/v1/user"
router.use('/user', user);

module.exports = router;
