"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _user = require("../user.model/");

var _user2 = _interopRequireDefault(require("../user.resolvers"));

describe('Resolvers', () => {
  describe('resolvers:', () => {
    test('User can query information', async () => {
      const user = await _user.User.create({
        firstName: 'alice',
        lastName: 'bob',
        email: 'alice@mail.com',
        role: 'admin',
        password: 'newPassword',
        apiKey: 'kerkfdnjn43232wnww54#$',
        image: {
          src: 'http://localhost',
          alt: 'alternate text'
        }
      });
      const result = await _user2.default.Query.me(null, null, {
        user
      });
      expect(`${result._id}`).toBe(`${user._id}`);
    });
    test('updateUser updates current user', async () => {
      const user = await _user.User.create({
        _id: _mongoose.default.Types.ObjectId(),
        firstName: 'alice',
        lastName: 'bob',
        email: 'alice@mail.com',
        role: 'admin',
        password: 'newPassword',
        apiKey: 'kerkfdnjn43232wnww54#$',
        bio: 'This is a sample biography'
      });
      const args = {
        input: {
          email: 'alice.bob@mail.com'
        }
      };
      const result = await _user2.default.Mutation.updateMe(null, args, {
        user: {
          _id: user._id,
          role: 'admin'
        }
      });
      expect(`${result._id}`).toBe(`${user._id}`);
      expect(`${result.email}`).toBe('alice.bob@mail.com');
    });
    test('newUser creates a new user', async () => {
      const args = {
        input: {
          _id: _mongoose.default.Types.ObjectId(),
          firstName: 'alice',
          lastName: 'bob',
          email: 'alice@mail.com',
          role: 'admin',
          password: 'newPassword'
        }
      };
      const result = await _user2.default.Mutation.signup(null, args);
      Object.keys(args.input).forEach(field => {
        if (field === 'password') {
          _bcrypt.default.compare(args.input[field], result[field], (error, matched) => {
            if (!error && matched) {
              if (matched) return;
            }
          });
        } else {
          expect(result[field]).toBe(args.input[field]);
        }
      });
    });
  });
});