"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _apolloServer = require("apollo-server");

var _product = require("./product.model");

var _user = require("../user/user.model");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

const product = (obj, args, context) => {
  if (!context.user) {
    throw new _apolloServer.AuthenticationError();
  }

  return _product.Product.findById(args.id).lean().exec();
};

const newProduct = (obj, args, context) => {
  if (!context.user || context.user.role !== _user.roles.admin) {
    throw new _apolloServer.AuthenticationError();
  }

  return _product.Product.create(_objectSpread(_objectSpread({}, args.input), {}, {
    createdBy: context.user._id
  }));
};

const products = (obj, args, context) => {
  if (!context.user) {
    throw new _apolloServer.AuthenticationError();
  }

  return _product.Product.find({}).lean().exec();
};

const productList = (obj, args, context) => {
  const {
    offset,
    first
  } = args.pagination;

  if (!context.user) {
    throw new _apolloServer.AuthenticationError();
  }

  return _product.Product.find({}).skip(offset).limit(first).lean().exec();
};

const updateProduct = (obj, args, context) => {
  if (!context.user || context.user.role !== _user.roles.admin) {
    throw new _apolloServer.AuthenticationError();
  }

  const update = args.input;
  return _product.Product.findByIdAndUpdate(args.id, update, {
    new: true
  }).lean().exec();
};

const removeProduct = (obj, args, context) => {
  if (!context.user || context.user.role !== _user.roles.admin) {
    throw new _apolloServer.AuthenticationError();
  }

  return _product.Product.findByIdAndRemove(args.id).lean().exec();
};

var _default = {
  Query: {
    product,
    products,
    productList
  },
  Mutation: {
    newProduct,
    updateProduct,
    removeProduct
  },
  Product: {
    id: async product => {
      const foundProduct = await _product.Product.findOne({
        name: product.name
      });
      if (foundProduct) return foundProduct._id;
      throw new Error(`Product: ${product.name} doesn't exist`);
    }
  }
};
exports.default = _default;