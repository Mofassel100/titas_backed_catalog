import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CategoryValidation } from './category.validation';
import { CategryController } from './categorys.controller';
const router = express.Router();

router.post(
  '/create',
  validateRequest(CategoryValidation.createCategoryZodSchema),
  CategryController.createCategory,
);
router.post(
  '/create-top',
  validateRequest(CategoryValidation.createTopCategoryZodSchema),
  CategryController.createTopCategory,
);
export const CategoryRoutes = router;
