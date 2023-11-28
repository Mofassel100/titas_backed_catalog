import mongoose, { SortOrder } from 'mongoose';
import { IGenericResponse } from '../../../interfaces/common';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IPaginationOptions } from '../../../interfaces/paginationOptions';
import { ICategory } from '../categorys/category.interface';
import { paginationHelpers } from '../../../helpers/paginationOptions';
import { MyBookSearchableFields } from './mybook.contant';
import { Category, TopCategory } from '../categorys/category.model';
import { ObjectId } from 'mongodb';
import { IMyBook, IMyBookFilters } from './mybook.interface';
import { ENUM_DESIGNATION } from '../../../enums/designation';
import { MyBookModel } from './mybook.modal';
const createMyBook = async (bookData: IMyBook): Promise<IMyBook | null> => {
  // auto generated incremental id
  // default password
  // const isExistCategory = Category.findOne({
  //   title: category?.title,
  // }).populate('topCategoryId');
  const isTopCategory = TopCategory.findOne({
    title: bookData?.title,
  });
  if (!isTopCategory) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'does not mached Exist Please Another Title Name',
    );
  }
  const createdCategory = await MyBookModel.create(bookData);

  if (!createdCategory) {
    throw new ApiError(
      400,
      'Failed to category create ,Please try again create',
    );
  }
  return createdCategory;
};
// category Get from DB

const getAllCategory = async (
  filters: IMyBookFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<ICategory[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: MyBookSearchableFields.map(field => ({
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

  const result = await Category.find(whereConditions, {
    title: ENUM_DESIGNATION.MYBOOK,
  })
    .populate('userId')
    .populate('topCategoryId')
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
// get single Category from DB
const getSingleCategory = async (id: string): Promise<ICategory | null> => {
  const result = await Category.findOne({ _id: new ObjectId(id) })
    .populate('userId')
    .populate('topCategoryId');
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

export const MyBookService = {
  getAllCategory,
  getSingleCategory,
  updateCategory,
  deleteCategory,
  createMyBook,
};
