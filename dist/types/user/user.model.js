"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = exports.userSchema = exports.roles = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _validator = _interopRequireDefault(require("validator"));

var _image = require("../image/image.model");

var _social = require("../social/social.model");

const roles = {
  member: 'member',
  admin: 'admin'
};
exports.roles = roles;
const userSchema = new _mongoose.default.Schema({
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: Object.keys(roles),
    required: true,
    default: roles.member
  },
  apiKey: {
    type: String,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: [value => _validator.default.isEmail(value), 'Not a valid email address']
  },
  orders: {
    type: Number,
    default: 0
  },
  offers: {
    type: Number,
    default: 0
  },
  messages: {
    type: Number,
    default: 0
  },
  image: _image.imageSchema,
  social: [_social.socialSchema]
}, {
  timestamps: true
});
exports.userSchema = userSchema;
userSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  _bcrypt.default.hash(this.password, 8, (err, hash) => {
    if (err) {
      return next(err);
    }

    this.password = hash;
    next();
  });
});

userSchema.methods.checkPassword = function (password) {
  const passwordHash = this.password;
  return new Promise((resolve, reject) => {
    _bcrypt.default.compare(password, passwordHash, (err, same) => {
      if (err) return reject(err);
      resolve(same);
    });
  });
};

const User = _mongoose.default.model('user', userSchema);

exports.User = User;