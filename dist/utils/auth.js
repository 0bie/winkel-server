"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authenticate = exports.newApiKey = void 0;

var _user = require("../types/user/user.model");

var _cuid = _interopRequireDefault(require("cuid"));

const newApiKey = () => {
  return (0, _cuid.default)();
}; // eslint-disable no-console


exports.newApiKey = newApiKey;

const authenticate = async req => {
  const apiKey = req.headers.authorization;
  if (!apiKey) return;
  const user = await _user.User.findOne({
    apiKey
  }).select('-password').lean().exec();
  return user;
};

exports.authenticate = authenticate;