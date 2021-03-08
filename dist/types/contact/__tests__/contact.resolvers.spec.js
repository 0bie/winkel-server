"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _mongoose = _interopRequireDefault(require("mongoose"));

var _contact = require("../contact.model/");

var _contact2 = _interopRequireDefault(require("../contact.resolvers"));

describe('Resolvers', () => {
  describe('resolvers:', () => {
    test('Contact can query by ID', async () => {
      const contact = await _contact.Contact.create({
        firstName: 'alice',
        lastName: 'bob',
        email: 'alice@mail.com',
        role: 'engineer',
        quantity: 'wholesale',
        createdAt: new Date(),
        image: {
          src: 'http://localhost',
          alt: 'alternate text'
        }
      });
      const result = await _contact2.default.Query.contact(null, {
        id: contact._id
      }, {
        user: {}
      });
      expect(`${result._id}`).toBe(`${contact._id}`);
    });
    test('Contact can query all contacts', async () => {
      // const user = mongoose.Types.ObjectId();
      const contacts = await _contact.Contact.create([{
        firstName: 'alice',
        lastName: 'bob',
        email: 'alice@mail.com',
        role: 'engineer',
        createdAt: new Date(),
        image: {
          src: 'http://localhost',
          alt: 'alternate text'
        }
      }, {
        firstName: 'charles',
        lastName: 'baker',
        email: 'charles@mail.com',
        role: 'cook',
        createdAt: new Date(),
        image: {
          src: 'http://localhost',
          alt: 'alternate text'
        }
      }]);
      const result = await _contact2.default.Query.contacts(null, {}, {
        user: {}
      });
      expect(result).toHaveLength(2);
      contacts.forEach(contact => {
        const match = result.find(r => `${r._id}` === `${contact._id}`);
        expect(match).toBeTruthy();
      });
    });
    test('newContact creates a new contact', async () => {
      const args = {
        input: {
          _id: _mongoose.default.Types.ObjectId(),
          firstName: 'alice',
          lastName: 'bob',
          email: 'alice@mail.com',
          role: 'chef',
          bio: 'This is a sample biography'
        }
      };
      const result = await _contact2.default.Mutation.newContact(null, args, {
        user: {
          role: 'admin',
          _id: _mongoose.default.Types.ObjectId()
        }
      });
      Object.keys(args.input).forEach(field => {
        expect(result[field]).toBe(args.input[field]);
      });
    });
    test('updateContact updates a contact', async () => {
      const contact = await _contact.Contact.create({
        firstName: 'alice',
        lastName: 'bob',
        email: 'alice@mail.com',
        role: 'chef',
        bio: 'This is a sample biography'
      });
      const args = {
        id: contact._id,
        input: {
          email: 'alice.bob@mail.com'
        }
      };
      const result = await _contact2.default.Mutation.updateContact(null, args, {
        user: {
          role: 'admin'
        }
      });
      expect(`${result._id}`).toBe(`${contact._id}`);
      expect(`${result.email}`).toBe('alice.bob@mail.com');
    });
    test('removeContact removes an existing contact', async () => {
      const contact = await _contact.Contact.create({
        firstName: 'alice',
        lastName: 'bob',
        email: 'alice@mail.com',
        role: 'chef',
        bio: 'This is a sample biography'
      });
      const args = {
        id: contact._id
      };
      const result = await _contact2.default.Mutation.removeContact(null, args, {
        user: {
          role: 'admin'
        }
      });
      expect(`${result._id}`).toBe(`${contact._id}`);
    });
  });
});