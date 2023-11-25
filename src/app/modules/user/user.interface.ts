import { Model } from 'mongoose';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { ENUM_DESIGNATION } from '../../../enums/designation';
export type UserName = {
  firstName: string;
  lastName: string;
  middleName: string;
};
export type IUser = {
  name: UserName;
  email: string;
  password: string;
  postCode: string;
  dateOfBirth: string;
  gender: 'male' | 'female';
  role: ENUM_USER_ROLE.USER;
  emergencyPhoneNumber?: number;
  phoneNumber?: number;
  country?: string;
  status?: boolean;
  imageURL?: string;
  designation?: ENUM_DESIGNATION;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  currentAddress?: string;
  permanentAddress?: string;
};
// export type UserModel = Model<IUser, Record<string, unknown>>;
export type IUserFilters = {
  searchTerm?: string;
  email?: string;
  bloodGroup?: string;
  phoneNumber?: number;
  emergencyPhoneNumber?: number;
  postCode?: number;
  country?: string;
};
export type UserModel = {
  isUserExist(
    email: string,
  ): Promise<Pick<IUser, 'email' | 'password' | 'role'>>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string,
  ): Promise<boolean>;
} & Model<IUser>;
