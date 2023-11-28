import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { MyBookController } from './mybook.controler';
import { MyBookValidation } from './mybook.validation';
const router = express.Router();
router.post('/create', validateRequest(MyBookValidation.createMyBook));
router.get('/:id', MyBookController.getSingleCategory);
router.get('/', MyBookController.getAllCategory);
router.delete('/:id', MyBookController.deleteCategory);
router.patch(
  '/:id',
  validateRequest(MyBookValidation.UpdatedMyBook),
  MyBookController.updateCategory,
);

export const MyBookRoutes = router;
