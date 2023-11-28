import { Model, Types } from 'mongoose';
import { IUser } from '../user/user.interface';
import { ICategory, ITopCategory } from '../categorys/category.interface';
import { ENUM_DESIGNATION } from '../../../enums/designation';
export type IMyBook = {
  service: string;
  userStatus?: boolean;
  userId: Types.ObjectId | IUser;
  topCategoryId: Types.ObjectId | ITopCategory;
  userEmail: string;
  status: boolean;
  designation: ENUM_DESIGNATION;
  publishdate: string;
  title: string;
  tname: string;
  description: string;
  wname: string;
  wdescription: string;
  image: string;
  imageTitle: string;
  imageDetails: string;
  twoImage: string;
  twoImageTitle: string;
  twoImageDetails: string;
  topImage: string;
  wimage: string;
};
export type IMyBookModal = Model<IMyBook>;
// export type MyBookDetailsModel = Model<IMyBookDetails>;

export type IMyBookFilters = {
  searchTerm?: string;
  title?: string;
  tname?: string;
  wname?: string;
  service?: string;
  userEmail?: string;
};
