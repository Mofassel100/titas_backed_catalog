import { NextFunction, Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { CategoryService } from './category.service';

import { ICategory, ITopCategory } from './category.interface';

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
export const CategryController = {
  createCategory,
  createTopCategory,
};
