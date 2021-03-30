/* eslint-disable linebreak-style */
const router = require('express').Router();
const userController = require('../../controllers/usersController');
const middleware = require('../../middlewares/index');

// check if user
const { isAuthenticated } = require('../../middlewares');
// Matches with "/api/v1/user"
router.get('/', (req, res) => {
  res.json({
    message: 'USERS - 👾💎👾'
  });
});

// Matches with "/api/v1/user/signup"
router.post('/signup', middleware.signup, userController.signup);

// Matches with "/api/v1/user/login"
router.post('/login',
  userController.login);

// Matches with "/api/v1/user/:id"
router
  .put('/:id', isAuthenticated, userController.update);
// Matches with "/api/v1/user/dash
router
  .get('/dash', isAuthenticated, userController.findById);

module.exports = router;
