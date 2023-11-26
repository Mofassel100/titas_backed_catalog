import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { MyBookController } from './mybook.controler';
import { CategoryValidation } from './mybook.validation';
const router = express.Router();
router.get('/top', MyBookController.getAllTopCategory);
router.get('/:id', MyBookController.getSingleCategory);
router.get('/top/:id', MyBookController.getSingleTopCategory);

router.get('/', MyBookController.getAllCategory);

router.delete('/:id', MyBookController.deleteCategory);
router.delete('/top/:id', MyBookController.deleteTopCategory);

router.patch(
  '/:id',
  validateRequest(CategoryValidation.UpdatedCategoryZodSchema),
  MyBookController.updateCategory,
);
router.patch(
  '/top/:id',
  validateRequest(CategoryValidation.UpdatedTopCategoryZodSchema),
  MyBookController.updateTopCategory,
);

export const MyBookRoutes = router;
