import { NextFunction, Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { MyBookFilterableFields } from './mybook.contant';
import { paginationFields } from '../../../constants/paginationFields';
import { MyBookService } from './mybook.service';
import { ICategory } from '../categorys/category.interface';
// create category sent DB
const createMyBook: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...MybookData } = req.body;
    const result = await MyBookService.createMyBook(MybookData);

    sendResponse<ICategory>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Mybook created successfully!',
      data: result,
    });
    next();
  },
);
// get Category from DB
const getAllCategory = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, MyBookFilterableFields);
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

export const MyBookController = {
  getAllCategory,
  getSingleCategory,
  updateCategory,
  deleteCategory,
  createMyBook,
};
