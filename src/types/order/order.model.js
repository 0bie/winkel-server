import mongoose from 'mongoose';
import {productSchema} from '../product/product.model';

export const delivery = {
  express: 'express',
  standard: 'standard'
};

export const orderSchema = new mongoose.Schema(
  {
    id: {
      type: mongoose.SchemaTypes.ObjectId
    },
    units: {
      type: Number,
      required: true
    },
    delivery: {
      type: String,
      trim: true,
      enum: Object.keys(delivery),
      default: delivery.standard
    },
    lead: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: 'user'
    },
    products: [productSchema]
  }
);
