import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';
import {imageSchema} from '../image/image.model';
import {socialSchema} from '../social/social.model';

export const roles = {
  member: 'member',
  admin: 'admin'
};

export const userSchema = new mongoose.Schema(
  {
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: Object.keys(roles),
      required: true,
      default: roles.member
    },
    apiKey: {
      type: String,
      required: true,
      unique: true
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
    orders: {
      type: Number,
      default: 0
    },
    offers: {
      type: Number,
      default: 0
    },
    messages: {
      type: Number,
      default: 0
    },
    image: imageSchema,
    social: [socialSchema]
  },
  {timestamps: true}
);

userSchema.pre('save', function (next) {

  if (!this.isModified('password')) {
    return next();
  }
  bcrypt.hash(this.password, 8, (err, hash) => {
    if (err) {
      return next(err);
    }
    this.password = hash;
    next();
  });

});

userSchema.methods.checkPassword = function (password) {
  const passwordHash = this.password;
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, passwordHash, (err, same) => {
      if (err) return reject(err);
      resolve(same);
    });
  });
};

export const User = mongoose.model('user', userSchema);
