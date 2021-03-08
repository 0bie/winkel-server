"use strict";

var _graphql = require("graphql");

var _graphqlTools = require("graphql-tools");

var _schema = require("../../../utils/schema");

var _graphqlCodegenCore = require("graphql-codegen-core");

describe('Social schema', () => {
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
    test('Social has base fields', () => {
      let type = schema.types.find(type => {
        return type.name === 'Social';
      });

      if (!type) {
        type = schema.interfaces.find(type => {
          return type.name === 'Social';
        });
      }

      expect(type).toBeTruthy();
      const baseFields = {
        platform: 'String!',
        link: 'String!'
      };
      type.fields.forEach(field => {
        const type = baseFields[field.name];
        expect(field.raw).toBe(type);
      });
    });
    it('addSocial mutation', async () => {
      const server = (0, _graphqlTools.mockServer)(typeDefs);
      const query = `
        mutation addSocial($input: NewSocialInput!) {
          addSocial(input: $input) {
            platform
            link
          }
        }
      `;
      const vars = {
        input: {
          platform: 'facebook',
          link: 'http://facebook'
        }
      };
      await expect(server.query(query, vars)).resolves.toBeTruthy();
      const {
        errors
      } = await server.query(query, vars);
      expect(errors).not.toBeTruthy();
    });
    it('updateSocial mutation', async () => {
      const server = (0, _graphqlTools.mockServer)(typeDefs);
      const query = `
        mutation updateSocial($input: UpdateSocialInput!) {
          updateSocial(input: $input) {
            platform
            link
          }
        }
      `;
      const vars = {
        input: {
          platform: 'twitter',
          link: 'http://twitter'
        }
      };
      await expect(server.query(query, vars)).resolves.toBeTruthy();
      const {
        errors
      } = await server.query(query, vars);
      expect(errors).not.toBeTruthy();
    });
    it('Social query', async () => {
      const server = (0, _graphqlTools.mockServer)(typeDefs);
      const query = `
        {
          social {
            platform
            link
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