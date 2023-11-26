import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import {
  CategoryFilterableFields,
  TopCategoryFilteraFields,
} from './mybook.contant';
import { paginationFields } from '../../../constants/paginationFields';
import { Category } from '../categorys/category.model';
import { MyBookService } from './mybook.service';
import { ICategory, ITopCategory } from '../categorys/category.interface';

// get Category from DB
const getAllCategory = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, CategoryFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await MyBookService.getAllCategory(filters, paginationOptions);
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
  const result = await MyBookService.getAllTopCategory(
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
  const result = await MyBookService.getSingleTopCategory(id);

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
  const result = await MyBookService.getSingleCategory(id);

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
  const result = await MyBookService.updateCategory(id, updatedData);
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
  const result = await MyBookService.updateTopCategory(id, updatedData);
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
  const result = await MyBookService.deleteCategory(id);
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
  const result = await MyBookService.deleteTopCategory(id);
  sendResponse<ITopCategory>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Top Category deleted successfully !',
    data: result,
  });
});

export const MyBookController = {
  getAllCategory,
  getAllTopCategory,
  getSingleCategory,
  getSingleTopCategory,
  updateCategory,
  updateTopCategory,
  deleteCategory,
  deleteTopCategory,
};
