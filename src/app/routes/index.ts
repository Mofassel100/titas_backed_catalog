import express from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { AuthRoutes } from '../modules/auth/auth.router';
import { CategoryRoutes } from '../modules/categorys/category.route';
const router = express.Router();
const moduleRoutes = [
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/category',
    route: CategoryRoutes,
  },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
