"use strict";

var _graphql = require("graphql");

var _graphqlTools = require("graphql-tools");

var _schema = require("../../../utils/schema");

var _graphqlCodegenCore = require("graphql-codegen-core");

describe('User schema', () => {
  let schema;
  let typeDefs;
  beforeAll(async () => {
    const root = `
      schema {
        query: Query
        mutation: Mutation
      }
    `;
    const typeSchemas = await Promise.all(['user', 'social', 'image'].map(_schema.loadTypeSchema));
    typeDefs = root + typeSchemas.join(' ');
    schema = (0, _graphqlCodegenCore.schemaToTemplateContext)((0, _graphql.buildSchema)(typeDefs));
  });
  describe('schema:', () => {
    test('User has base fields', () => {
      let type = schema.types.find(type => {
        return type.name === 'User';
      });

      if (!type) {
        type = schema.interfaces.find(type => {
          return type.name === 'User';
        });
      }

      expect(type).toBeTruthy();
      const baseFields = {
        _id: 'ID!',
        email: 'String!',
        apiKey: 'String!',
        role: 'String!',
        firstName: 'String!',
        lastName: 'String!',
        image: 'Image',
        orders: 'Int',
        offers: 'Int',
        messages: 'Int',
        social: '[Social!]'
      };
      type.fields.forEach(field => {
        const type = baseFields[field.name];
        expect(field.raw).toBe(type);
      });
    });
    it('signup mutation', async () => {
      const server = (0, _graphqlTools.mockServer)(typeDefs);
      const query = `
        mutation signup($input: NewUserInput!) {
          signup(input: $input) {
            email
            firstName
            lastName
          }
        }
      `;
      const vars = {
        input: {
          email: 'test@mail.com',
          password: 'testPassword',
          firstName: 'alice',
          lastName: 'bob'
        }
      };
      await expect(server.query(query, vars)).resolves.toBeTruthy();
      const {
        errors
      } = await server.query(query, vars);
      expect(errors).not.toBeTruthy();
    });
    it('updateUser mutation', async () => {
      const server = (0, _graphqlTools.mockServer)(typeDefs);
      const query = `
        mutation updateMe($input: UpdateUserInput!) {
          updateMe(input: $input) {
            _id
            email
          }
        }
      `;
      const vars = {
        input: {
          email: 'newMail@mail.com',
          image: {
            src: 'http://localhost',
            alt: 'alternate text'
          }
        }
      };
      await expect(server.query(query, vars)).resolves.toBeTruthy();
      const {
        errors
      } = await server.query(query, vars);
      expect(errors).not.toBeTruthy();
    });
  });
});