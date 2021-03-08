import {AuthenticationError} from 'apollo-server';
import {User} from './user.model';
import {newApiKey} from '../../utils/auth';

const me = (obj, args, context) => {

  if (!context.user) {
    throw new AuthenticationError();
  }
  return context.user;

};

const updateMe = (obj, args, context) => {

  if (!context.user) {
    throw new AuthenticationError();
  }

  return User.findByIdAndUpdate(context.user._id, args.input, {new: true})
    .select('-password')
    .lean()
    .exec();

};

const signup = (obj, args) => {
  return User.create({...args.input, apiKey: newApiKey()});
};

export default {
  Query: {
    me
  },
  Mutation: {
    updateMe,
    signup
  }
};
