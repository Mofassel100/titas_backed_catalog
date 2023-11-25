import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUser, UserModel } from './user.interface';
import config from '../../../config';
const UserSchema = new Schema<IUser>(
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
    toJSON: {
      virtuals: true,
    },
  },
);
UserSchema.statics.isUserExist = async function (
  email: string,
): Promise<Pick<IUser, 'email' | 'password' | 'role'> | null> {
  return await User.findOne({ email }, { email: 1, password: 1, role: 1 });
};
UserSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  sacedPassword: string,
): Promise<Boolean> {
  return await bcrypt.compare(givenPassword, sacedPassword);
};
// User.create() / user.save()
UserSchema.pre('save', async function (next) {
  // hashing user password
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bycrypt_salt_rounds),
  );
  next();
});
export const User = model<IUser, UserModel>('Users', UserSchema);
