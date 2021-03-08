"use strict";

var _graphql = require("graphql");

var _graphqlTools = require("graphql-tools");

var _schema = require("../../../utils/schema");

var _graphqlCodegenCore = require("graphql-codegen-core");

describe('Image schema', () => {
  let schema;
  let typeDefs;
  beforeAll(async () => {
    const root = `
      schema {
        query: Query
        mutation: Mutation
      }
    `;
    const typeSchemas = await Promise.all(['image', 'user', 'social'].map(_schema.loadTypeSchema));
    typeDefs = root + typeSchemas.join(' ');
    schema = (0, _graphqlCodegenCore.schemaToTemplateContext)((0, _graphql.buildSchema)(typeDefs));
  });
  describe('schema:', () => {
    test('Image has base fields', () => {
      let type = schema.types.find(type => {
        return type.name === 'Image';
      });

      if (!type) {
        type = schema.interfaces.find(type => {
          return type.name === 'Image';
        });
      }

      expect(type).toBeTruthy();
      const baseFields = {
        src: 'String!',
        alt: 'String!',
        caption: 'String'
      };
      type.fields.forEach(field => {
        const type = baseFields[field.name];
        expect(field.raw).toBe(type);
      });
    });
    test('NewImageInput has correct fields', () => {
      const input = schema.inputTypes.find(input => {
        return input.name === 'NewImageInput';
      });
      expect(input).toBeTruthy();
      const fields = {
        src: 'String!',
        alt: 'String!',
        caption: 'String'
      };
      input.fields.forEach(field => {
        const type = fields[field.name];
        expect(field.raw).toBe(type);
      });
    });
    it('Image query', async () => {
      const server = (0, _graphqlTools.mockServer)(typeDefs);
      const query = `
        {
          image {
            src
            alt
            caption
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