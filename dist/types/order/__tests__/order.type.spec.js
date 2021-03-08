"use strict";

var _graphql = require("graphql");

var _graphqlTools = require("graphql-tools");

var _schema = require("../../../utils/schema");

var _graphqlCodegenCore = require("graphql-codegen-core");

describe('Order schema', () => {
  let schema;
  let typeDefs;
  beforeAll(async () => {
    const root = `
      schema {
        query: Query
        mutation: Mutation
      }
    `;
    const typeSchemas = await Promise.all(['order', 'user', 'social', 'image', 'product', 'date', 'pagination'].map(_schema.loadTypeSchema));
    typeDefs = root + typeSchemas.join(' ');
    schema = (0, _graphqlCodegenCore.schemaToTemplateContext)((0, _graphql.buildSchema)(typeDefs));
  });
  describe('schema:', () => {
    test('Order has base fields', () => {
      let type = schema.types.find(type => {
        return type.name === 'Order';
      });

      if (!type) {
        type = schema.interfaces.find(type => {
          return type.name === 'Order';
        });
      }

      expect(type).toBeTruthy();
      const baseFields = {
        id: 'ID',
        lead: 'User!',
        units: 'Int!',
        delivery: 'String',
        products: '[Product!]!'
      };
      type.fields.forEach(field => {
        const type = baseFields[field.name];
        expect(field.raw).toBe(type);
      });
    });
    it('Order query', async () => {
      const server = (0, _graphqlTools.mockServer)(typeDefs);
      const query = `
        {
          order {
            id
            lead {
              firstName
              email
            }
            units
            delivery
            products {
              name
              price
            }
          }
        }
      `;
      await expect(server.query(query)).resolves.toBeTruthy();
      const {
        errors
      } = await server.query(query);
      expect(errors).not.toBeTruthy();
    });
  });
});