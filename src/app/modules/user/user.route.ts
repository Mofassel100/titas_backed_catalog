import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';
const router = express.Router();

router.post(
  '/create-user',
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createUser,
);
router.get('/:id', UserController.getSingleUser);
router.get('/', UserController.getAllUser);

router.patch(
  '/:id',
  validateRequest(UserValidation.updatedUserSchema),
  UserController.updateUser,
);

router.delete('/:id', UserController.deleteUser);

export const UserRoutes = router;
