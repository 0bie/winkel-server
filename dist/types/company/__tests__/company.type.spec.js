"use strict";

var _graphql = require("graphql");

var _graphqlTools = require("graphql-tools");

var _schema = require("../../../utils/schema");

var _graphqlCodegenCore = require("graphql-codegen-core");

describe('Company schema', () => {
  let schema;
  let typeDefs;
  beforeAll(async () => {
    const root = `
      schema {
        query: Query
        mutation: Mutation
      }
    `;
    const typeSchemas = await Promise.all(['company', 'product', 'order', 'image', 'user', 'date', 'pagination', 'social'].map(_schema.loadTypeSchema));
    typeDefs = root + typeSchemas.join(' ');
    schema = (0, _graphqlCodegenCore.schemaToTemplateContext)((0, _graphql.buildSchema)(typeDefs));
  });
  describe('schema:', () => {
    test('Company has base fields', () => {
      let type = schema.types.find(type => {
        return type.name === 'Company';
      });

      if (!type) {
        type = schema.interfaces.find(type => {
          return type.name === 'Company';
        });
      }

      expect(type).toBeTruthy();
      const baseFields = {
        id: 'ID',
        name: 'String!',
        location: 'String!',
        quantity: 'String!',
        image: 'Image',
        products: '[Product!]',
        orders: '[Order!]'
      };
      type.fields.forEach(field => {
        const type = baseFields[field.name];
        expect(field.raw).toBe(type);
      });
    });
    test('NewCompanyInput has correct fields', () => {
      const input = schema.inputTypes.find(input => {
        return input.name === 'NewCompanyInput';
      });
      expect(input).toBeTruthy();
      const fields = {
        name: 'String!',
        location: 'String!',
        quantity: 'String!',
        image: 'NewImageInput'
      };
      input.fields.forEach(field => {
        const type = fields[field.name];
        expect(field.raw).toBe(type);
      });
    });
    test('UpdateCompanyInput has correct fields', () => {
      const input = schema.inputTypes.find(input => {
        return input.name === 'UpdateCompanyInput';
      });
      expect(input).toBeTruthy();
      const fields = {
        name: 'String',
        location: 'String',
        quantity: 'String',
        image: 'NewImageInput'
      };
      input.fields.forEach(field => {
        const type = fields[field.name];
        expect(field.raw).toBe(type);
      });
    });
    it('Company query', async () => {
      const server = (0, _graphqlTools.mockServer)(typeDefs);
      const query = `
        {
          company(id: "46re3o") {
            name
            location
            quantity
            image {
              src
              alt
            }
            orders {
              id
              units
            }
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
    it('Companies query', async () => {
      const server = (0, _graphqlTools.mockServer)(typeDefs);
      const query = `
        {
          companies {
            name
            location
            quantity
            image {
              src
              alt
            }
            orders {
              id
              units
            }
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
    it('newCompany mutation', async () => {
      const server = (0, _graphqlTools.mockServer)(typeDefs);
      const query = `
        mutation addNewCompany($input: NewCompanyInput!) {
          newCompany(input: $input) {
            name
            location
            quantity
          }
        }
      `;
      const vars = {
        input: {
          name: 'test company',
          quantity: 'wholesale',
          location: 'test location'
        }
      };
      await expect(server.query(query, vars)).resolves.toBeTruthy();
      const {
        errors
      } = await server.query(query, vars);
      expect(errors).not.toBeTruthy();
    });
    it('updateCompany mutation', async () => {
      const server = (0, _graphqlTools.mockServer)(typeDefs);
      const query = `
        mutation updateCompany($id: ID!, $input: UpdateCompanyInput!) {
          updateCompany(id: $id, input: $input) {
            name
            location
            quantity
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
          name: 'test new name'
        }
      };
      await expect(server.query(query, vars)).resolves.toBeTruthy();
      const {
        errors
      } = await server.query(query, vars);
      expect(errors).not.toBeTruthy();
    });
    it('removeCompany mutation', async () => {
      const server = (0, _graphqlTools.mockServer)(typeDefs);
      const query = `
        mutation removeCompany($id: ID!) {
          removeCompany(id: $id) {
            name
            location
            quantity
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