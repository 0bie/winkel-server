"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Contact = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _validator = _interopRequireDefault(require("validator"));

var _image = require("../image/image.model");

var _social = require("../social/social.model");

var _message = require("../message/message.model");

const contactSchema = new _mongoose.default.Schema({
  id: {
    type: _mongoose.default.SchemaTypes.ObjectId
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
  role: {
    type: String,
    trim: true
  },
  bio: {
    type: String,
    trim: true,
    validate: [function (value) {
      return value.length <= 280;
    }, 'Bio is too long (280 max.)']
  },
  image: _image.imageSchema,
  social: [_social.socialSchema],
  messages: [_message.messageSchema]
}, {
  timestamps: true
});

const Contact = _mongoose.default.model('contact', contactSchema);

exports.Contact = Contact;