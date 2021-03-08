"use strict";

var _graphql = require("graphql");

var _graphqlTools = require("graphql-tools");

var _schema = require("../../../utils/schema");

var _graphqlCodegenCore = require("graphql-codegen-core");

describe('Message schema', () => {
  let schema;
  let typeDefs;
  beforeAll(async () => {
    const root = `
      schema {
        query: Query
        mutation: Mutation
      }
    `;
    const typeSchemas = await Promise.all(['message', 'user', 'social', 'image'].map(_schema.loadTypeSchema));
    typeDefs = root + typeSchemas.join(' ');
    schema = (0, _graphqlCodegenCore.schemaToTemplateContext)((0, _graphql.buildSchema)(typeDefs));
  });
  describe('schema:', () => {
    test('Message has base fields', () => {
      let type = schema.types.find(type => {
        return type.name === 'Message';
      });

      if (!type) {
        type = schema.interfaces.find(type => {
          return type.name === 'Message';
        });
      }

      expect(type).toBeTruthy();
      const baseFields = {
        id: 'ID',
        subject: 'String!',
        text: 'String!',
        from: 'User!'
      };
      type.fields.forEach(field => {
        const type = baseFields[field.name];
        expect(field.raw).toBe(type);
      });
    });
    it('Message query', async () => {
      const server = (0, _graphqlTools.mockServer)(typeDefs);
      const query = `
        {
          message {
            id
            subject
            text
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