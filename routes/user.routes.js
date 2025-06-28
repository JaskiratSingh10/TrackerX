import { Router } from 'express';

import authorize from '../middlewares/auth.middleware.js'
import { getUser, getUsers } from '../controllers/user.controller.js'

const userRouter = Router();

userRouter.get('/',authorize, getUsers);

userRouter.get('/:id', getUser); //authorize middleware to protect this route



export default userRouter;