import mongoose from 'mongoose';

export const messageSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: true,
      trim: true,
      validate: [function (value) {
        return value.length <= 80;
      }, 'Message title should be 80 words or less']
    },
    text: {
      type: String,
      required: true,
      trim: true,
      validate: [function (value) {
        return value.length <= 500;
      }, 'Message should be 500 words or less']
    },
    from: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: 'user'
    }
  }
);
