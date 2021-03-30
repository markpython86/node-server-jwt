const jwt = require('jsonwebtoken');
const { User } = require('../models');
const config = require('../config/config');

function jwtSignUser(user) {
  const ONE_WEEK = 60 * 60 * 24 * 7;
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  });
}
// Defining methods for the UserssController
module.exports = {
  findById: (req, res) => {
    const { user } = req;
    if (!user) {
      return res.status(400).send({
        error: 'Server is going coooco'
      });
    }
    return res.json(user);
  },
  async signup(req, res) {
    try {
      const user = await User.create(req.body);
      const userJson = user.toJSON();
      // TODO: replace with a success message instead of token
      return res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      });
    } catch (err) {
      // console.log('err', err)
      if (Object.keys(err.keyValue)[0] === 'email') {
        return res.status(400).send({
          error: 'This email already exists'
        });
      }
      if (Object.keys(err.keyValue)[0] === 'username') {
        return res.status(400).send({
          error: 'This username already exists'
        });
      }
      return res.status(400).send({
        error: 'Something is wrong sorry for the trouble'
      });
    }
  },
  async login(req, res) {
    try {
      const { username, email, password } = req.body;
      const user = await User.findOne({ email, username });
      // console.log('user',await user.comparePassword('1234567890'))

      if (!user) {
        return res.status(403).send({
          error: 'The login information was incorrect1'
        });
      }
      // @return true, false
      const isPasswordValid = await user.verifyPassword(password);
      if (!isPasswordValid) {
        return res.status(403).send({
          error: 'The login information was incorrect2'
        });
      }

      const userJson = user.toJSON();
      return res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      });
    } catch (err) {
      return res.status(500).send({
        error: 'An error has occured trying to log in'
      });
    }
  },
  async update(req, res) {
    try {
      const user = await User.updateOne(
        { _id: req.params.id },
        { password: req.body.password }
      );
      res.json(user);
    } catch (error) {
      res.status(422).json(error);
    }
  },
};
