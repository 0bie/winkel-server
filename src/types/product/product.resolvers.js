import {AuthenticationError} from 'apollo-server';
import {Product} from './product.model';
import {roles} from '../user/user.model';

const product = (obj, args, context) => {

  if (!context.user) {
    throw new AuthenticationError();
  }
  return Product.findById(args.id)
    .lean()
    .exec();

};

const newProduct = (obj, args, context) => {

  if (!context.user || context.user.role !== roles.admin) {
    throw new AuthenticationError();
  }
  return Product.create({...args.input, createdBy: context.user._id});

};

const products = (obj, args, context) => {

  if (!context.user) {
    throw new AuthenticationError();
  }
  return Product.find({})
    .lean()
    .exec();

};

const productList = (obj, args, context) => {

  const {offset, first} = args.pagination;
  if (!context.user) {
    throw new AuthenticationError();
  }
  return Product.find({})
    .skip(offset)
    .limit(first)
    .lean()
    .exec();

};

const updateProduct = (obj, args, context) => {

  if (!context.user || context.user.role !== roles.admin) {
    throw new AuthenticationError();
  }
  const update = args.input;
  return Product.findByIdAndUpdate(args.id, update, {new: true})
    .lean()
    .exec();

};

const removeProduct = (obj, args, context) => {

  if (!context.user || context.user.role !== roles.admin) {
    throw new AuthenticationError();
  }
  return Product.findByIdAndRemove(args.id)
    .lean()
    .exec();

};

export default {
  Query: {
    product,
    products,
    productList
  },
  Mutation: {
    newProduct,
    updateProduct,
    removeProduct
  },
  Product: {
    id: async (product) => {
      const foundProduct = await Product.findOne({name: product.name});
      if (foundProduct) return foundProduct._id;
      throw new Error(`Product: ${product.name} doesn't exist`);
    }
  }
};
