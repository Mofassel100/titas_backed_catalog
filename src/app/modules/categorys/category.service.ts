import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import {
  ICategory,
  ICategoryFilters,
  ITopCategory,
  ITopCategoryFilters,
} from './category.interface';
import { Category, TopCategory } from './category.model';
import { IPaginationOptions } from '../../../interfaces/paginationOptions';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationOptions';
import {
  CategorySearchableFields,
  TCategorySearchabFields,
} from './category.constant';
import mongoose, { SortOrder } from 'mongoose';
import { ObjectId } from 'mongodb';
// create Category sent DB
const createCategory = async (
  category: ICategory,
): Promise<ICategory | null> => {
  // auto generated incremental id
  // default password
  // const isExistCategory = Category.findOne({
  //   title: category?.title,
  // }).populate('topCategoryId');
  const isTopCategory = TopCategory.findOne({
    title: category.title,
  });
  if (!isTopCategory) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'does not mached Exist Please Another Title Name',
    );
  }

  const createdCategory = await Category.create(category);

  if (!createdCategory) {
    throw new ApiError(
      400,
      'Failed to category create ,Please try again create',
    );
  }
  return createdCategory;
};
// create to category sent DB
const createTopCategory = async (
  TopCategoryData: ITopCategory,
): Promise<ITopCategory | null> => {
  // auto generated incremental id
  // default password
  const isExisTopCategory = TopCategory.findOne({
    title: TopCategoryData?.title,
  });
  if (!isExisTopCategory) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Top Category title is Already Exist Please Another Title Name',
    );
  }

  const createdTopCategory = await TopCategory.create(TopCategoryData);

  if (!createdTopCategory) {
    throw new ApiError(
      400,
      'Failed to Top Category create ,Please try again create',
    );
  }
  return createdTopCategory;
};
// get category from DB
const getAllCategory = async (
  filters: ICategoryFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<ICategory[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: CategorySearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Category.find(whereConditions)
    .populate('userId')
    .populate('categorys')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Category.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
// Top Category Get From DB
const getAllTopCategory = async (
  filters: ITopCategoryFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<ITopCategory[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: TCategorySearchabFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await TopCategory.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await TopCategory.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
// get single Category from DB
const getSingleCategory = async (id: string): Promise<ICategory | null> => {
  const result = await Category.findOne({ _id: new ObjectId(id) }).populate(
    'categorys',
  );

  return result;
};
// get single TopCategory from DB
const getSingleTopCategory = async (
  id: string,
): Promise<ITopCategory | null> => {
  const isExist = await TopCategory.findById({ _id: new ObjectId(id) });
  const result = await TopCategory.findById({ _id: new ObjectId(id) })
    .populate({
      path: 'categorys',
      match: {
        title: isExist?.title,
      },
      select: 'title',
    })
    .populate('userId');
  // const result = await TopCategory.findOne({ _id: new ObjectId(id) }).populate(
  //   'userId',
  // );
  return result;
};
// updated Category From DB
const updateCategory = async (
  id: string,
  payload: Partial<ICategory>,
): Promise<ICategory | null> => {
  const isExist = await Category.findOne({ _id: new ObjectId(id) });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found !');
  }

  const {
    status,
    description,
    title,
    tname,
    wdescription,
    wname,
    service,
    publishdate,
    userStatus,
    designation,
    ...categoryData
  } = payload;
  const updatedCategoryData: Partial<ICategory> = { ...categoryData };
  const result = await Category.findOneAndUpdate(
    { _id: new ObjectId(id) },
    updatedCategoryData,
    {
      new: true,
    },
  );
  return result;
};
// updated Top Category  From DB
const updateTopCategory = async (
  id: string,
  payload: Partial<ITopCategory>,
): Promise<ITopCategory | null> => {
  const isExist = await TopCategory.findOne({ _id: new ObjectId(id) });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Top Category not found !');
  }

  const {
    status,
    description,
    title,
    tname,
    userStatus,
    designation,
    ...categoryData
  } = payload;
  const updatedCategoryData: Partial<ITopCategory> = { ...categoryData };
  const result = await TopCategory.findOneAndUpdate(
    { _id: new ObjectId(id) },
    updatedCategoryData,
    {
      new: true,
    },
  );
  return result;
};
// Deleted Category From DB
const deleteCategory = async (id: string): Promise<ICategory | null> => {
  // check if the faculty is exist
  const isExist = await Category.findOne({ _id: new ObjectId(id) });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found !');
  }
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //delete category first
    const category = await Category.findOneAndDelete(
      { _id: new ObjectId(id) },
      { session },
    );
    if (!category) {
      throw new ApiError(404, 'Failed to delete Category');
    }
    //delete user
    // await User.deleteOne({ _id: new ObjectId(id) });
    session.commitTransaction();
    session.endSession();

    return category;
  } catch (error) {
    session.abortTransaction();
    throw error;
  }
};
// Deleted top Category From DB
const deleteTopCategory = async (id: string): Promise<ITopCategory | null> => {
  // check if the faculty is exist
  const isExist = await TopCategory.findOne({ _id: new ObjectId(id) });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Top Category not found !');
  }
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //delete Top category first
    const topcategory = await Category.findOneAndDelete(
      { _id: new ObjectId(id) },
      { session },
    );
    if (!topcategory) {
      throw new ApiError(404, 'Failed to delete Top Category');
    }
    //delete user
    // await User.deleteOne({ _id: new ObjectId(id) });
    session.commitTransaction();
    session.endSession();

    return topcategory;
  } catch (error) {
    session.abortTransaction();
    throw error;
  }
};

export const CategoryService = {
  createCategory,
  createTopCategory,
  getAllCategory,
  getAllTopCategory,
  updateCategory,
  updateTopCategory,
  getSingleCategory,
  getSingleTopCategory,
  deleteCategory,
  deleteTopCategory,
};
