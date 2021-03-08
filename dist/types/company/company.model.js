"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Company = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _image = require("../image/image.model");

var _product = require("../product/product.model");

// import {orderSchema} from '../order/order.model';
const companySchema = new _mongoose.default.Schema({
  id: {
    type: _mongoose.default.SchemaTypes.ObjectId
  },
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  quantity: {
    type: String,
    required: true,
    trim: true
  },
  image: _image.imageSchema,
  // orders: [orderSchema],
  products: [_product.productSchema]
});

const Company = _mongoose.default.model('company', companySchema);

exports.Company = Company;