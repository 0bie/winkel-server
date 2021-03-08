"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Product = exports.productSchema = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _image = require("../image/image.model");

const quantity = {
  wholesale: 'wholesale',
  retail: 'retail'
};
const productSchema = new _mongoose.default.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  units: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  supplier: {
    type: String,
    required: true
  },
  quantity: {
    type: String,
    required: true,
    enum: Object.keys(quantity)
  },
  description: String,
  image: _image.imageSchema
}, {
  timestamps: true
});
exports.productSchema = productSchema;

const Product = _mongoose.default.model('product', productSchema);

exports.Product = Product;