"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.imageSchema = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _validator = _interopRequireDefault(require("validator"));

const imageSchema = new _mongoose.default.Schema({
  src: {
    type: String,
    required: true,
    validate: [value => _validator.default.isURL(value, {
      require_tld: false
    }), 'Not a valid URL']
  },
  alt: {
    type: String,
    trim: true,
    required: true,
    default: 'Sample alternate text'
  },
  caption: {
    type: String,
    trim: true
  }
});
exports.imageSchema = imageSchema;