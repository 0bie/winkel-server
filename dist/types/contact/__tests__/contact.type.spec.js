"use strict";

var _graphql = require("graphql");

var _graphqlTools = require("graphql-tools");

var _schema = require("../../../utils/schema");

var _graphqlCodegenCore = require("graphql-codegen-core");

describe('Contact schema', () => {
  let schema;
  let typeDefs;
  beforeAll(async () => {
    const root = `
      schema {
        query: Query
        mutation: Mutation
      }
    `;
    const typeSchemas = await Promise.all(['contact', 'image', 'user', 'message', 'date', 'social'].map(_schema.loadTypeSchema));
    typeDefs = root + typeSchemas.join(' ');
    schema = (0, _graphqlCodegenCore.schemaToTemplateContext)((0, _graphql.buildSchema)(typeDefs));
  });
  describe('schema:', () => {
    test('Contact has base fields', () => {
      let type = schema.types.find(type => {
        return type.name === 'Contact';
      });

      if (!type) {
        type = schema.interfaces.find(type => {
          return type.name === 'Contact';
        });
      }

      expect(type).toBeTruthy();
      const baseFields = {
        id: 'ID',
        firstName: 'String!',
        lastName: 'String!',
        email: 'String!',
        bio: 'String',
        role: 'String',
        image: 'Image',
        createdAt: 'Date',
        social: '[Social!]',
        messages: '[Message!]'
      };
      type.fields.forEach(field => {
        const type = baseFields[field.name];
        expect(field.raw).toBe(type);
      });
    });
    test('NewContactInput has correct fields', () => {
      const input = schema.inputTypes.find(input => {
        return input.name === 'NewContactInput';
      });
      expect(input).toBeTruthy();
      const fields = {
        firstName: 'String!',
        lastName: 'String!',
        email: 'String!',
        bio: 'String',
        role: 'String',
        social: 'NewSocialInput',
        image: 'NewImageInput'
      };
      input.fields.forEach(field => {
        const type = fields[field.name];
        expect(field.raw).toBe(type);
      });
    });
    test('UpdateContactInput has correct fields', () => {
      const input = schema.inputTypes.find(input => {
        return input.name === 'UpdateContactInput';
      });
      expect(input).toBeTruthy();
      const fields = {
        firstName: 'String',
        lastName: 'String',
        email: 'String',
        bio: 'String',
        role: 'String',
        image: 'NewImageInput',
        social: 'UpdateSocialInput'
      };
      input.fields.forEach(field => {
        const type = fields[field.name];
        expect(field.raw).toBe(type);
      });
    });
    it('Contact query', async () => {
      const server = (0, _graphqlTools.mockServer)(typeDefs);
      const query = `
        {
          contact(id: "46re3o") {
            firstName
            lastName
            email
            bio
            image {
              src
              alt
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
    it('Contacts query', async () => {
      const server = (0, _graphqlTools.mockServer)(typeDefs);
      const query = `
        {
          contacts {
            firstName
            lastName
            email
            bio
            image {
              src
              alt
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
    it('newContact mutation', async () => {
      const server = (0, _graphqlTools.mockServer)(typeDefs);
      const query = `
        mutation addNewContact($input: NewContactInput!) {
          newContact(input: $input) {
            firstName
            lastName
            email
          }
        }
      `;
      const vars = {
        input: {
          firstName: 'test firstName',
          lastName: 'test lastName',
          email: 'test@mail.com'
        }
      };
      await expect(server.query(query, vars)).resolves.toBeTruthy();
      const {
        errors
      } = await server.query(query, vars);
      expect(errors).not.toBeTruthy();
    });
    it('updateContact mutation', async () => {
      const server = (0, _graphqlTools.mockServer)(typeDefs);
      const query = `
        mutation updateContact($id: ID!, $input: UpdateContactInput!) {
          updateContact(id: $id, input: $input) {
            firstName
            lastName
            email
            image {
              src
              alt
            }
          }
        }
      `;
      const vars = {
        id: '4yr6v8',
        input: {
          firstName: 'johan',
          lastName: 'cruyff'
        }
      };
      await expect(server.query(query, vars)).resolves.toBeTruthy();
      const {
        errors
      } = await server.query(query, vars);
      expect(errors).not.toBeTruthy();
    });
    it('removeContact mutation', async () => {
      const server = (0, _graphqlTools.mockServer)(typeDefs);
      const query = `
        mutation removeContact($id: ID!) {
          removeContact(id: $id) {
            firstName
            lastName
          }
        }
      `;
      const vars = {
        id: '4yr6v8'
      };
      await expect(server.query(query, vars)).resolves.toBeTruthy();
      const {
        errors
      } = await server.query(query, vars);
      expect(errors).not.toBeTruthy();
    });
  });
});