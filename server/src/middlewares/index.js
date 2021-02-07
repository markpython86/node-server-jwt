const Joi = require('joi');
const passport = require('passport');
/* eslint-disable no-unused-vars */
module.exports = {
  isAuthenticated: (req, res, next) => {
    passport.authenticate('jwt', (err, user) => {
      if (err || !user) {
        res.status(403).send({
          error: 'You do not have the proper permissions'
        });
      } else {
        req.user = user;
        next();
      }
    })(req, res, next);
  },
  notFound: (req, res, next) => {
    res.status(404);
    const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
    next(error);
  },
  errorHandler: (err, req, res, next) => {
    /* eslint-enable no-unused-vars */
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode);
    res.json({
      message: err.message,
      stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
    });
  },
  register: (req, res, next) => {
    const schema = Joi.object({
      username: Joi.string().required(),
      email: Joi.string().email(),
      password: Joi.string().regex(
        // must contain at least 1 lowercase
        // must contain at least 1 uppercase
        // must contain at least 1 numeric
        // [!@#$%^&{}[]*?] must contain at least one special character
        // new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,32})")
        new RegExp('^[a-zA-Z0-9]{8,12}$')
      )
    });
    const { error } = schema.validate(req.body);
    // console.log(error)
    if (error) {
      switch (error.details[0].context.key) {
        case 'email':
          res.status(400).send({
            error: 'Invalid Email Address'
          });
          break;
        case 'password':
          res.status(400).send({
            error: 'Password Did not match combination'
          });
          break;
        default:
          res.status(400).send({
            error: 'invalid registration information'
          });
          break;
      }
    } else {
      next();
    }
  },
};

/*
insertData(req, res, next) {
  const schema = Joi.object({
    email: Joi.string().email(),
    // need to update to match pass
    purchased: Joi.boolean(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    switch (error.details[0].context.key) {
      case 'email':
        res.status(400).send({
          error: 'Not an email format'
        });
        break;
      case 'purchased':
        res.status(400).send({
          error: 'Not a valid purchase'
        });
        break;
      default:
        res.status(400).send({
          error: 'invalid creation information'
        });
        break;
    }
  } else {
    next();
  }
}
*/
