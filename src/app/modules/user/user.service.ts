import httpStatus from 'http-status';
import config from '../../../config/index';
import ApiError from '../../../errors/ApiError';
import { IUser, IUserFilters } from './user.interface';
import { User } from './user.model';
import { IPaginationOptions } from '../../../interfaces/paginationOptions';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationOptions';
import { userSearchableFields } from './user.constant';
import mongoose, { SortOrder } from 'mongoose';
import { ObjectId } from 'mongodb';

const createUser = async (user: IUser): Promise<IUser | null> => {
  // auto generated incremental id

  // default password
  const isExistUser = User.findOne({ email: user?.email });
  if (!isExistUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'user email already exist');
  }

  const createdUser = await User.create(user);

  if (!createdUser) {
    throw new ApiError(400, 'Failed to create ,Please try again registration');
  }
  return createdUser;
};
const getAllUsers = async (
  filters: IUserFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IUser[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);
  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: userSearchableFields.map(field => ({
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

  const result = await User.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await User.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findOne({ _id: new ObjectId(id) });

  return result;
};

const updateUser = async (
  id: string,
  payload: Partial<IUser>,
): Promise<IUser | null> => {
  const isExist = await User.findOne({ _id: new ObjectId(id) });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Faculty not found !');
  }

  const { name, ...userData } = payload;
  const updatedUserData: Partial<IUser> = { ...userData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IUser>;
      (updatedUserData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  const result = await User.findOneAndUpdate(
    { _id: new ObjectId(id) },
    updatedUserData,
    {
      new: true,
    },
  );
  return result;
};

const deleteUser = async (id: string): Promise<IUser | null> => {
  // check if the faculty is exist
  const isExist = await User.findById({ _id: new ObjectId(id) });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Faculty not found !');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const user = await User.findOneAndDelete({ id }, { session });
    if (!user) {
      throw new ApiError(404, 'Failed to delete student');
    }
    //delete user
    await User.deleteOne({ _id: new ObjectId(id) });
    session.commitTransaction();
    session.endSession();

    return user;
  } catch (error) {
    session.abortTransaction();
    throw error;
  }
};

export const UserService = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  createUser,
};
