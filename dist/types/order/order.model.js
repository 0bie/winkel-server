"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.orderSchema = exports.delivery = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _product = require("../product/product.model");

const delivery = {
  express: 'express',
  standard: 'standard'
};
exports.delivery = delivery;
const orderSchema = new _mongoose.default.Schema({
  id: {
    type: _mongoose.default.SchemaTypes.ObjectId
  },
  units: {
    type: Number,
    required: true
  },
  delivery: {
    type: String,
    trim: true,
    enum: Object.keys(delivery),
    default: delivery.standard
  },
  lead: {
    type: _mongoose.default.SchemaTypes.ObjectId,
    required: true,
    ref: 'user'
  },
  products: [_product.productSchema]
});
exports.orderSchema = orderSchema;