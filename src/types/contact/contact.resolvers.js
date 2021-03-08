import {AuthenticationError} from 'apollo-server';
import {Contact} from './contact.model';
import {User, roles} from '../user/user.model';

const contact = (obj, args, context) => {

  if (!context.user) {
    throw new AuthenticationError();
  }
  return Contact.findById(args.id)
    .lean()
    .exec();

};

const newContact = (obj, args, context) => {

  if (!context.user || context.user.role !== roles.admin) {
    throw new AuthenticationError();
  }
  return Contact.create({...args.input});

};

const contacts = (obj, args, context) => {

  if (!context.user) {
    throw new AuthenticationError();
  }
  return Contact.find({})
    .lean()
    .exec();

};

const updateContact = (obj, args, context) => {

  if (!context.user || context.user.role !== roles.admin) {
    throw new AuthenticationError();
  }
  const update = args.input;
  return Contact.findByIdAndUpdate(args.id, update, {new: true})
    .lean()
    .exec();

};

const messageContact = (obj, args, context) => {

  if (!context.user || context.user.role !== roles.admin) {
    throw new AuthenticationError();
  }

  User.findByIdAndUpdate(context.user._id, {$inc: {messages: 1}})
    .lean()
    .exec();

  const update = args.input;
  const message = {text: update.text, from: context.user._id};
  return Contact.findByIdAndUpdate(args.id, {$push: {messages: message}}, {new: true})
    .lean()
    .exec();

};

const removeContact = (obj, args, context) => {

  if (!context.user || context.user.role !== roles.admin) {
    throw new AuthenticationError();
  }
  return Contact.findByIdAndRemove(args.id)
    .lean()
    .exec();

};

export default {
  Query: {
    contacts,
    contact
  },
  Mutation: {
    newContact,
    updateContact,
    messageContact,
    removeContact
  },
  Contact: {
    id: async (contact) => {
      const foundContact = await Contact.findOne({email: contact.email});
      if (foundContact) return foundContact._id;
      throw new Error(`${contact.email} doesn't exist`);
    },
    createdAt: async (contact) => {
      const foundContact = await Contact.findOne({email: contact.email});
      if (foundContact) return foundContact.createdAt;
      throw new Error(`${contact.email} doesn't exist`);
    }
  }
};
