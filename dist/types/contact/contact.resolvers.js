"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _apolloServer = require("apollo-server");

var _contact = require("./contact.model");

var _user = require("../user/user.model");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

const contact = (obj, args, context) => {
  if (!context.user) {
    throw new _apolloServer.AuthenticationError();
  }

  return _contact.Contact.findById(args.id).lean().exec();
};

const newContact = (obj, args, context) => {
  if (!context.user || context.user.role !== _user.roles.admin) {
    throw new _apolloServer.AuthenticationError();
  }

  return _contact.Contact.create(_objectSpread({}, args.input));
};

const contacts = (obj, args, context) => {
  if (!context.user) {
    throw new _apolloServer.AuthenticationError();
  }

  return _contact.Contact.find({}).lean().exec();
};

const updateContact = (obj, args, context) => {
  if (!context.user || context.user.role !== _user.roles.admin) {
    throw new _apolloServer.AuthenticationError();
  }

  const update = args.input;
  return _contact.Contact.findByIdAndUpdate(args.id, update, {
    new: true
  }).lean().exec();
};

const messageContact = (obj, args, context) => {
  if (!context.user || context.user.role !== _user.roles.admin) {
    throw new _apolloServer.AuthenticationError();
  }

  _user.User.findByIdAndUpdate(context.user._id, {
    $inc: {
      messages: 1
    }
  }).lean().exec();

  const update = args.input;
  const message = {
    text: update.text,
    from: context.user._id
  };
  return _contact.Contact.findByIdAndUpdate(args.id, {
    $push: {
      messages: message
    }
  }, {
    new: true
  }).lean().exec();
};

const removeContact = (obj, args, context) => {
  if (!context.user || context.user.role !== _user.roles.admin) {
    throw new _apolloServer.AuthenticationError();
  }

  return _contact.Contact.findByIdAndRemove(args.id).lean().exec();
};

var _default = {
  Query: {
    contacts,
    contact
  },
  Mutation: {
    newContact,
    updateContact,
    messageContact,
    removeContact
  },
  Contact: {
    id: async contact => {
      const foundContact = await _contact.Contact.findOne({
        email: contact.email
      });
      if (foundContact) return foundContact._id;
      throw new Error(`${contact.email} doesn't exist`);
    },
    createdAt: async contact => {
      const foundContact = await _contact.Contact.findOne({
        email: contact.email
      });
      if (foundContact) return foundContact.createdAt;
      throw new Error(`${contact.email} doesn't exist`);
    }
  }
};
exports.default = _default;