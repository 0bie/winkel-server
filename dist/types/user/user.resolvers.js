"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _apolloServer = require("apollo-server");

var _user = require("./user.model");

var _auth = require("../../utils/auth");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

const me = (obj, args, context) => {
  if (!context.user) {
    throw new _apolloServer.AuthenticationError();
  }

  return context.user;
};

const updateMe = (obj, args, context) => {
  if (!context.user) {
    throw new _apolloServer.AuthenticationError();
  }

  return _user.User.findByIdAndUpdate(context.user._id, args.input, {
    new: true
  }).select('-password').lean().exec();
};

const signup = (obj, args) => {
  return _user.User.create(_objectSpread(_objectSpread({}, args.input), {}, {
    apiKey: (0, _auth.newApiKey)()
  }));
};

var _default = {
  Query: {
    me
  },
  Mutation: {
    updateMe,
    signup
  }
};
exports.default = _default;