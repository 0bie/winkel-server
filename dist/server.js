"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.start = void 0;

var _lodash = require("lodash");

var _apolloServer = require("apollo-server");

var _db = require("./db");

var _config = _interopRequireDefault(require("./config"));

var _auth = require("./utils/auth");

var _schema = require("./utils/schema");

var _date = _interopRequireDefault(require("./types/date/date.resolvers"));

var _user = _interopRequireDefault(require("./types/user/user.resolvers"));

var _contact = _interopRequireDefault(require("./types/contact/contact.resolvers"));

var _product = _interopRequireDefault(require("./types/product/product.resolvers"));

var _company = _interopRequireDefault(require("./types/company/company.resolvers"));

var _message = _interopRequireDefault(require("./types/message/message.resolvers"));

var _order = _interopRequireDefault(require("./types/order/order.resolvers"));

const types = ['date', 'product', 'company', 'contact', 'user', 'message', 'image', 'social', 'pagination', 'order'];

const start = async () => {
  const rootSchema = `
    schema {
      query: Query
      mutation: Mutation
    }
  `;
  const schemaTypes = await Promise.all(types.map(_schema.loadTypeSchema));
  const server = new _apolloServer.ApolloServer({
    typeDefs: [rootSchema, ...schemaTypes],
    resolvers: (0, _lodash.merge)({}, _date.default, _product.default, _company.default, _contact.default, _user.default, _message.default, _order.default),

    async context({
      req
    }) {
      const user = await (0, _auth.authenticate)(req);
      return {
        user
      };
    }

  });
  await (0, _db.connect)(_config.default.dbUrl);
  const {
    url
  } = await server.listen({
    port: _config.default.port
  });
  console.log('GQL server ready at %s', url); // eslint-disable-line no-console
};

exports.start = start;