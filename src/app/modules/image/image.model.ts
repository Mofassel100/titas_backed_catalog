import { Schema, model } from 'mongoose';
import { IImage, ImageModel } from './image.interface';

const userSchema = new Schema<IImage>(
  {
    userEmail: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    imageTitle: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
export const User = model<IImage, ImageModel>('Users', userSchema);
