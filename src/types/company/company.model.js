import mongoose from 'mongoose';
import {imageSchema} from '../image/image.model';
// import {orderSchema} from '../order/order.model';
import {productSchema} from '../product/product.model';

const companySchema = new mongoose.Schema(
  {
    id: {
      type: mongoose.SchemaTypes.ObjectId
    },
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    location: {
      type: String,
      required: true,
      trim: true
    },
    quantity: {
      type: String,
      required: true,
      trim: true
    },
    image: imageSchema,
    // orders: [orderSchema],
    products: [productSchema]
  }
);

export const Company = mongoose.model('company', companySchema);
