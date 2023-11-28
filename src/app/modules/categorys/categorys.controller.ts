import { NextFunction, Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { CategoryService } from './category.service';

import { ICategory, ITopCategory } from './category.interface';
import pick from '../../../shared/pick';
import {
  CategoryFilterableFields,
  TopCategoryFilteraFields,
} from './category.constant';
import { paginationFields } from '../../../constants/paginationFields';
// create category sent DB
const createCategory: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...CategoryData } = req.body;
    const result = await CategoryService.createCategory(CategoryData);

    sendResponse<ICategory>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Category created successfully!',
      data: result,
    });
    next();
  },
);
// create top category sent DB
const createTopCategory: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...TopCategoryData } = req.body;
    const result = await CategoryService.createTopCategory(TopCategoryData);

    sendResponse<ITopCategory>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'TopCategory Created successfully!',
      data: result,
    });
    next();
  },
);
// get Category from DB
const getAllCategory = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, CategoryFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await CategoryService.getAllCategory(
    filters,
    paginationOptions,
  );
  sendResponse<ICategory[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category retrieved successfully !',
    meta: result.meta,
    data: result.data,
  });
});
// get Top Category from DB
const getAllTopCategory = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, TopCategoryFilteraFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await CategoryService.getAllTopCategory(
    filters,
    paginationOptions,
  );
  sendResponse<ITopCategory[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Top Category retrieved successfully !',
    meta: result.meta,
    data: result.data,
  });
});
// get Top Category single from DB
const getSingleTopCategory = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await CategoryService.getSingleTopCategory(id);

  sendResponse<ITopCategory>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Top Category retrieved successfully !',
    data: result,
  });
});
// get Category single From DB
const getSingleCategory = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await CategoryService.getSingleCategory(id);

  sendResponse<ICategory>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category retrieved successfully !',
    data: result,
  });
});
// category Updated DB
const updateCategory = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await CategoryService.updateCategory(id, updatedData);
  sendResponse<ICategory>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category updated successfully !',
    data: result,
  });
});
//Top category updated From DB
const updateTopCategory = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await CategoryService.updateTopCategory(id, updatedData);
  sendResponse<ITopCategory>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Top Category updated successfully !',
    data: result,
  });
});
// category Deleted From DB
const deleteCategory = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await CategoryService.deleteCategory(id);
  sendResponse<ICategory>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category deleted successfully !',
    data: result,
  });
});
//Top category Deleted From DB
const deleteTopCategory = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await CategoryService.deleteTopCategory(id);
  sendResponse<ITopCategory>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Top Category deleted successfully !',
    data: result,
  });
});
export const CategryController = {
  createCategory,
  createTopCategory,
  getAllCategory,
  getAllTopCategory,
  getSingleCategory,
  getSingleTopCategory,
  updateCategory,
  updateTopCategory,
  deleteCategory,
  deleteTopCategory,
};
