import mongoose from 'mongoose';
import validator from 'validator';

export const imageSchema = new mongoose.Schema(
  {
    src: {
      type: String,
      required: true,
      validate: [(value) => validator.isURL(value, {require_tld: false}), 'Not a valid URL']
    },
    alt: {
      type: String,
      trim: true,
      required: true,
      default: 'Sample alternate text'
    },
    caption: {
      type: String,
      trim: true
    }
  }
);
