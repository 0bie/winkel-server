import mongoose from 'mongoose';
import validator from 'validator';
import {imageSchema} from '../image/image.model';
import {socialSchema} from '../social/social.model';
import {messageSchema} from '../message/message.model';

const contactSchema = new mongoose.Schema(
  {
    id: {
      type: mongoose.SchemaTypes.ObjectId
    },
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate: [(value) => validator.isEmail(value), 'Not a valid email address']
    },
    role: {
      type: String,
      trim: true
    },
    bio: {
      type: String,
      trim: true,
      validate: [function (value) {
        return value.length <= 280;
      }, 'Bio is too long (280 max.)']
    },
    image: imageSchema,
    social: [socialSchema],
    messages: [messageSchema]
  },
  {timestamps: true}
);

export const Contact = mongoose.model('contact', contactSchema);
