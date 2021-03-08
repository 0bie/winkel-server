"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _user = require("../user/user.model");

var _default = {
  Message: {
    from: async message => {
      const foundSender = await _user.User.findById(message.from);
      if (foundSender) return foundSender;
      throw new Error(`User with id: ${message.from} doesn't exist`);
    }
  }
};
exports.default = _default;