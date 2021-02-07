/* eslint-disable func-names */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    index: {
      unique: true,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    index: {
      unique: true,
    },
  },
  password: {
    type: String,
    required: true,
  }
}, {
  timestamps: true,
});

// Execute before each user.save() call
UserSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const hashed = await bcrypt.hash(this.password, 10);
    return this.password = hashed;
  } catch (err) {
    return next(err);
  }
});
UserSchema.pre('updateOne', async function (next) {
  try {
    if (this._update.password) {
      const hashed = await bcrypt.hash(this._update.password, 10);
      this._update.password = hashed;
    }
    return next();
  } catch (err) {
    return next(err);
  }
});

UserSchema.methods.verifyPassword = async function (plainTextPassword) {
  return bcrypt.compare(plainTextPassword, this.password);
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
