import {AuthenticationError} from 'apollo-server';
import {Company} from './company.model';
import {User, roles} from '../user/user.model';

const company = (obj, args, context) => {

  if (!context.user) {
    throw new AuthenticationError();
  }
  return Company.findById(args.id)
    .lean()
    .exec();

};

const newCompany = (obj, args, context) => {

  if (!context.user || context.user.role !== roles.admin) {
    throw new AuthenticationError();
  }
  return Company.create({...args.input});

};

const companies = (obj, args, context) => {

  if (!context.user) {
    throw new AuthenticationError();
  }
  return Company.find({})
    .lean()
    .exec();

};

const updateCompany = (obj, args, context) => {

  if (!context.user || context.user.role !== roles.admin) {
    throw new AuthenticationError();
  }
  const update = args.input;
  return Company.findByIdAndUpdate(args.id, update, {new: true})
    .lean()
    .exec();

};

const sendOrder = (obj, args, context) => {

  if (!context.user || context.user.role !== roles.admin) {
    throw new AuthenticationError();
  }

  User.findByIdAndUpdate(context.user._id, {$inc: {orders: 1, offers: 1}})
    .lean()
    .exec();

  const update = args.input;
  const order = {units: update.units, products: update.products, lead: context.user._id};
  return Company.findByIdAndUpdate(args.id, {$push: {orders: order}}, {new: true})
    .lean()
    .exec();

};

const removeCompany = (obj, args, context) => {

  if (!context.user || context.user.role !== roles.admin) {
    throw new AuthenticationError();
  }
  return Company.findByIdAndRemove(args.id)
    .lean()
    .exec();

};

export default {
  Query: {
    company,
    companies
  },
  Mutation: {
    newCompany,
    sendOrder,
    updateCompany,
    removeCompany
  },
  Company: {
    id: async (company) => {
      const foundCompany = await Company.findOne({name: company.name});
      if (foundCompany) return foundCompany._id;
      throw new Error(`${company.name} doesn't exist`);
    }
  }
};
