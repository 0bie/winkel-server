"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _user = require("../user/user.model");

var _default = {
  Order: {
    lead: async order => {
      const foundLead = await _user.User.findById(order.lead);
      if (foundLead) return foundLead;
      throw new Error(`User with id: ${order.lead} doesn't exist`);
    }
  }
};
exports.default = _default;