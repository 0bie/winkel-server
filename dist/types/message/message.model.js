"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.messageSchema = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

const messageSchema = new _mongoose.default.Schema({
  subject: {
    type: String,
    required: true,
    trim: true,
    validate: [function (value) {
      return value.length <= 80;
    }, 'Message title should be 80 words or less']
  },
  text: {
    type: String,
    required: true,
    trim: true,
    validate: [function (value) {
      return value.length <= 500;
    }, 'Message should be 500 words or less']
  },
  from: {
    type: _mongoose.default.SchemaTypes.ObjectId,
    required: true,
    ref: 'user'
  }
});
exports.messageSchema = messageSchema;