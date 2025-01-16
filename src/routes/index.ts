import Express from 'express';
import {AuthRouter} from './auth.routes';

import {UserRouter} from './user.routes'
import { ProductRouters } from './product.routes';
const _router = Express.Router();



_router.use("/user",  UserRouter);
_router.use("/auth", AuthRouter);
_router.use("/product", ProductRouters)

export const AllRouters = _router;



