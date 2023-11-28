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
router.get('/top', CategryController.getAllTopCategory);
router.get('/:id', CategryController.getSingleCategory);
router.get('/top/:id', CategryController.getSingleTopCategory);
router.get('/', CategryController.getAllCategory);
router.delete('/:id', CategryController.deleteCategory);
router.delete('/top/:id', CategryController.deleteTopCategory);
router.patch(
  '/:id',
  validateRequest(CategoryValidation.UpdatedCategoryZodSchema),
  CategryController.updateCategory,
);
router.patch(
  '/top/:id',
  validateRequest(CategoryValidation.UpdatedTopCategoryZodSchema),
  CategryController.updateTopCategory,
);
export const CategoryRoutes = router;
