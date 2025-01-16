import { Router } from 'express';


import { userController } from '../controllers';
import { VerifyUser } from '../validators';
import { AuthenticaticateUser } from '../middlewares/authMiddleware';
import { CheckAdmin } from '../middlewares/permissionMiddleware';

//USER ROUTES//
const _router: Router = Router();

//USER SIGNUP
_router
    .route('/sign-up')
    .post(VerifyUser, 
        userController.createUser
    );



//UPDATE USER DETAILS

//GET USER DETAILS BY ID
_router
    .route('/fetch/:userId')
    .get(
       AuthenticaticateUser, CheckAdmin,
        userController.getUser
    );

//GET ALL USER LIST
_router
    .route('/fetch')
    .get(
      
        AuthenticaticateUser, CheckAdmin,
        userController.getAllUser
    );

//EXPORT
export const UserRouter = _router;
