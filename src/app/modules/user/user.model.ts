import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';
const userSchema = new Schema<IUser>(
  {
    name: {
      type: {
        firstName: {
          type: String,
          required: true,
        },
        lastName: {
          type: String,
          required: true,
        },
        middleName: {
          type: String,
        },
      },
      required: true,
    },
    imageURL: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    postCode: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    role: {
      type: String,
    },
    emergencyPhoneNumber: {
      type: Number,
    },
    country: {
      type: String,
    },
    phoneNumber: {
      type: Number,
      unique: true,
      required: true,
    },
    status: {
      type: Boolean,
    },
    bloodGroup: {
      type: String,
    },
    currentAddress: {
      type: String,
    },
    permanentAddress: {
      type: String,
    },
    designation: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);
export const User = model<IUser, UserModel>('Users', userSchema);
