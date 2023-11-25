import { Model, Types } from 'mongoose';
import { IUser } from '../user/user.interface';
export type ITopCategory = {
  userStatus?: boolean;
  userId: Types.ObjectId | IUser;
  status: boolean;
  designation: string;
  title: string;
  tname: string;
  description: string;
  image: string;
};
export type ICategory = {
  service: string;
  userStatus?: boolean;
  userId: Types.ObjectId | IUser;
  topCategoryId: Types.ObjectId | ITopCategory;
  userEmail: string;
  status: boolean;
  designation: string;
  publishdate: string;
  title: string;
  tname: string;
  description: string;
  wname: string;
  wdescription: string;
  image: string;
  topImage: string;
  wimage: string;
};

export type CategoryModel = Model<ICategory>;
export type TopCategoryModel = Model<ITopCategory>;
