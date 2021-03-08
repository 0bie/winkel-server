import mongoose from 'mongoose';
import validator from 'validator';

const platforms = {
  twitter: 'twitter',
  linkedin: 'linkedin',
  facebook: 'facebook'
};

export const socialSchema = new mongoose.Schema(
  {
    platform: {
      type: String,
      required: true,
      enum: Object.keys(platforms)
    },
    link: {
      type: String,
      required: true,
      validate: [(value) => validator.isURL(value), 'Not a valid url']
    }
  }
);
