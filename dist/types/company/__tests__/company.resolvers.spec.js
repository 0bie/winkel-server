"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _mongoose = _interopRequireDefault(require("mongoose"));

var _apolloServer = require("apollo-server");

var _company = require("../company.model/");

var _company2 = _interopRequireDefault(require("../company.resolvers"));

describe('Resolvers', () => {
  describe('resolvers:', () => {
    test('Company can query by ID', async () => {
      const company = await _company.Company.create({
        name: 'test company',
        location: 'test location',
        quantity: 'wholesale',
        image: {
          src: 'http://localhost',
          alt: 'alternate text'
        }
      });
      const result = await _company2.default.Query.company(null, {
        id: company._id
      }, {
        user: {}
      });
      expect(`${result._id}`).toBe(`${company._id}`);
    });
    test('Company can query all companies', async () => {
      // const user = mongoose.Types.ObjectId();
      const companies = await _company.Company.create([{
        name: 'test company',
        location: 'test location',
        quantity: 'wholesale',
        image: {
          src: 'http://localhost',
          alt: 'alternate text'
        }
      }, {
        name: 'test company1',
        location: 'test location1',
        quantity: 'retail',
        image: {
          src: 'http://localhost',
          alt: 'alternate text'
        }
      }]);
      const result = await _company2.default.Query.companies(null, {}, {
        user: {}
      });
      expect(result).toHaveLength(2);
      companies.forEach(company => {
        const match = result.find(r => `${r._id}` === `${company._id}`);
        expect(match).toBeTruthy();
      });
    });
    test('newCompany creates a new company', async () => {
      const args = {
        input: {
          _id: _mongoose.default.Types.ObjectId(),
          name: 'test company',
          location: 'Hamilton, ON',
          quantity: 'retail'
        }
      };
      const result = await _company2.default.Mutation.newCompany(null, args, {
        user: {
          role: 'admin',
          _id: _mongoose.default.Types.ObjectId()
        }
      });
      Object.keys(args.input).forEach(field => {
        expect(result[field]).toBe(args.input[field]);
      });
    });
    test('updateCompany updates a company', async () => {
      const company = await _company.Company.create({
        name: 'test company',
        location: 'Victoria, BC',
        quantity: 'wholesale'
      });
      const args = {
        id: company._id,
        input: {
          quantity: 'retail'
        }
      };
      const result = await _company2.default.Mutation.updateCompany(null, args, {
        user: {
          role: 'admin'
        }
      });
      expect(`${result._id}`).toBe(`${company._id}`);
      expect(`${result.quantity}`).toBe('retail');
    });
    test('removeCompany removes an existing company', async () => {
      const company = await _company.Company.create({
        name: 'test company',
        location: 'Victoria, BC',
        quantity: 'retail'
      });
      const args = {
        id: company._id
      };
      const result = await _company2.default.Mutation.removeCompany(null, args, {
        user: {
          role: 'admin'
        }
      });
      expect(`${result._id}`).toBe(`${company._id}`);
    });
  });
  describe('auth:', () => {
    test('Company requires auth', () => {
      expect(() => _company2.default.Query.company(null, {
        id: _mongoose.default.Types.ObjectId()
      }, {})).toThrow(_apolloServer.AuthenticationError);
    });
  });
});