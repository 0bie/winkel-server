import {merge} from 'lodash';
import {ApolloServer} from 'apollo-server';

import {connect} from './db';
import config from './config';
import {authenticate} from './utils/auth';
import {loadTypeSchema} from './utils/schema';

import date from './types/date/date.resolvers';
import user from './types/user/user.resolvers';
import contact from './types/contact/contact.resolvers';
import product from './types/product/product.resolvers';
import company from './types/company/company.resolvers';
import message from './types/message/message.resolvers';
import order from './types/order/order.resolvers';

const types = [
  'date',
  'product',
  'company',
  'contact',
  'user',
  'message',
  'image',
  'social',
  'pagination',
  'order'
];

export const start = async () => {

  const rootSchema = `
    schema {
      query: Query
      mutation: Mutation
    }
  `;

  const schemaTypes = await Promise.all(types.map(loadTypeSchema));

  const server = new ApolloServer({
    typeDefs: [rootSchema, ...schemaTypes],
    resolvers: merge({}, date, product, company, contact, user, message, order),
    async context({req}) {
      const user = await authenticate(req);
      return {user};
    }
  });

  await connect(config.dbUrl);
  const {url} = await server.listen({port: config.port});
  console.log('GQL server ready at %s', url); // eslint-disable-line no-console

};
