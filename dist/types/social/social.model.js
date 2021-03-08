"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.socialSchema = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _validator = _interopRequireDefault(require("validator"));

const platforms = {
  twitter: 'twitter',
  linkedin: 'linkedin',
  facebook: 'facebook'
};
const socialSchema = new _mongoose.default.Schema({
  platform: {
    type: String,
    required: true,
    enum: Object.keys(platforms)
  },
  link: {
    type: String,
    required: true,
    validate: [value => _validator.default.isURL(value), 'Not a valid url']
  }
});
exports.socialSchema = socialSchema;