"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _graphql = require("graphql");

var _language = require("graphql/language");

var _default = {
  Date: new _graphql.GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',

    parseValue(value) {
      return new Date(value);
    },

    serialize(value) {
      return value;
    },

    parseLiteral(ast) {
      if (ast.kind === _language.Kind.INT) {
        return new Date(ast.value);
      }

      return null;
    }

  })
};
exports.default = _default;