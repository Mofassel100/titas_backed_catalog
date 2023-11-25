import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { ICategory, ITopCategory } from './category.interface';
import { Category, TopCategory } from './category.model';

const createCategory = async (
  category: ICategory,
): Promise<ICategory | null> => {
  // auto generated incremental id
  // default password
  const isExistCategory = Category.findOne({ title: category?.title });
  if (!isExistCategory) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Category title is Already Exist Please Another Title Name',
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
export const CategoryService = {
  createCategory,
  createTopCategory,
};
