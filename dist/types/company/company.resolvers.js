"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _apolloServer = require("apollo-server");

var _company = require("./company.model");

var _user = require("../user/user.model");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

const company = (obj, args, context) => {
  if (!context.user) {
    throw new _apolloServer.AuthenticationError();
  }

  return _company.Company.findById(args.id).lean().exec();
};

const newCompany = (obj, args, context) => {
  if (!context.user || context.user.role !== _user.roles.admin) {
    throw new _apolloServer.AuthenticationError();
  }

  return _company.Company.create(_objectSpread({}, args.input));
};

const companies = (obj, args, context) => {
  if (!context.user) {
    throw new _apolloServer.AuthenticationError();
  }

  return _company.Company.find({}).lean().exec();
};

const updateCompany = (obj, args, context) => {
  if (!context.user || context.user.role !== _user.roles.admin) {
    throw new _apolloServer.AuthenticationError();
  }

  const update = args.input;
  return _company.Company.findByIdAndUpdate(args.id, update, {
    new: true
  }).lean().exec();
};

const sendOrder = (obj, args, context) => {
  if (!context.user || context.user.role !== _user.roles.admin) {
    throw new _apolloServer.AuthenticationError();
  }

  _user.User.findByIdAndUpdate(context.user._id, {
    $inc: {
      orders: 1,
      offers: 1
    }
  }).lean().exec();

  const update = args.input;
  const order = {
    units: update.units,
    products: update.products,
    lead: context.user._id
  };
  return _company.Company.findByIdAndUpdate(args.id, {
    $push: {
      orders: order
    }
  }, {
    new: true
  }).lean().exec();
};

const removeCompany = (obj, args, context) => {
  if (!context.user || context.user.role !== _user.roles.admin) {
    throw new _apolloServer.AuthenticationError();
  }

  return _company.Company.findByIdAndRemove(args.id).lean().exec();
};

var _default = {
  Query: {
    company,
    companies
  },
  Mutation: {
    newCompany,
    sendOrder,
    updateCompany,
    removeCompany
  },
  Company: {
    id: async company => {
      const foundCompany = await _company.Company.findOne({
        name: company.name
      });
      if (foundCompany) return foundCompany._id;
      throw new Error(`${company.name} doesn't exist`);
    }
  }
};
exports.default = _default;