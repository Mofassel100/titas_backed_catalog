import express from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { AuthRoutes } from '../modules/auth/auth.router';
import { CategoryRoutes } from '../modules/categorys/category.route';
import { MyBookRoutes } from '../modules/myBook/mybook.routes';
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
  {
    path: '/mybook',
    route: MyBookRoutes,
  },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
