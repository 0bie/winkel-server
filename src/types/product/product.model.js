import mongoose from 'mongoose';
import {imageSchema} from '../image/image.model';

const quantity = {
  wholesale: 'wholesale',
  retail: 'retail'
};

export const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    units: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    supplier: {
      type: String,
      required: true
    },
    quantity: {
      type: String,
      required: true,
      enum: Object.keys(quantity)
    },
    description: String,
    image: imageSchema
  },
  {timestamps: true}
);

export const Product = mongoose.model('product', productSchema);
