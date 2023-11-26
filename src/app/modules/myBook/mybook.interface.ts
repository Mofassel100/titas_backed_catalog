// import { Model, Types } from 'mongoose';

// export type StudentModel = Model<IStudent, Record<string, unknown>>;

export type ICategoryFilters = {
  searchTerm?: string;
  title?: string;
  tname?: string;
  wname?: string;
  service?: string;
  userEmail?: string;
};
export type ITopCategoryFilters = {
  searchTerm?: string;
  title?: string;
  tname?: string;
  wname?: string;
};
